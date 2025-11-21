import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Target, 
  Lightbulb, 
  HeartHandshake, 
  Shield, 
  Users, 
  Zap, 
  Compass, 
  ArrowRight 
} from 'lucide-react';

// ImageWithFallback Component
const ERROR_IMG_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

const ImageWithFallback = ({ src, alt, style, className, ...rest }) => {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  return didError ? (
    <div style={style} className={className}>
      <img src={ERROR_IMG_SRC} alt={alt} {...rest} />
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      style={style}
      className={className}
      onError={handleError}
      {...rest}
    />
  );
};

// Button Component
const Button = ({ children, className = '', variant = 'default', ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center gap-2 transform hover:scale-105 active:scale-95';
  const variants = {
    default: 'bg-[#048998] text-white hover:bg-[#037785] shadow-lg hover:shadow-xl',
    outline: 'border-2 border-[#048998] text-[#048998] hover:bg-[#048998] hover:text-white'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Animated wrapper component
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Main About Component
const About = () => {
  const missionCards = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To democratize career advancement by providing accessible, intelligent tools that connect talent with the right opportunities at the right time."
    },
    {
      icon: Lightbulb,
      title: "Our Vision",
      description: "A future where every professional has the insights and resources needed to build a fulfilling career path aligned with their unique strengths."
    },
    {
      icon: HeartHandshake,
      title: "Our Commitment",
      description: "We're dedicated to building trust, fostering community, and creating technology that puts people first—always transparent, always evolving."
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We operate with transparency and honesty in everything we do."
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "Collaboration and mutual support drive our success."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We constantly push boundaries to create better solutions."
    },
    {
      icon: Compass,
      title: "Purpose",
      description: "Every decision is guided by our commitment to meaningful impact."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzQzOTIzNHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjM1MjY0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Emily Foster",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzQ4MDMyNXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "James Park",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1752859951149-7d3fc700a7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzNTYzMTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f5f5] to-[#e3e3e3]">
      {/* Spacer for navbar */}
      <div className="h-6"></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3bb4c1] via-[#048998] to-[#037785] text-white py-24 px-6 rounded-xl">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Animated floating circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-bounce-slow">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Our Story</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={300}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">About Us</h1>
          </AnimatedSection>
          
          <AnimatedSection delay={500}>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Empowering careers through innovative technology and human-centered design. 
              We build platforms that connect talent with opportunity.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 px-6 mt-16">
        <div className=" grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <AnimatedSection delay={200}>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded in 2020, we set out with a simple mission: to bridge the gap between 
                talented professionals and transformative career opportunities. What started as 
                a small team of passionate innovators has grown into a platform trusted by 
                thousands worldwide.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our vision is to create a world where career growth is accessible, transparent, 
                and driven by technology that truly understands human potential. We believe in 
                the power of connection, the importance of continuous learning, and the value 
                of meaningful work.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every day, we work to build tools that empower people to take control of their 
                professional journey, backed by insights, community, and cutting-edge technology.
              </p>
            </div>
          </AnimatedSection>

          {/* Right: Abstract Illustration */}
          <AnimatedSection delay={400}>
            <div className="relative h-96 bg-gradient-to-br from-[#e3e3e3] to-[#f6f5f5] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute top-10 left-10 w-32 h-32 bg-[#3bb4c1] rounded-full opacity-60 animate-float"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#048998] rounded-full opacity-60 animate-float-delayed"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#3bb4c1]/40 rounded-full animate-pulse-slow"></div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission / Vision Cards */}
      <section className="py-20 px-6 bg-[#f6f5f5] mt-16">
        <div className="">
          <AnimatedSection delay={100}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Drives Us</h2>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {missionCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <AnimatedSection key={index} delay={200 + index * 150}>
                  <div 
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#3bb4c1] to-[#048998] rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#048998] transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{card.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-6 mt-16">
        <div className="">
          <AnimatedSection delay={100}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600">
                The principles that guide our work and shape our culture.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={index} delay={200 + index * 100}>
                  <div 
                    className="text-center p-6 rounded-xl hover:bg-white transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl group"
                  >
                    <div className="w-16 h-16 bg-[#e3e3e3] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#3bb4c1] transition-all duration-500 group-hover:scale-110">
                      <Icon className="w-8 h-8 text-[#048998] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#048998] transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-[#e3e3e3] mt-16">
        <div className="">
          <AnimatedSection delay={100}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600">
                Passionate innovators dedicated to transforming the future of work.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={index} delay={200 + index * 100}>
                <div 
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#048998]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#048998] transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-[#3bb4c1] font-medium">{member.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="relative py-24 px-6 overflow-hidden mt-16 mb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3bb4c1] via-[#048998] to-[#037785]"></div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        </div>
        
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already building their future with our 
              platform. Start your journey today.
            </p>
            <Button className="bg-white text-[#048998]! hover:bg-[#f6f5f5] text-lg px-8 py-4 shadow-2xl">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </div>
        </AnimatedSection>
      </section>

      {/* Spacer for footer
      <div className="h-20 "></div> */}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;