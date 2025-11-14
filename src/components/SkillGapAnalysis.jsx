import React, { useState } from 'react';
import { 
  X, Target, BookOpen, Video, FileText, 
  ExternalLink, Sparkles, Brain, CheckCircle2,
  AlertCircle, Clock, Star, GraduationCap,
  ChevronRight
} from 'lucide-react';

export default function SkillGapAnalysis({ job, analysis, onClose }) {
  const [activeTab, setActiveTab] = useState('gaps');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      />
      
      <div 
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="h-12 w-12 rounded-full flex items-center justify-center"
                style={{ background: '#E3F2F7' }}
              >
                <Brain className="h-6 w-6" style={{ color: '#048998' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Skill Gap Analysis</h2>
                <p className="text-sm text-gray-600">{job.title} at {job.company}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('gaps')}
              className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'gaps'
                  ? 'text-white'
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
              style={activeTab === 'gaps' ? { background: '#048998' } : {}}
            >
              <div className="flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Skill Gaps ({analysis.missingSkills?.length || 0})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('matched')}
              className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'matched'
                  ? 'text-white'
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
              style={activeTab === 'matched' ? { background: '#3bb4c1' } : {}}
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Matched Skills ({analysis.matchedSkills?.length || 0})
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          {activeTab === 'gaps' && (
            <div className="space-y-6">
              {/* Overall Progress */}
              <div 
                className="rounded-2xl p-6"
                style={{ background: 'linear-gradient(135deg, #048998 0%, #3bb4c1 100%)' }}
              >
                <div className="flex items-center justify-between text-white mb-4">
                  <div>
                    <p className="text-sm opacity-90">Overall Match</p>
                    <p className="text-3xl font-bold">{analysis.matchPercentage}%</p>
                    <p className="text-xs mt-1 opacity-80">
                      {analysis.matchedCount} of {analysis.totalRequiredSkills} skills matched
                    </p>
                  </div>
                  <Target className="h-12 w-12 opacity-50" />
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-1000"
                    style={{ width: `${analysis.matchPercentage}%` }}
                  />
                </div>
              </div>

              {/* Missing Skills */}
              {analysis.missingSkills && analysis.missingSkills.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" style={{ color: '#048998' }} />
                    <h3 className="text-xl font-bold">Skills to Develop</h3>
                  </div>
                  
                  {analysis.missingSkills.map((skillData, index) => (
                    <div
                      key={index}
                      className="border rounded-2xl p-5 hover:shadow-lg transition-all"
                      style={{
                        opacity: 0,
                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                        background: '#ffffff'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: '#E3F2F7' }}
                        >
                          <GraduationCap className="h-5 w-5" style={{ color: '#048998' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-3">
                            <h4 className="font-bold text-lg">{skillData.skill}</h4>
                            <span 
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{ 
                                background: skillData.priority === 'High' ? '#fef3c7' : '#dbeafe',
                                color: skillData.priority === 'High' ? '#92400e' : '#1e40af'
                              }}
                            >
                              {skillData.priority} Priority
                            </span>
                          </div>
                          
                          {skillData.learningResources && skillData.learningResources.length > 0 && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" style={{ color: '#048998' }} />
                                <p className="text-sm font-medium text-gray-700">
                                  Recommended Learning Resources
                                </p>
                              </div>
                              
                              {/* Scrollable Resource Cards */}
                              <div className="relative">
                                <div 
                                  className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                                  style={{ scrollbarWidth: 'thin' }}
                                >
                                  {skillData.learningResources.map((resource, rIndex) => (
                                    <a
                                      key={rIndex}
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex-shrink-0 w-72 group"
                                      style={{
                                        opacity: 0,
                                        animation: `slideInRight 0.5s ease-out ${rIndex * 0.1}s forwards`
                                      }}
                                    >
                                      <div 
                                        className="h-full rounded-xl p-4 border-2 transition-all hover:shadow-lg hover:scale-105 hover:border-[#048998]"
                                        style={{ background: '#f9fafb' }}
                                      >
                                        {/* Resource Header */}
                                        <div className="flex items-start gap-3 mb-3">
                                          <div 
                                            className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                                            style={{ background: '#E3F2F7' }}
                                          >
                                            {resource.type === 'course' && <BookOpen className="h-5 w-5" style={{ color: '#048998' }} />}
                                            {resource.type === 'video' && <Video className="h-5 w-5" style={{ color: '#048998' }} />}
                                            {resource.type === 'documentation' && <FileText className="h-5 w-5" style={{ color: '#048998' }} />}
                                            {resource.type === 'tutorial' && <GraduationCap className="h-5 w-5" style={{ color: '#048998' }} />}
                                          </div>
                                          
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-start gap-2">
                                              <p className="font-semibold text-sm line-clamp-2 flex-1">
                                                {resource.title}
                                              </p>
                                              <ExternalLink className="h-3.5 w-3.5 text-gray-400 flex-shrink-0 mt-0.5 group-hover:text-[#048998] transition-colors" />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">{resource.platform}</p>
                                          </div>
                                        </div>

                                        {/* Resource Type Badge */}
                                        <div className="mb-3">
                                          <span 
                                            className="inline-block px-2 py-1 rounded-md text-xs font-medium"
                                            style={{ 
                                              background: '#E3F2F7',
                                              color: '#048998'
                                            }}
                                          >
                                            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                                          </span>
                                        </div>

                                        {/* Resource Metadata */}
                                        <div className="flex items-center gap-3 pt-3 border-t">
                                          {resource.duration && (
                                            <div className="flex items-center gap-1.5">
                                              <Clock className="h-3.5 w-3.5 text-gray-500" />
                                              <span className="text-xs text-gray-600 font-medium">
                                                {resource.duration}
                                              </span>
                                            </div>
                                          )}
                                          {resource.rating && (
                                            <div className="flex items-center gap-1.5">
                                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                              <span className="text-xs text-gray-600 font-medium">
                                                {resource.rating}
                                              </span>
                                            </div>
                                          )}
                                        </div>

                                        {/* Hover Effect Arrow */}
                                        <div className="mt-3 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#048998' }}>
                                          <span>Start Learning</span>
                                          <ChevronRight className="h-3 w-3" />
                                        </div>
                                      </div>
                                    </a>
                                  ))}
                                </div>

                                {/* Scroll Indicator */}
                                {skillData.learningResources.length > 1 && (
                                  <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                                )}
                              </div>

                              {/* Resource Count */}
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="inline-block w-2 h-2 rounded-full" style={{ background: '#048998' }} />
                                {skillData.learningResources.length} resource{skillData.learningResources.length !== 1 ? 's' : ''} available
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-16 w-16 mx-auto mb-4" style={{ color: '#10b981' }} />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Perfect Match!</h3>
                  <p className="text-gray-600">You have all the required skills for this position.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'matched' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5" style={{ color: '#10b981' }} />
                <h3 className="text-xl font-bold">Your Matching Skills</h3>
              </div>
              
              {analysis.matchedSkills && analysis.matchedSkills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.matchedSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl border"
                      style={{
                        background: '#f0fdf4',
                        opacity: 0,
                        animation: `fadeInUp 0.5s ease-out ${index * 0.05}s forwards`
                      }}
                    >
                      <div 
                        className="h-10 w-10 rounded-full flex items-center justify-center"
                        style={{ background: '#dcfce7' }}
                      >
                        <CheckCircle2 className="h-5 w-5" style={{ color: '#16a34a' }} />
                      </div>
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">No matching skills found for this position.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p className="font-medium">
                {analysis.missingSkills?.length > 0 
                  ? `Focus on ${analysis.missingSkills.length} skill${analysis.missingSkills.length !== 1 ? 's' : ''} to boost your match!`
                  : 'You\'re ready to apply!'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl font-medium text-white transition-all hover:shadow-lg hover:bg-[#3bb4c1]"
              style={{ background: '#048998' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Custom Scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #048998;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #3bb4c1;
        }
      `}</style>
    </div>
  );
}