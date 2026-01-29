/**
 * Resume Analysis Route
 * Main endpoint for processing resume uploads and returning AI analysis
 */

const express = require('express');
const router = express.Router();
const { validateFileUpload, validateJobRole } = require('../middleware/fileValidator');
const { extractText } = require('../utils/textExtractor');
const { analyzeResume } = require('../services/geminiService');
const { parseAIResponse, createFallbackResponse } = require('../utils/jsonParser');

/**
 * POST /api/analyze
 * Main resume analysis endpoint
 * 
 * Request:
 * - Form-data with 'resume' file (PDF/DOCX)
 * - Form-data with 'jobRole' string
 * 
 * Response:
 * {
 *   success: true,
 *   data: {
 *     score: number,
 *     ats: number,
 *     keywordMatch: number,
 *     strengths: string[],
 *     improvements: string[],
 *     missingKeywords: string[],
 *     tips: string[]
 *   }
 * }
 */
router.post('/', validateFileUpload, validateJobRole, async (req, res) => {
  try {
    const { file, body } = req;
    const { jobRole } = body;
    
    console.log(`📄 Analyzing resume for role: ${jobRole}`);
    console.log(`📎 File: ${file.originalname} (${file.mimetype}, ${(file.size / 1024).toFixed(2)} KB)`);
    
    // Step 1: Extract text from uploaded file
    console.log('🔍 Extracting text from resume...');
    let resumeText;
    try {
      resumeText = await extractText(file);
      console.log(`✅ Text extracted: ${resumeText.length} characters`);
    } catch (extractError) {
      console.error('❌ Text extraction failed:', extractError.message);
      return res.status(400).json({
        success: false,
        error: extractError.message
      });
    }
    
    // Step 2: Send to Gemini AI for analysis
    console.log('🤖 Sending to Gemini AI for analysis...');
    let aiResponse;
    try {
      aiResponse = await analyzeResume(resumeText, jobRole);
      console.log('✅ AI analysis received');
    } catch (aiError) {
      console.error('❌ AI analysis failed:', aiError.message);
      return res.status(500).json({
        success: false,
        error: aiError.message
      });
    }
    
    // Step 3: Parse and validate AI response
    console.log('📊 Parsing AI response...');
    let analysisData;
    try {
      analysisData = parseAIResponse(aiResponse);
      console.log('✅ Response parsed successfully');
    } catch (parseError) {
      console.error('❌ Parsing failed:', parseError.message);
      // Return fallback response instead of error
      analysisData = createFallbackResponse('AI response parsing failed');
    }
    
    // Step 4: Return structured response
    console.log('✨ Analysis complete!');
    return res.status(200).json({
      success: true,
      data: analysisData
    });
    
  } catch (error) {
    // Catch any unexpected errors
    console.error('❌ Unexpected error in analyze route:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred during resume analysis. Please try again.'
    });
  }
});

module.exports = router;
