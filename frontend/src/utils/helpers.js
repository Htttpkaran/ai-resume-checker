/**
 * Utility functions for the application
 */

// Format percentage for display
export const formatPercentage = (value) => {
  return Math.round(value);
};

// Determine color based on percentage/score
export const getScoreColor = (score) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

// Determine progress bar color
export const getProgressColor = (percentage) => {
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
};

// Get status badge style
export const getStatusBadge = (percentage) => {
  if (percentage >= 80) return { bg: 'bg-green-100', text: 'text-green-700', label: 'High' };
  if (percentage >= 60) return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Average' };
  return { bg: 'bg-red-100', text: 'text-red-700', label: 'Low' };
};
