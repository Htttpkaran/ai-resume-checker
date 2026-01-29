/**
 * File Validation Middleware
 * Validates uploaded resume files for type and size
 */

const multer = require('multer');
const path = require('path');

// Configure multer for memory storage (files stored in memory as Buffer)
const storage = multer.memoryStorage();

// File filter - only allow PDF and DOCX files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  const allowedExtensions = ['.pdf', '.docx'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and DOCX files are allowed.'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // Default 5MB
  }
});

/**
 * Middleware to handle file upload and validation
 */
const validateFileUpload = (req, res, next) => {
  const uploadSingle = upload.single('resume');
  
  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          error: 'File size too large. Maximum size is 5MB.'
        });
      }
      return res.status(400).json({
        success: false,
        error: `File upload error: ${err.message}`
      });
    } else if (err) {
      // Custom errors (like file type validation)
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No resume file provided. Please upload a PDF or DOCX file.'
      });
    }
    
    // File is valid, proceed to next middleware
    next();
  });
};

/**
 * Middleware to validate job role
 */
const validateJobRole = (req, res, next) => {
  const { jobRole } = req.body;
  
  if (!jobRole || typeof jobRole !== 'string' || jobRole.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Job role is required.'
    });
  }
  
  // Sanitize job role
  req.body.jobRole = jobRole.trim();
  next();
};

module.exports = {
  validateFileUpload,
  validateJobRole
};
