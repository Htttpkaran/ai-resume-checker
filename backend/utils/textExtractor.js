/**
 * Text Extraction Utilities
 * Extracts text content from PDF and DOCX files
 */

const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extract text from PDF file
 * @param {Buffer} fileBuffer - PDF file buffer
 * @returns {Promise<string>} - Extracted text
 */
const extractFromPDF = async (fileBuffer) => {
  try {
    const data = await pdfParse(fileBuffer);
    return data.text;
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF file. The file may be corrupted or password-protected.');
  }
};

/**
 * Extract text from DOCX file
 * @param {Buffer} fileBuffer - DOCX file buffer
 * @returns {Promise<string>} - Extracted text
 */
const extractFromDOCX = async (fileBuffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  } catch (error) {
    console.error('DOCX extraction error:', error);
    throw new Error('Failed to extract text from DOCX file. The file may be corrupted.');
  }
};

/**
 * Main text extraction function - determines file type and extracts accordingly
 * @param {Object} file - Multer file object
 * @returns {Promise<string>} - Extracted text
 */
const extractText = async (file) => {
  if (!file || !file.buffer) {
    throw new Error('Invalid file object provided.');
  }
  
  const mimeType = file.mimetype;
  let extractedText = '';
  
  if (mimeType === 'application/pdf') {
    extractedText = await extractFromPDF(file.buffer);
  } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    extractedText = await extractFromDOCX(file.buffer);
  } else {
    throw new Error('Unsupported file type.');
  }
  
  // Validate extracted text
  if (!extractedText || extractedText.trim().length < 50) {
    throw new Error('Resume appears to be empty or contains insufficient text. Please ensure your resume has readable content.');
  }
  
  return extractedText.trim();
};

module.exports = {
  extractText,
  extractFromPDF,
  extractFromDOCX
};
