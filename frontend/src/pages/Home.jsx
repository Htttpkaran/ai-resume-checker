/**
 * Home Page
 * Landing page with resume upload and analysis form
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLoader, FiZap } from 'react-icons/fi';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import UploadArea from '../components/upload/UploadArea';
import JobRoleSelector from '../components/upload/JobRoleSelector';
import { analyzeResume } from '../services/api';

export default function Home() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  };

  // Handle job role selection
  const handleRoleSelect = (selectedRole) => {
    setJobRole(selectedRole);
  };

  // Handle analyze resume
  const handleAnalyzeResume = async () => {
    if (!file) {
      alert('Please upload a resume');
      return;
    }
    if (!jobRole) {
      alert('Please select a job role');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call backend API
      const analysisData = await analyzeResume(file, jobRole);

      // Navigate to results page with analysis data
      navigate('/results', {
        state: {
          fileName: file.name,
          jobRole: jobRole,
          analysis: analysisData,
        },
      });
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br  text-black pt-16 sm:pt-18">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 leading-tight">
              AI Resume Checker
            </h1>
            <p className="text-lg sm:text-xl text-black mb-3">
              Improve Your Resume for Any Job Role. Optimized for ATS and Recruiters. <br />
              <span className="font-semibold text-[#2B4BEE] ">No account required.</span>
            </p>
            <p className="text-black text-xl">
              Get instant, professional feedback on your resume in seconds.
            </p>
          </div>
        </section>

        {/* Upload Form Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12">
              {/* Step 1: Upload */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold">
                    1
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Upload Your Resume</h2>
                </div>
                <UploadArea onFileSelect={handleFileSelect} />
              </div>

              {/* Step 2: Select Role */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold">
                    2
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Select Target Role</h2>
                </div>
                <JobRoleSelector onRoleSelect={handleRoleSelect} />
              </div>

              {/* Step 3: Analyze */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold">
                    3
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900  ">Analyze Resume</h2>
                </div>

                <button
                  onClick={handleAnalyzeResume}
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r bg-[#2B4BEE] hover:shadow-lg hover:-translate-y-1 active:translate-y-0'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin w-5 h-5" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FiZap className="w-5 h-5" />
                      Analyze Resume
                    </>
                  )}
                </button>

                {/* Error Display */}
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 text-xl">⚠️</span>
                      <div>
                        <h4 className="font-semibold text-red-800 mb-1">Analysis Failed</h4>
                        <p className="text-sm text-red-700">{error}</p>
                        <p className="text-xs text-red-600 mt-2">
                          Make sure the backend server is running on port 5000.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <h4 className="font-semibold text-gray-900">Instant Feedback</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Get analysis results in seconds
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">📋</div>
                    <h4 className="font-semibold text-gray-900">PDF Supported</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Upload PDF or DOCX files
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🔒</div>
                    <h4 className="font-semibold text-gray-900">100% Private</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Your data is never stored
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Use ResumeAI?
              </h2>
              <p className="text-lg text-gray-600">
                Our AI analyzes your resume against real job requirements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">ATS Optimization</h3>
                <p className="text-gray-600">
                  Ensure your formatting and keywords are optimized to pass Applicant Tracking Systems.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Keyword Matching</h3>
                <p className="text-gray-600">
                  Get suggestions for missing keywords based on your target job role.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Actionable Tips</h3>
                <p className="text-gray-600">
                  Receive specific, prioritized recommendations to improve your resume.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Detailed Analysis</h3>
                <p className="text-gray-600">
                  Get comprehensive feedback on strengths and areas for improvement.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
