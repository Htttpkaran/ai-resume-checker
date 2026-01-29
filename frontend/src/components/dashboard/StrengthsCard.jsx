/**
 * Strengths Card Component
 * Displays key strengths with checkmark icons
 */
import { FiCheck, FiCheckCircle } from 'react-icons/fi';

export default function StrengthsCard({ strengths }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <FiCheckCircle className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-bold text-gray-900">Key Strengths</h3>
      </div>

      <div className="space-y-4">
        {strengths && strengths.length > 0 ? (
          strengths.map((strength, index) => (
            <div key={index} className="flex gap-4">
              {/* Checkmark Icon */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <FiCheck className="w-5 h-5 text-green-600" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm text-gray-700">{strength}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No strengths data available</p>
        )}
      </div>
    </div>
  );
}
