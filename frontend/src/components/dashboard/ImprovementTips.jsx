/**
 * Improvement Tips Component
 * Displays actionable tips with priority ordering
 */
import { FiStar } from 'react-icons/fi';

export default function ImprovementTips({ tips }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-slide-up">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <FiStar className="w-6 h-6 text-amber-600" />
        Actionable Improvement Tips
      </h3>

      <p className="text-sm text-gray-600 mb-6">
        Follow these tips in priority order to improve your resume:
      </p>

      <div className="space-y-4">
        {tips && tips.length > 0 ? (
          tips.map((tip, index) => (
            <div key={index} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
              {/* Priority Number */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No improvement tips available</p>
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
        <p className="text-sm text-gray-800">
          ✨ <strong>Ready to improve?</strong> Update your resume and re-upload it to see your new score and compare your progress.
        </p>
      </div>
    </div>
  );
}
