/**
 * Keyword Suggestions Component
 * Displays missing keywords as tags
 */
import { FiAward, FiTag } from 'react-icons/fi';

export default function KeywordSuggestions({ keywords }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-slide-up">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <FiAward className="w-6 h-6 text-indigo-600" />
        Keyword Match Suggestions
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Based on your target job role, these keywords are missing but highly sought after:
      </p>

      {/* Keyword Tags */}
      <div className="flex flex-wrap gap-3">
        {keywords && keywords.length > 0 ? (
          keywords.map((keyword, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition cursor-pointer flex items-center gap-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <FiTag className="w-4 h-4" />
              {keyword}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No keywords suggestions available</p>
        )}
      </div>

      {/* Tip */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Add these keywords naturally throughout your resume,
          especially in your work experience and skills sections. This will improve your ATS score and increase your chances of being shortlisted.
        </p>
      </div>
    </div>
  );
}
