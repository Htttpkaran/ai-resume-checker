/**
 * API Service
 * Handles all API calls to the backend
 */

// Backend API URL - uses same-origin by default in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Analyze resume using backend API
 * @param {File} resumeFile - Resume file (PDF or DOCX)
 * @param {string} jobRole - Target job role
 * @returns {Promise<Object>} - Analysis results
 */
export const analyzeResume = async (resumeFile, jobRole) => {
  try {
    // Create FormData object
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobRole', jobRole);

    // Make API call
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - browser will set it automatically with boundary
    });

    // Parse response
    const result = await response.json();

    // Check if request was successful
    if (!response.ok) {
      throw new Error(result.error || 'Failed to analyze resume');
    }

    // Check if response has expected structure
    if (!result.success || !result.data) {
      throw new Error('Invalid response format from server');
    }

    return result.data;

  } catch (error) {
    // Handle different error types
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check your network connection.');
    }
    
    throw error;
  }
};

/**
 * Check backend health status
 * @returns {Promise<Object>} - Health status
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
  } catch (error) {
    throw new Error('Backend server is not responding');
  }
};
