/**
 * JSON Parser Utilities
 * Safely parses and validates AI response JSON
 */

/**
 * Extract JSON from text that may contain markdown code blocks or extra text
 * @param {string} text - Raw text that may contain JSON
 * @returns {string} - Cleaned JSON string
 */
const extractJSON = (text) => {
  // Remove markdown code blocks if present
  let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  
  // Try to find JSON object between curly braces
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return jsonMatch[0];
  }
  
  return cleaned.trim();
};

/**
 * Validate the structure of the analysis result
 * @param {Object} data - Parsed JSON data
 * @returns {boolean} - True if valid structure
 */
const validateStructure = (data) => {
  // Check if data is an object
  if (!data || typeof data !== 'object') {
    return false;
  }
  
  // Required fields with their expected types
  const requiredFields = {
    score: 'number',
    ats: 'number',
    keywordMatch: 'number',
    strengths: 'array',
    improvements: 'array',
    missingKeywords: 'array',
    tips: 'array'
  };
  
  // Validate each field
  for (const [field, expectedType] of Object.entries(requiredFields)) {
    if (!(field in data)) {
      return false;
    }
    
    if (expectedType === 'number' && typeof data[field] !== 'number') {
      return false;
    }
    
    if (expectedType === 'array' && !Array.isArray(data[field])) {
      return false;
    }
  }
  
  return true;
};

/**
 * Sanitize and normalize the analysis data
 * @param {Object} data - Raw parsed data
 * @returns {Object} - Sanitized data
 */
const sanitizeData = (data) => {
  return {
    score: Math.min(100, Math.max(0, Math.round(data.score))),
    ats: Math.min(100, Math.max(0, Math.round(data.ats))),
    keywordMatch: Math.min(100, Math.max(0, Math.round(data.keywordMatch))),
    strengths: Array.isArray(data.strengths) 
      ? data.strengths.filter(s => typeof s === 'string' && s.trim() !== '').slice(0, 10)
      : [],
    improvements: Array.isArray(data.improvements)
      ? data.improvements.filter(i => typeof i === 'string' && i.trim() !== '').slice(0, 10)
      : [],
    missingKeywords: Array.isArray(data.missingKeywords)
      ? data.missingKeywords.filter(k => typeof k === 'string' && k.trim() !== '').slice(0, 15)
      : [],
    tips: Array.isArray(data.tips)
      ? data.tips.filter(t => typeof t === 'string' && t.trim() !== '').slice(0, 10)
      : []
  };
};

/**
 * Main function to parse AI response and return structured data
 * @param {string} responseText - Raw AI response text
 * @returns {Object} - Parsed and validated analysis data
 */
const parseAIResponse = (responseText) => {
  try {
    // Extract JSON from response
    const jsonString = extractJSON(responseText);
    
    // Parse JSON
    const parsedData = JSON.parse(jsonString);
    
    // Validate structure
    if (!validateStructure(parsedData)) {
      throw new Error('Invalid response structure from AI');
    }
    
    // Sanitize and return
    return sanitizeData(parsedData);
    
  } catch (error) {
    console.error('JSON parsing error:', error);
    throw new Error('Failed to parse AI response. Please try again.');
  }
};

/**
 * Create a fallback response when AI fails
 * @param {string} reason - Reason for fallback
 * @returns {Object} - Default analysis structure
 */
const createFallbackResponse = (reason = 'Analysis unavailable') => {
  return {
    score: 0,
    ats: 0,
    keywordMatch: 0,
    strengths: ['Unable to analyze resume'],
    improvements: [`Error: ${reason}`],
    missingKeywords: [],
    tips: ['Please try uploading your resume again']
  };
};

module.exports = {
  parseAIResponse,
  extractJSON,
  validateStructure,
  sanitizeData,
  createFallbackResponse
};
