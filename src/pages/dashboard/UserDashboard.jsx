import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Briefcase, Award, Target, ArrowUp, ArrowDown } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://nextgen-hackathon-greensoul-careerv.vercel.app/api/user-analysis/complete');
        const result = await response.json();
        
        if (result.success) {
          setAnalytics(result.data);
          setError(null);
        } else {
          setError('Failed to load analytics data');
        }
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Unable to connect to server');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <div className="text-red-500 text-center mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Connection Error</h3>
            <p className="text-gray-600">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Real-time insights into job market trends and user skills</p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              icon: Users, 
              label: 'Total Users', 
              value: analytics.overview.totalUsers, 
              color: 'bg-teal-500', 
              lightBg: 'bg-teal-50',
              trend: '+12%' 
            },
            { 
              icon: Briefcase, 
              label: 'Active Jobs', 
              value: analytics.overview.totalJobs, 
              color: 'bg-cyan-600', 
              lightBg: 'bg-cyan-50',
              trend: '+8%' 
            },
            { 
              icon: Target, 
              label: 'Avg Match Rate', 
              value: `${analytics.overview.avgMatchRate}%`, 
              color: 'bg-teal-600', 
              lightBg: 'bg-teal-50',
              trend: '+5%' 
            },
            { 
              icon: Award, 
              label: 'Applications', 
              value: analytics.overview.activeApplications, 
              color: 'bg-cyan-700', 
              lightBg: 'bg-cyan-50',
              trend: '+15%' 
            }
          ].map((card, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-slideUp"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${card.lightBg} rounded-lg`}>
                  <card.icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
                </div>
                <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                  <ArrowUp className="w-4 h-4" />
                  {card.trend}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{card.label}</h3>
              <p className="text-3xl font-bold text-gray-800">{card.value.toLocaleString()}</p>
            </div>
          ))}
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
       
          <div className="bg-white rounded-xl shadow-md p-6 animate-slideUp" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Job Market Analysis</h2>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Experience Level Distribution</h3>
              <div className="space-y-4">
                {analytics.jobMarket.experienceLevels.map((item, idx) => (
                  <div key={idx} className="animate-fadeIn" style={{ animationDelay: `${600 + idx * 100}ms` }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">{item.level}</span>
                      <span className="text-gray-600 text-sm">{item.count} jobs ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full animate-barGrow"
                        style={{ 
                          width: `${item.percentage}%`,
                          animationDelay: `${700 + idx * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Job Type Distribution</h3>
              <div className="grid grid-cols-2 gap-4">
                {analytics.jobMarket.jobTypes.map((item, idx) => (
                  <div 
                    key={idx}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors animate-fadeIn border border-gray-200"
                    style={{ animationDelay: `${1000 + idx * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-gray-700 font-medium">{item.type}</span>
                      {item.trend === 'up' ? (
                        <ArrowUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{item.count}</p>
                    <p className="text-xs text-gray-500 mt-1">Active positions</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

         
          <div className="bg-white rounded-xl shadow-md p-6 animate-slideUp" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-50 rounded-lg">
                <BarChart3 className="w-6 h-6 text-cyan-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Top Skills in Demand</h2>
            </div>

        
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Most Demanded Skills</h3>
              <div className="space-y-3">
                {analytics.topSkills.technical.slice(0, 6).map((item, idx) => (
                  <div key={idx} className="animate-fadeIn" style={{ animationDelay: `${600 + idx * 100}ms` }}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 font-medium">{item.skill}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">{item.users} users</span>
                        <span className="text-teal-600 font-semibold">{item.jobs} jobs</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full animate-barGrow"
                        style={{ 
                          width: `${item.demand}%`,
                          animationDelay: `${700 + idx * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Fastest Growing Skills</h3>
              <div className="grid grid-cols-2 gap-3">
                {analytics.topSkills.trending.map((item, idx) => (
                  <div 
                    key={idx}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 animate-fadeIn"
                    style={{ animationDelay: `${1200 + idx * 100}ms` }}
                  >
                    <p className="text-gray-700 font-medium mb-2">{item.skill}</p>
                    <div className="flex items-center gap-2">
                      <ArrowUp className="w-5 h-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">{item.change}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Growth index: {item.growth}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

         
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2 animate-slideUp" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-50 rounded-lg">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Career Track Distribution</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {analytics.careerTracks.map((track, idx) => (
                <div 
                  key={idx}
                  className="relative bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all border border-gray-200 animate-fadeIn"
                  style={{ animationDelay: `${800 + idx * 100}ms` }}
                >
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="#e3e3e3"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke={['#3bb4c1', '#048998', '#10b981', '#f59e0b', '#ef4444'][idx]}
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${track.percentage * 2.51} 251`}
                          className="animate-barGrow"
                          style={{ animationDelay: `${900 + idx * 100}ms` }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-800">{track.percentage}%</span>
                      </div>
                    </div>
                    <h3 className="text-gray-700 font-semibold mb-1">{track.track}</h3>
                    <p className="text-gray-500 text-sm">{track.count} users</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes barGrow {
          from {
            width: 0;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-barGrow {
          animation: barGrow 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AnalyticsDashboard;