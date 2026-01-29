/**
 * Gemini AI Service
 * Handles communication with Google Gemini API for resume analysis
 */

const { GoogleGenAI } = require('@google/genai');

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini client
let geminiClient = null;

const initializeClient = () => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please add GEMINI_API_KEY to your .env file.');
  }
  
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }
  
  return geminiClient;
};

/**
 * Generate ATS-optimized prompt for Gemini
 * @param {string} resumeText - Extracted resume text
 * @param {string} jobRole - Target job role
 * @returns {string} - Structured prompt
 */
const generatePrompt = (resumeText, jobRole) => {
  return `You are an expert ATS (Applicant Tracking System) resume analyzer and career coach. Analyze the following resume for the "${jobRole}" position.

RESUME CONTENT:
${resumeText}

TARGET JOB ROLE: ${jobRole}

ANALYSIS REQUIREMENTS:
1. Evaluate ATS compatibility (format, keywords, structure)
2. Calculate overall resume quality score
3. Assess keyword match percentage for "${jobRole}"
4. Identify key strengths
5. Suggest specific improvements
6. List missing critical keywords for this role
7. Provide actionable tips

CRITICAL: Respond ONLY with valid JSON. No explanations, no markdown, no code blocks. Just pure JSON.

Required JSON structure:
{
  "score": <number 0-100>,
  "ats": <number 0-100>,
  "keywordMatch": <number 0-100>,
  "strengths": [<array of 3-8 specific strengths as strings>],
  "improvements": [<array of 3-8 actionable improvements as strings>],
  "missingKeywords": [<array of 5-12 important missing keywords as strings>],
  "tips": [<array of 3-6 professional tips as strings>]
}

SCORING GUIDELINES:
- score: Overall resume quality (0-100)
- ats: ATS compatibility score (0-100)
- keywordMatch: Percentage of role-relevant keywords present (0-100)

IMPORTANT RULES:
- All array items must be clear, specific, and actionable
- Focus on "${jobRole}" requirements
- Be constructive and professional
- Provide diverse, non-repetitive points
- Each improvement should address different aspects

Return ONLY the JSON object. No other text.`;
};

/**
 * Call Gemini API with the analysis prompt
 * @param {string} resumeText - Extracted resume text
 * @param {string} jobRole - Target job role
 * @returns {Promise<string>} - AI response text
 */
const analyzeResume = async (resumeText, jobRole) => {
  try {
    // Initialize client
    const ai = initializeClient();
    
    // Generate prompt
    const prompt = generatePrompt(resumeText, jobRole);
    
    // Call Gemini API using the official SDK
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // Extract text from response
    if (response && response.text) {
      return response.text;
    } else {
      throw new Error('Invalid response structure from Gemini API');
    }
    
  } catch (error) {
    // Handle different error types
    console.error('Gemini API error:', error);
    
    if (error.message && error.message.includes('API key')) {
      throw new Error('Invalid API key. Please check your Gemini API configuration.');
    }
    
    if (error.message && error.message.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    }
    
    if (error.message && error.message.includes('not found')) {
      throw new Error('Model not available. Please try again or contact support.');
    }
    
    // Other errors
    throw new Error(error.message || 'Failed to analyze resume with AI');
  }
};

module.exports = {
  analyzeResume,
  generatePrompt
};
