import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-red-700">
        <AlertCircle size={20} />
        <span>{message}</span>
      </div>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorMessage;