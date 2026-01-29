/**
 * Job Role Selector Component
 * Dropdown to select target job role
 */
import { useState } from 'react';
import { FiCheck, FiChevronDown } from 'react-icons/fi';

export default function JobRoleSelector({ onRoleSelect }) {
  const [selectedRole, setSelectedRole] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const jobRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Analyst',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'DevOps Engineer',
    'Mobile Developer',
    'QA Engineer',
  ];

  const handleSelect = (role) => {
    setSelectedRole(role);
    onRoleSelect(role);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">
          ⚙️
        </span>
        Target Job Role
      </label>

      {/* Custom Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left bg-white hover:border-indigo-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition flex items-center justify-between"
        >
          <span className={selectedRole ? 'text-gray-900 font-medium' : 'text-gray-500'}>
            {selectedRole || 'Select a role...'}
          </span>
          <FiChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
            {jobRoles.map((role) => (
              <button
                key={role}
                onClick={() => handleSelect(role)}
                className={`w-full px-4 py-3 text-left hover:bg-indigo-50 transition flex items-center gap-3 ${
                  selectedRole === role ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-700'
                }`}
              >
                {selectedRole === role && (
                  <FiCheck className="w-5 h-5 text-indigo-600" />
                )}
                {role}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Helper Text */}
      <p className="mt-2 text-xs text-gray-500">
        Select your target job role to get more relevant keyword suggestions and analysis.
      </p>
    </div>
  );
}
