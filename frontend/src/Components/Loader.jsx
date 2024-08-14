// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
