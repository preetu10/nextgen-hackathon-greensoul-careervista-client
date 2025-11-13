import { ArrowRight, Sparkles, Target, TrendingUp, Users, CheckCircle, Play, Star } from "lucide-react";

export function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#3bb4c1] to-[#2a8d98] text-white py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">AI-Powered Career Guidance</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Discover Your Perfect Career Path
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Unlock your potential with personalized career recommendations, skill assessments, and expert guidance powered by advanced AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-[#3bb4c1] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-lg">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-lg">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="bg-white rounded-xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#3bb4c1] flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 text-lg">Career Match</h3>
                      <p className="text-gray-600 text-sm">95% Accuracy</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Software Engineer</span>
                      <span className="text-[#3bb4c1]">98%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#3bb4c1] h-2 rounded-full" style={{width: '98%'}}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Data Scientist</span>
                      <span className="text-[#3bb4c1]">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#3bb4c1] h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-[#3bb4c1] mb-2">50K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-[#3bb4c1] mb-2">500+</div>
              <div className="text-gray-600">Career Paths</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-[#3bb4c1] mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-[#3bb4c1] mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need to make informed career decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-[#3bb4c1]/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#3bb4c1]" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">AI Career Assessment</h3>
              <p className="text-gray-600 mb-4">
                Take our comprehensive assessment to discover careers that align with your skills, interests, and values.
              </p>
              <a href="#" className="text-[#3bb4c1] hover:text-[#2a8d98] flex items-center gap-2">
                Learn more <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-[#3bb4c1]/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-[#3bb4c1]" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Skill Development</h3>
              <p className="text-gray-600 mb-4">
                Get personalized learning paths and recommendations to develop the skills needed for your dream career.
              </p>
              <a href="#" className="text-[#3bb4c1] hover:text-[#2a8d98] flex items-center gap-2">
                Learn more <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-[#3bb4c1]/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-[#3bb4c1]" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Expert Mentorship</h3>
              <p className="text-gray-600 mb-4">
                Connect with industry professionals and get personalized guidance to accelerate your career growth.
              </p>
              <a href="#" className="text-[#3bb4c1] hover:text-[#2a8d98] flex items-center gap-2">
                Learn more <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Start your journey to career success in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#3bb4c1] text-white flex items-center justify-center text-3xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Take Assessment</h3>
              <p className="text-gray-600">
                Complete our comprehensive career assessment to understand your strengths and interests.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#3bb4c1] text-white flex items-center justify-center text-3xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive personalized career recommendations based on AI analysis of your profile.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#3bb4c1] text-white flex items-center justify-center text-3xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Start Learning</h3>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who found their dream careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#3bb4c1] text-[#3bb4c1]" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "CareerVista helped me discover my passion for data science. The personalized recommendations were spot on!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#3bb4c1] flex items-center justify-center text-white">
                  SM
                </div>
                <div>
                  <div className="text-gray-900">Sarah Martinez</div>
                  <div className="text-gray-600 text-sm">Data Scientist</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#3bb4c1] text-[#3bb4c1]" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The mentorship program connected me with industry experts who guided me through my career transition."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#3bb4c1] flex items-center justify-center text-white">
                  JC
                </div>
                <div>
                  <div className="text-gray-900">James Chen</div>
                  <div className="text-gray-600 text-sm">Software Engineer</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#3bb4c1] text-[#3bb4c1]" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The assessment was incredibly accurate. I'm now pursuing a career I never knew existed but absolutely love!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#3bb4c1] flex items-center justify-center text-white">
                  EP
                </div>
                <div>
                  <div className="text-gray-900">Emily Parker</div>
                  <div className="text-gray-600 text-sm">UX Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#3bb4c1] to-[#2a8d98] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already discovered their perfect career path with CareerVista.
          </p>
          <button className="bg-white text-[#3bb4c1] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2 text-lg">
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}