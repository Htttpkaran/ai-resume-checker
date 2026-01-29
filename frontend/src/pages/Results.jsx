/**
 * Results Page
 * Displays resume analysis results with detailed feedback
 */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiLoader } from 'react-icons/fi';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CircularScoreMeter from '../components/dashboard/CircularScoreMeter';
import ProgressBar from '../components/dashboard/ProgressBar';
import StrengthsCard from '../components/dashboard/StrengthsCard';
import ImprovementsCard from '../components/dashboard/ImprovementsCard';
import KeywordSuggestions from '../components/dashboard/KeywordSuggestions';
import ImprovementTips from '../components/dashboard/ImprovementTips';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Get state from navigation
  const { fileName, jobRole, analysis: analysisData } = location.state || {};

  useEffect(() => {
    // If no state or analysis data, redirect to home
    if (!fileName || !jobRole || !analysisData) {
      navigate('/');
      return;
    }

    // Use real analysis data from API
    setAnalysis(analysisData);
  }, [fileName, jobRole, analysisData, navigate]);

  if (!analysis) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <FiLoader className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading analysis results...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
                <p className="text-gray-600 mt-2">
                  Resume: <span className="font-semibold">{fileName}</span> | Job Role:{' '}
                  <span className="font-semibold">{jobRole}</span>
                </p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition"
              >
                ↑ Re-upload Resume
              </button>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition ${
                  activeTab === 'overview'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('detailed')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition ${
                  activeTab === 'detailed'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Detailed Feedback
              </button>
              <button
                onClick={() => setActiveTab('insights')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition ${
                  activeTab === 'insights'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                ATS Insights
              </button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                {/* Score and Progress Bars */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Circular Score */}
                  <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <CircularScoreMeter score={analysis.score} />
                  </div>

                  {/* Progress Metrics */}
                  <div className="lg:col-span-2 space-y-6">
                    <ProgressBar
                      label="ATS Compatibility"
                      percentage={analysis.ats}
                      description="How well your resume is optimized for applicant tracking systems"
                    />
                    <ProgressBar
                      label="Keyword Match"
                      percentage={analysis.keywordMatch}
                      description="How many relevant keywords from the job description are in your resume"
                    />
                  </div>
                </div>

                {/* Strengths and Improvements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <StrengthsCard strengths={analysis.strengths} />
                  <ImprovementsCard improvements={analysis.improvements} />
                </div>
              </div>
            )}

            {/* Detailed Feedback Tab */}
            {activeTab === 'detailed' && (
              <div className="space-y-8 animate-fade-in">
                <KeywordSuggestions keywords={analysis.missingKeywords} />
                <ImprovementTips tips={analysis.tips} />
              </div>
            )}

            {/* ATS Insights Tab */}
            {activeTab === 'insights' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">ATS Optimization Insights</h3>

                  <div className="space-y-6">
                    {/* ATS Compatibility Score */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">ATS Compatibility Score</h4>
                      <div className="flex items-end gap-4">
                        <div className="flex-1">
                          <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                              style={{ width: `${analysis.ats}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-green-600">{analysis.ats}%</div>
                      </div>
                      <p className="text-gray-600 text-sm mt-3">
                        Your resume has a {analysis.ats >= 80 ? 'good' : analysis.ats >= 60 ? 'fair' : 'needs improvement'} compatibility with ATS systems. It should parse
                        correctly through most applicant tracking systems.
                      </p>
                    </div>

                    {/* What is ATS */}
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">What is ATS?</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Applicant Tracking Systems (ATS) are software used by most companies to filter, screen,
                        and rank job applications. An ATS parses your resume to extract information like skills,
                        experience, and education. If your resume isn't optimized for ATS, it may be filtered out
                        before a human even reviews it.
                      </p>
                    </div>

                    {/* ATS Best Practices */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">ATS Best Practices</h4>
                      <ul className="space-y-3">
                        <li className="flex gap-3">
                          <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">
                            <strong>Use standard fonts</strong> (Arial, Calibri, Times New Roman)
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">
                            <strong>Avoid tables and graphics</strong> - use simple formatting
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">
                            <strong>Include keywords</strong> from the job description
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">
                            <strong>Use proper formatting</strong> - headers, bullets, standard spacing
                          </span>
                        </li>
                        <li className="flex gap-3">
                          <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">
                            <strong>Save as PDF or DOCX</strong> - avoid image-only formats
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
