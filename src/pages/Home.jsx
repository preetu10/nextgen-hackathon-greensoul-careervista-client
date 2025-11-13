import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Target, TrendingUp, Users, CheckCircle, Play, Star, ChevronLeft, ChevronRight, Briefcase, GraduationCap, Rocket, Zap, Brain, Award } from "lucide-react";

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Launch Your Dream Career",
      subtitle: "AI-powered insights to guide your professional journey",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop",
      icon: Rocket,
      color: "#3bb4c1"
    },
    {
      title: "Skill Up for Success",
      subtitle: "Personalized learning paths tailored to your goals",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop",
      icon: GraduationCap,
      color: "#2a8d98"
    },
    {
      title: "Connect with Mentors",
      subtitle: "Learn from industry experts and accelerate your growth",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop",
      icon: Users,
      color: "#048998"
    },
    {
      title: "Unlock Your Potential",
      subtitle: "Discover careers that align with your unique strengths",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop",
      icon: Brain,
      color: "#3bb4c1"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-[#f6f5f5]">
      {/* Carousel Section */}
      <section className="relative h-[600px] overflow-hidden mt-4 mx-4 sm:mx-6 lg:mx-8 rounded-3xl">
        {slides.map((slide, index) => {
          const IconComponent = slide.icon;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <div className="relative h-full">
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-8 sm:px-12 lg:px-16">
                    <div className="max-w-2xl">
                      {/* Animated Icon */}
                      <div className="mb-6 animate-bounce">
                        <div 
                          className="w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                          style={{ backgroundColor: `${slide.color}33`, border: `2px solid ${slide.color}` }}
                        >
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                      </div>

                      {/* Title with animation */}
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
                        {slide.title}
                      </h1>

                      {/* Subtitle */}
                      <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-delay">
                        {slide.subtitle}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
                        <button 
                          className="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                          style={{ backgroundColor: slide.color, color: 'white' }}
                        >
                          Get Started Free
                          <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/30 transition-all text-lg flex items-center justify-center gap-2">
                          <Play className="w-5 h-5" />
                          Watch Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all z-10 group"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all z-10 group"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all ${
                index === currentSlide
                  ? "w-12 h-3 bg-white"
                  : "w-3 h-3 bg-white/50 hover:bg-white/70"
              } rounded-full`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gray-50 mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-[#3bb4c1] mb-2 group-hover:scale-110 transition-transform">
                50K+
              </div>
              <div className="text-gray-600 font-medium">Active Users</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-[#3bb4c1] mb-2 group-hover:scale-110 transition-transform">
                500+
              </div>
              <div className="text-gray-600 font-medium">Career Paths</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-[#3bb4c1] mb-2 group-hover:scale-110 transition-transform">
                95%
              </div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-[#3bb4c1] mb-2 group-hover:scale-110 transition-transform">
                24/7
              </div>
              <div className="text-gray-600 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#3bb4c1]/10 rounded-full px-4 py-2 mb-4">
              <Zap className="w-4 h-4 text-[#3bb4c1]" />
              <span className="text-sm text-[#3bb4c1] font-medium">Powerful Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need to make informed career decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 rounded-xl bg-[#3bb4c1]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-[#3bb4c1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Career Assessment</h3>
              <p className="text-gray-600 mb-4">
                Take our comprehensive assessment to discover careers that align with your skills, interests, and values.
              </p>
              <a href="#" className="text-[#3bb4c1] hover:text-[#2a8d98] flex items-center gap-2 font-medium">
                Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 rounded-xl bg-[#3bb4c1]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-[#3bb4c1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Skill Development</h3>
              <p className="text-gray-600 mb-4">
                Get personalized learning paths and recommendations to develop the skills needed for your dream career.
              </p>
              <a href="#" className="text-[#3bb4c1] hover:text-[#2a8d98] flex items-center gap-2 font-medium">
                Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 rounded-xl bg-[#3bb4c1]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-[#3bb4c1]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Mentorship</h3>
              <p className="text-gray-600 mb-4">
                Connect with industry professionals and get personalized guidance to accelerate your career growth.
              </p>
              <a href="#" className="text-[#3bb4c1] hover:text-[#2a8d98] flex items-center gap-2 font-medium">
                Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#3bb4c1]/10 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#3bb4c1]" />
              <span className="text-sm text-[#3bb4c1] font-medium">Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Start your journey to career success in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3bb4c1] to-[#2a8d98] text-white flex items-center justify-center text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Take Assessment</h3>
              <p className="text-gray-600">
                Complete our comprehensive career assessment to understand your strengths and interests.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3bb4c1] to-[#2a8d98] text-white flex items-center justify-center text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive personalized career recommendations based on AI analysis of your profile.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3bb4c1] to-[#2a8d98] text-white flex items-center justify-center text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Start Learning</h3>
              <p className="text-gray-600">
                Follow your personalized learning path and connect with mentors to achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#3bb4c1]/10 rounded-full px-4 py-2 mb-4">
              <Award className="w-4 h-4 text-[#3bb4c1]" />
              <span className="text-sm text-[#3bb4c1] font-medium">Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who found their dream careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#3bb4c1] text-[#3bb4c1]" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "CareerVista helped me discover my passion for data science. The personalized recommendations were spot on!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3bb4c1] to-[#2a8d98] flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div>
                  <div className="text-gray-900 font-semibold">Sarah Martinez</div>
                  <div className="text-gray-600 text-sm">Data Scientist</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#3bb4c1] text-[#3bb4c1]" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The mentorship program connected me with industry experts who guided me through my career transition."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3bb4c1] to-[#2a8d98] flex items-center justify-center text-white font-bold">
                  JC
                </div>
                <div>
                  <div className="text-gray-900 font-semibold">James Chen</div>
                  <div className="text-gray-600 text-sm">Software Engineer</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#3bb4c1] text-[#3bb4c1]" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The assessment was incredibly accurate. I'm now pursuing a career I never knew existed but absolutely love!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3bb4c1] to-[#2a8d98] flex items-center justify-center text-white font-bold">
                  EP
                </div>
                <div>
                  <div className="text-gray-900 font-semibold">Emily Parker</div>
                  <div className="text-gray-600 text-sm">UX Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#3bb4c1] to-[#2a8d98] text-white mx-4 sm:mx-6 lg:mx-8 rounded-3xl mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">Start Your Journey Today</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already discovered their perfect career path with CareerVista.
          </p>
          <button className="bg-white text-[#3bb4c1] px-8 py-4 rounded-xl hover:scale-105 transition-all inline-flex items-center gap-2 text-lg font-semibold shadow-xl hover:shadow-2xl">
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }
      `}</style>
    </div>
  );
}