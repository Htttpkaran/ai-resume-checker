/**
 * Circular Score Meter Component
 * Displays resume score out of 100
 */
import { getScoreColor } from '../../utils/helpers';

export default function CircularScoreMeter({ score }) {
  // Calculate the circle metrics
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* SVG Circular Progress */}
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
          <span className="text-sm text-gray-600">/100</span>
        </div>
      </div>

      {/* Score Label */}
      <p className="mt-6 text-lg font-semibold text-gray-900 text-center">
        {score >= 80 ? '🎉 Great Score!' : score >= 60 ? '👍 Good Score' : '⚠️ Needs Improvement'}
      </p>
      <p className="text-gray-600 text-center text-sm mt-2">
        {score >= 80
          ? 'Your resume is stronger than 78% of applicants in your field.'
          : score >= 60
          ? 'Your resume is competitive. Follow the tips below to improve further.'
          : 'Your resume needs improvement. Follow the actionable tips to increase your chances.'}
      </p>
    </div>
  );
}
