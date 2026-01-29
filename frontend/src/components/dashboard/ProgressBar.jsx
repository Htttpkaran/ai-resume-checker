/**
 * Progress Bar Component
 * Displays percentage metrics with labels and status
 */
import { getProgressColor, getStatusBadge, formatPercentage } from '../../utils/helpers';

export default function ProgressBar({ label, percentage, description }) {
  const statusBadge = getStatusBadge(percentage);
  const progressColor = getProgressColor(percentage);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadge.bg} ${statusBadge.text}`}>
          {statusBadge.label}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${progressColor} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Percentage Text */}
      <div className="mt-3 flex items-center justify-between">
        <span className={`text-2xl font-bold ${getProgressColor(percentage).replace('bg-', 'text-')}`}>
          {formatPercentage(percentage)}%
        </span>
        <span className="text-xs text-gray-500">Score: {formatPercentage(percentage)}/100</span>
      </div>
    </div>
  );
}
