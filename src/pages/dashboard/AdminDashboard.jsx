import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Award, BookOpen, TrendingUp, Briefcase, AlertCircle, RefreshCw, Shield } from 'lucide-react';
import useAuth from '../../customHooks/useAuth';
import useAxiosSecure from '../../customHooks/useAxiosSecure';
import useAdmin from '../../customHooks/useAdmin';

const AdminAnalyticsDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isAdmin, isAdminLoading] = useAdmin();
  
  const [data, setData] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalResources: 0,
    usersBySkill: {},
    usersByCareer: {},
    resourcesByTrack: {},
    topSkills: [],
    jobsByExperience: {},
    jobsByType: {},
    userGrowth: [],
    resourcesByCost: {},
    loading: true,
    error: null
  });

  useEffect(() => {
    if (user && isAdmin) {
      fetchAnalyticsData();
    }
  }, [user, isAdmin]);

  const fetchAnalyticsData = async () => {
    setData(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      if (!user) {
        throw new Error('No user logged in. Please login.');
      }

      if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required.');
      }

      
      const [usersRes, jobsRes, resourcesRes] = await Promise.all([
        axiosSecure.get('/api/users'),
        axiosSecure.get('/api/jobs/all'),
        axiosSecure.get('/api/get-all-resources')
      ]);

     
      const users = Array.isArray(usersRes.data) ? usersRes.data : usersRes.data.data || [];
      const jobs = jobsRes.data.data || [];
      const resources = Array.isArray(resourcesRes.data) ? resourcesRes.data : resourcesRes.data.data || [];

      const analytics = processAnalytics(users, jobs, resources);
      setData({ ...analytics, loading: false, error: null });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setData(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.response?.data?.message || error.message || 'Failed to load analytics data. Please check your backend connection.' 
      }));
    }
  };

  const processAnalytics = (users, jobs, resources) => {
  
    const skillCategories = {};
    const careerTracks = {};
    const skillFrequency = {};
    const monthlyUsers = {};

    users.forEach(user => {
     
      const track = user.careerTrack || 'Undecided';
      careerTracks[track] = (careerTracks[track] || 0) + 1;

      
      let userSkills = [];
      if (Array.isArray(user.skills)) {
        userSkills = user.skills;
      } else if (typeof user.skill === 'string') {
        try {
          userSkills = JSON.parse(user.skill);
        } catch {
          userSkills = user.skill.split(',').map(s => s.trim());
        }
      }
      
      userSkills.forEach(skill => {
        if (skill) {
          skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
          const category = categorizeSkill(skill);
          skillCategories[category] = (skillCategories[category] || 0) + 1;
        }
      });

      
      if (user.timestamp) {
        const date = new Date(user.timestamp);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyUsers[monthKey] = (monthlyUsers[monthKey] || 0) + 1;
      }
    });

    
    const jobsByExperience = {};
    const jobsByType = {};
    
    jobs.forEach(job => {
      const exp = job.experienceLevel || job.experience || 'Not Specified';
      jobsByExperience[exp] = (jobsByExperience[exp] || 0) + 1;
      
      const type = job.jobType || 'Full-time';
      jobsByType[type] = (jobsByType[type] || 0) + 1;
    });

   
    const resourcesByTrack = {};
    const resourcesByCost = { 'Free': 0, 'Paid': 0 };
    
    resources.forEach(resource => {
      const skills = resource.relatedSkills || [];
      skills.forEach(skill => {
        resourcesByTrack[skill] = (resourcesByTrack[skill] || 0) + 1;
      });
      
      const cost = resource.cost || 'Free';
      resourcesByCost[cost] = (resourcesByCost[cost] || 0) + 1;
    });

   
    const topSkills = Object.entries(skillFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }));

    
    const sortedMonths = Object.keys(monthlyUsers).sort();
    const last6Months = sortedMonths.slice(-6);
    const userGrowth = last6Months.map(month => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      users: monthlyUsers[month]
    }));

    return {
      totalUsers: users.length,
      totalJobs: jobs.length,
      totalResources: resources.length,
      usersBySkill: skillCategories,
      usersByCareer: careerTracks,
      resourcesByTrack: Object.entries(resourcesByTrack)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {}),
      topSkills,
      jobsByExperience,
      jobsByType,
      userGrowth,
      resourcesByCost
    };
  };

  const categorizeSkill = (skill) => {
    const skillLower = skill.toLowerCase();
    
    if (['react', 'vue', 'angular', 'html', 'css', 'javascript', 'typescript', 'tailwind', 'bootstrap'].some(s => skillLower.includes(s))) {
      return 'Frontend';
    }
    if (['node', 'express', 'python', 'django', 'java', 'spring', 'php', 'laravel', '.net'].some(s => skillLower.includes(s))) {
      return 'Backend';
    }
    if (['mongodb', 'mysql', 'postgresql', 'redis', 'sql', 'database'].some(s => skillLower.includes(s))) {
      return 'Database';
    }
    if (['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'jenkins', 'devops'].some(s => skillLower.includes(s))) {
      return 'DevOps';
    }
    if (['react native', 'flutter', 'swift', 'kotlin', 'android', 'ios'].some(s => skillLower.includes(s))) {
      return 'Mobile';
    }
    if (['pandas', 'numpy', 'machine learning', 'ml', 'ai', 'data', 'power bi', 'tableau'].some(s => skillLower.includes(s))) {
      return 'Data Science';
    }
    return 'Other';
  };

  const SummaryCard = ({ title, value, icon: Icon, color, delay }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!data.loading && value > 0) {
        let start = 0;
        const duration = 1500;
        const increment = value / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [value, data.loading]);

    return (
      <div 
        className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 animate-fadeInUp"
        style={{ 
          backgroundColor: color,
          animationDelay: `${delay}ms`
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <Icon className="w-8 h-8 text-white opacity-90" />
          <div className={`text-3xl font-bold text-white ${data.loading ? 'animate-pulse' : ''}`}>
            {data.loading ? '...' : count.toLocaleString()}
          </div>
        </div>
        <div className="text-white text-sm font-medium opacity-90">{title}</div>
      </div>
    );
  };

  const BarChart = ({ data, title, color }) => {
    if (!data || Object.keys(data).length === 0) return null;
    const maxValue = Math.max(...Object.values(data));
    
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
        <h3 className="text-lg font-semibold mb-6 text-gray-800">{title}</h3>
        <div className="space-y-4">
          {Object.entries(data).map(([label, value], idx) => (
            <div key={label} className="animate-slideInLeft" style={{ animationDelay: `${600 + idx * 100}ms` }}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-bold text-gray-900">{value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out animate-barGrow"
                  style={{ 
                    width: `${(value / maxValue) * 100}%`,
                    backgroundColor: color,
                    animationDelay: `${600 + idx * 100}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PieChart = ({ data, title }) => {
    if (!data || Object.keys(data).length === 0) return null;
    
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    const colors = ['#3bb4c1', '#048998', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    let currentAngle = 0;
    const segments = Object.entries(data).map(([label, value], idx) => {
      const percentage = (value / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      currentAngle += angle;
      
      return { label, value, percentage, startAngle, angle, color: colors[idx % colors.length] };
    });

    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-fadeInUp" style={{ animationDelay: '600ms' }}>
        <h3 className="text-lg font-semibold mb-6 text-gray-800">{title}</h3>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {segments.map((seg, idx) => {
                const x1 = 50 + 40 * Math.cos((seg.startAngle * Math.PI) / 180);
                const y1 = 50 + 40 * Math.sin((seg.startAngle * Math.PI) / 180);
                const x2 = 50 + 40 * Math.cos(((seg.startAngle + seg.angle) * Math.PI) / 180);
                const y2 = 50 + 40 * Math.sin(((seg.startAngle + seg.angle) * Math.PI) / 180);
                const largeArc = seg.angle > 180 ? 1 : 0;

                return (
                  <path
                    key={seg.label}
                    d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={seg.color}
                    className="transition-all duration-500 hover:opacity-80 animate-fadeIn"
                    style={{ animationDelay: `${800 + idx * 100}ms` }}
                  />
                );
              })}
              <circle cx="50" cy="50" r="25" fill="white" />
            </svg>
          </div>
        </div>
        <div className="space-y-3">
          {segments.map((seg, idx) => (
            <div key={seg.label} className="flex items-center justify-between animate-slideInLeft" style={{ animationDelay: `${800 + idx * 100}ms` }}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: seg.color }} />
                <span className="text-sm text-gray-700">{seg.label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{seg.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LineChart = ({ data, title }) => {
    if (!data || data.length === 0) return null;
    
    const maxUsers = Math.max(...data.map(d => d.users));
    const minUsers = Math.min(...data.map(d => d.users));
    const range = maxUsers - minUsers || 1;
    
    const points = data.map((item, idx) => {
      const x = (idx / (data.length - 1)) * 100;
      const y = 100 - ((item.users - minUsers) / range) * 80;
      return { x, y, ...item };
    });

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaD = `${pathD} L 100 100 L 0 100 Z`;

    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-fadeInUp" style={{ animationDelay: '700ms' }}>
        <h3 className="text-lg font-semibold mb-6 text-gray-800">{title}</h3>
        <div className="relative h-64">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3bb4c1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3bb4c1" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path d={areaD} fill="url(#areaGradient)" className="animate-fadeIn" style={{ animationDelay: '900ms' }} />
            <path d={pathD} stroke="#3bb4c1" strokeWidth="0.5" fill="none" className="animate-fadeIn" style={{ animationDelay: '1000ms' }} />
            {points.map((p, idx) => (
              <circle 
                key={idx} 
                cx={p.x} 
                cy={p.y} 
                r="1.5" 
                fill="#048998"
                className="animate-fadeIn"
                style={{ animationDelay: `${1100 + idx * 100}ms` }}
              />
            ))}
          </svg>
        </div>
        <div className="flex justify-between mt-4 text-xs text-gray-600">
          {points.map((p, idx) => (
            <div key={idx} className="text-center">
              <div className="font-semibold text-gray-800">{p.users}</div>
              <div>{p.month}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const TopSkillsChart = ({ skills }) => {
    if (!skills || skills.length === 0) return null;
    const maxCount = Math.max(...skills.map(s => s.count));
    
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-fadeInUp" style={{ animationDelay: '800ms' }}>
        <h3 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal-500" />
          Top Skills in Demand
        </h3>
        <div className="space-y-3">
          {skills.map((item, idx) => (
            <div key={item.skill} className="animate-slideInLeft" style={{ animationDelay: `${1000 + idx * 80}ms` }}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 w-6 h-6 rounded-full flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{item.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-1000 ease-out animate-barGrow"
                  style={{ 
                    width: `${(item.count / maxCount) * 100}%`,
                    animationDelay: `${1000 + idx * 80}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isAdminLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <RefreshCw className="w-16 h-16 text-teal-500 mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Verifying Access...</h2>
          <p className="text-gray-600">Please wait while we check your permissions.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You do not have permission to access this dashboard. Admin privileges are required.</p>
          <button 
            onClick={() => window.history.back()}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Connection Error</h2>
          <p className="text-gray-600 text-center mb-6">{data.error}</p>
          <button 
            onClick={fetchAnalyticsData}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes barGrow {
          from { width: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-barGrow {
          animation: barGrow 1s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-teal-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Analytics Dashboard</h1>
                <p className="text-sm text-gray-600">Real-time insights and performance metrics</p>
              </div>
            </div>
            <button 
              onClick={fetchAnalyticsData}
              disabled={data.loading}
              className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${data.loading ? 'animate-spin' : ''}`} />
              {data.loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard title="Total Users" value={data.totalUsers} icon={Users} color="#3bb4c1" delay={0} />
          <SummaryCard title="Total Jobs" value={data.totalJobs} icon={Briefcase} color="#048998" delay={100} />
          <SummaryCard title="Career Tracks" value={Object.keys(data.usersByCareer).length} icon={Award} color="#10b981" delay={200} />
          <SummaryCard title="Learning Resources" value={data.totalResources} icon={BookOpen} color="#f59e0b" delay={300} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BarChart data={data.usersBySkill} title="Skill Distribution by Category" color="#3bb4c1" />
          <PieChart data={data.usersByCareer} title="Career Track Distribution" />
        </div>

        <div className="grid grid-cols-1 mb-8">
          <LineChart data={data.userGrowth} title="User Growth Over Time" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BarChart data={data.jobsByExperience} title="Jobs by Experience Level" color="#8b5cf6" />
          <PieChart data={data.jobsByType} title="Jobs by Type" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BarChart data={data.resourcesByTrack} title="Learning Resources by Skill" color="#10b981" />
          <TopSkillsChart skills={data.topSkills} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PieChart data={data.resourcesByCost} title="Resources by Cost Type" />
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="text-sm text-gray-600">CareerVista Admin Portal — Analytics Overview</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminAnalyticsDashboard;