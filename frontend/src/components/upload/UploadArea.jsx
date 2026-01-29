/**
 * Drag & Drop Upload Area Component
 * Handles resume file upload with visual feedback
 */
 import { useState } from 'react';
 import { FiCheckCircle, FiUploadCloud } from 'react-icons/fi';

export default function UploadArea({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Validate file type
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFileName(file.name);
        onFileSelect(file);
      } else {
        alert('Please upload a PDF or DOCX file');
      }
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      {/* Drag and Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50 scale-105'
            : 'border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50'
        }`}
      >
        {/* Upload Icon */}
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <FiUploadCloud className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload your Resume</h3>
        <p className="text-gray-600 mb-4">Drag and drop your PDF or DOCX file here or click to browse.</p>

        {/* File Input */}
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileInputChange}
          className="hidden"
          id="resume-upload"
        />

        {/* Browse Button */}
        <label htmlFor="resume-upload" className="inline-block">
          <button
            className="px-6 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => document.getElementById('resume-upload').click()}
          >
            Select File
          </button>
        </label>

        {/* File Info */}
        <p className="text-sm text-gray-500 mt-4">Supported: PDF and DOCX files (Max 10MB)</p>
      </div>

      {/* Selected File Display */}
      {fileName && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-900">File uploaded: {fileName}</p>
            <p className="text-xs text-gray-600">Ready for analysis</p>
          </div>
        </div>
      )}
    </div>
  );
}
