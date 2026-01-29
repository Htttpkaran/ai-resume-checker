/**
 * Improvements Card Component
 * Displays areas for improvement with warning icons
 */
import { FiAlertCircle } from 'react-icons/fi';

export default function ImprovementsCard({ improvements }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <FiAlertCircle className="w-6 h-6 text-red-600" />
        <h3 className="text-xl font-bold text-gray-900">Improvement Areas</h3>
      </div>

      <div className="space-y-4">
        {improvements && improvements.length > 0 ? (
          improvements.map((improvement, index) => (
            <div key={index} className="flex gap-4 p-4 bg-red-50 rounded-lg border border-red-100">
              {/* Warning Icon */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <FiAlertCircle className="w-5 h-5 text-red-600" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm text-gray-700">{improvement}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No improvements data available</p>
        )}
      </div>
    </div>
  );
}
