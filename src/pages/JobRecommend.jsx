import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { 
  Info, Settings, MapPin, ArrowRight, Briefcase, 
  CheckCircle2, Target, Sparkles, X, Monitor, 
  Server, Layers, Code, ChevronLeft, ChevronRight, 
  Rocket, TrendingUp, Zap, Loader2
} from 'lucide-react';


export default function JobRecommend() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTransparencyModalOpen, setIsTransparencyModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
 

  const { id } = useParams(); 

  // const id=userProfile

  const slides = [
    {
      id: 1,
      title: "Launch Your Dream Career",
      subtitle: "Connect with top companies hiring talented developers",
      icon: Rocket,
      gradient: "from-[#048998] to-[#3bb4c1]",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Match Your Skills Perfectly",
      subtitle: "AI-powered job recommendations tailored to your expertise",
      icon: Target,
      gradient: "from-[#3bb4c1] to-[#048998]",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Accelerate Your Growth",
      subtitle: "Join innovative teams and level up your development skills",
      icon: TrendingUp,
      gradient: "from-[#048998] to-[#0a6b77]",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=600&fit=crop"
    },
    {
      id: 4,
      title: "Fast-Track Your Applications",
      subtitle: "Apply to multiple opportunities with one optimized profile",
      icon: Zap,
      gradient: "from-[#3bb4c1] to-[#048998]",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop"
    }
  ];


useEffect(() => {
  fetchRecommendedJobs();
}, [id]);

const fetchRecommendedJobs = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await fetch(`http://localhost:5000/api/jobs/recommend/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recommended jobs');
    }

    const result = await response.json();
    
    if (result.success) {
      setJobs(result.data);
      
      if (result.userProfile) {
        setSelectedSkills(result.userProfile.skills || []);
        setSelectedTrack(result.userProfile.careerTrack || '');
      }
    } else {
      throw new Error(result.message || 'Failed to load jobs');
    }
  } catch (err) {
    console.error('Error fetching jobs:', err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  const getIconForType = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('frontend') || lowerTitle.includes('ui')) {
      return Monitor;
    } else if (lowerTitle.includes('backend')) {
      return Server;
    } else if (lowerTitle.includes('full stack') || lowerTitle.includes('fullstack')) {
      return Layers;
    }
    return Code;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" style={{ color: '#048998' }} />
          <p className="text-lg text-gray-600">Loading your personalized job recommendations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-4 text-red-500">
            <X className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchRecommendedJobs}
            className="px-6 py-2 rounded-lg text-white font-medium"
            style={{ background: '#048998' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Carousel Section */}
      <div className="container mx-auto px-4 pt-8 pb-8">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="relative h-[500px] md:h-[600px]">
            {slides.map((slide, index) => {
              const SlideIcon = slide.icon;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === currentSlide
                      ? 'opacity-100 translate-x-0'
                      : index < currentSlide
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="absolute inset-0">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`}
                    />
                  </div>

                  <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                    <div
                      className="mb-6"
                      style={{
                        animation: index === currentSlide ? 'iconBounce 2s ease-in-out infinite' : 'none'
                      }}
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <SlideIcon className="h-10 w-10 text-white" strokeWidth={2} />
                      </div>
                    </div>

                    <h1
                      className="mb-4 text-4xl font-bold text-white md:text-6xl"
                      style={{
                        animation: index === currentSlide ? 'fadeInUp 0.6s ease-out' : 'none'
                      }}
                    >
                      {slide.title}
                    </h1>

                    <p
                      className="max-w-2xl text-lg text-white/90 md:text-xl"
                      style={{
                        animation: index === currentSlide ? 'fadeInUp 0.8s ease-out' : 'none'
                      }}
                    >
                      {slide.subtitle}
                    </p>

                    <div className="absolute bottom-10 left-10 opacity-20">
                      <Code
                        className="h-16 w-16 text-white"
                        style={{
                          animation: 'float1 3s ease-in-out infinite'
                        }}
                      />
                    </div>
                    <div className="absolute top-10 right-10 opacity-20">
                      <Briefcase
                        className="h-16 w-16 text-white"
                        style={{
                          animation: 'float2 4s ease-in-out infinite'
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-white/30 disabled:opacity-50"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-white/30 disabled:opacity-50"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto space-y-8 px-4 py-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <div
              className="text-4xl"
              style={{
                animation: 'starPulse 2s ease-in-out infinite'
              }}
            >
              ⭐
            </div>
            <h1 className="inline-block text-4xl font-bold">Recommended Jobs for You</h1>
            <button
              className="h-8 w-8 rounded-full transition-colors hover:bg-gray-100"
              onClick={() => setIsTransparencyModalOpen(true)}
            >
              <Info className="h-5 w-5 mx-auto" style={{ color: '#048998' }} />
            </button>
          </div>
          <p className="mt-2 text-gray-600">
            Based on your skills and preferences
          </p>
        </div>

        {/* Skills Summary Card */}
        <div 
          className="overflow-hidden rounded-3xl border-none shadow-lg" 
          style={{ background: '#f6f5f5' }}
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">Your Skills & Preferences</h3>
                  <button
                    className="h-8 w-8 rounded-full transition-colors hover:bg-gray-200"
                    style={{ color: '#048998' }}
                    onClick={() => console.log('Edit skills clicked')}
                  >
                    <Settings className="h-4 w-4 mx-auto" />
                  </button>
                </div>
                {selectedTrack && (
                  <p className="mt-1 text-sm text-gray-600">
                    Track: {selectedTrack}
                  </p>
                )}
              </div>
            </div>
            {selectedSkills.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {selectedSkills.map((skill, index) => (
                  <span
                    key={skill}
                    className="cursor-pointer rounded-full px-4 py-2 transition-transform hover:scale-105 font-medium"
                    style={{
                      background: '#3bb4c1',
                      color: 'white',
                      opacity: 0,
                      transform: 'scale(0.8)',
                      animation: `skillFadeIn 0.6s ease-out ${index * 0.1}s forwards`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Job Recommendations */}
        <div>
          <h2 className="mb-6 text-3xl font-bold">
            Top Matches {jobs.length > 0 && `(${jobs.length})`}
          </h2>
          
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No matching jobs found</h3>
              <p className="text-gray-600">Try updating your skills or check back later for new opportunities</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job, index) => {
                const Icon = getIconForType(job.title);
                return (
                  <div
                    key={job._id}
                    className="group relative h-full overflow-hidden rounded-2xl border-none shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                    style={{
                      background: '#ffffff',
                      opacity: 0,
                      transform: 'translateY(20px)',
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`
                    }}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 overflow-hidden rounded-xl bg-gray-100">
                            <img
                              src={job.image}
                              alt={job.company}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/100?text=' + job.company.charAt(0);
                              }}
                            />
                          </div>
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 hover:rotate-6"
                            style={{ background: '#E3F2F7' }}
                          >
                            <Icon className="h-5 w-5" style={{ color: '#048998' }} />
                          </div>
                        </div>
                      </div>

                      <h3 className="mt-4 line-clamp-2 text-xl font-semibold">{job.title}</h3>

                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">{job.company}</p>
                        <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{job.location}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-gray-600">Match Score</span>
                          <span className="font-semibold" style={{ color: '#048998' }}>
                            {job.matchPercentage}%
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: '#e3e3e3' }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              background: 'linear-gradient(90deg, #048998 0%, #3bb4c1 100%)',
                              width: `${job.matchPercentage}%`,
                              animation: `progressBar 0.8s ease-out ${index * 0.1 + 0.3}s forwards`
                            }}
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="mb-2 text-sm text-gray-600">Matched Skills:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {job.matchedSkills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full px-2 py-0.5 text-xs font-medium"
                              style={{
                                background: '#E3F2F7',
                                color: '#048998'
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                          {job.matchedSkills.length > 3 && (
                            <span
                              className="rounded-full px-2 py-0.5 text-xs font-medium"
                              style={{
                                background: '#E3F2F7',
                                color: '#048998'
                              }}
                            >
                              +{job.matchedSkills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        className="mt-6 w-full rounded-xl px-4 py-2 font-medium text-white transition-all hover:bg-[#3bb4c1]"
                        style={{
                          background: '#048998'
                        }}
                        onClick={() => console.log('View job:', job._id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="container mx-auto px-4 py-8 pb-12">
        <div
          className="relative overflow-hidden rounded-3xl shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #048998 0%, #3bb4c1 100%)',
            opacity: 0,
            transform: 'translateY(20px)',
            animation: 'fadeInUp 0.6s ease-out 0.5s forwards'
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"
              style={{
                animation: 'float1 4s ease-in-out infinite'
              }}
            />
            <div
              className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10"
              style={{
                animation: 'float2 5s ease-in-out infinite'
              }}
            />
          </div>

          <div className="relative px-8 py-12 text-center sm:px-12">
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20"
              style={{
                animation: 'wiggle 3s ease-in-out infinite'
              }}
            >
              <Briefcase className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-white">Didn't Find What You're Looking For?</h2>
            <p className="mx-auto mt-2 max-w-md text-lg text-white/90">
              Browse our complete job database with hundreds of opportunities across all tracks and skill levels
            </p>

            <button
              className="mt-6 rounded-xl bg-white text-black px-6 py-3 text-lg font-medium transition-all hover:bg-white/90 hover:shadow-lg inline-flex items-center"
            >
             <Link to="/v1/viewjobs">Browse All Jobs</Link>
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            <div className="mx-auto mt-8 flex max-w-sm items-end justify-center gap-2 opacity-30">
              {[40, 60, 80, 100, 80, 60].map((height, index) => (
                <div
                  key={index}
                  className="w-8 rounded-t-lg bg-white/40"
                  style={{
                    height: `${height}px`,
                    opacity: 0,
                    animation: `barGrow 0.5s ease-out ${index * 0.1}s forwards`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transparency Modal */}
      {isTransparencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsTransparencyModalOpen(false)}
            style={{
              animation: 'fadeIn 0.3s ease-out'
            }}
          />
          
          <div 
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
            style={{
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            <div className="sticky top-0 bg-white rounded-t-3xl p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6" style={{ color: '#3bb4c1' }} />
                  <h2 className="text-2xl font-bold">Why These Jobs?</h2>
                </div>
                <button
                  onClick={() => setIsTransparencyModalOpen(false)}
                  className="h-8 w-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <p className="mt-1 text-gray-600">Our matching algorithm explained</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="rounded-2xl p-4" style={{ background: '#E3F2F7' }}>
                <div className="flex items-start gap-3">
                  <Target className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: '#048998' }} />
                  <div>
                    <h4 className="text-sm font-semibold">Track Alignment</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Jobs are filtered based on your selected track: <strong>{selectedTrack || 'Not specified'}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-4" style={{ background: '#f6f5f5' }}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: '#3bb4c1' }} />
                  <div>
                    <h4 className="text-sm font-semibold">Skill Matching</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      We analyze job requirements against your skills:
                    </p>
                    {selectedSkills.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {selectedSkills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full px-3 py-1 text-xs font-medium"
                            style={{
                              background: '#3bb4c1',
                              color: 'white'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                        {selectedSkills.length > 4 && (
                          <span
                            className="rounded-full px-3 py-1 text-xs font-medium"
                            style={{
                              background: '#3bb4c1',
                              color: 'white'
                            }}
                          >
                            +{selectedSkills.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-4" style={{ background: '#E3F2F7' }}>
                <h4 className="text-sm font-semibold">Match Score Calculation</h4>
                <p className="mt-1 text-sm text-gray-600">
                  The percentage shows how many of your skills match the job requirements. We also add bonus points for career track alignment and experience level matching. Higher scores mean better alignment with your profile.
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-gray-200 p-4">
                <p className="text-xs text-gray-600">
                  💡 <strong>Tip:</strong> Update your skills regularly to get more accurate recommendations. Our algorithm learns from your preferences over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iconBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float1 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(10px, -10px) rotate(10deg);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-10px, 10px) rotate(-10deg);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(10deg);
          }
          50% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(0deg);
          }
        }

        @keyframes barGrow {
          to {
            opacity: 1;
          }
        }

        @keyframes starPulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.2) rotate(5deg);
          }
          50% {
            transform: scale(1.2) rotate(-5deg);
          }
          75% {
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes skillFadeIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

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

        @keyframes progressBar {
          from {
            width: 0;
          }
        }
      `}</style>
    </div>
  );
}