
import React from 'react';
import { Design } from '../types';

interface DesignCanvasProps {
  design: Design | null;
  isLoading: boolean;
}

const DesignCanvas: React.FC<DesignCanvasProps> = ({ design, isLoading }) => {
  return (
    <div className="w-full h-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center p-4 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
          <svg className="animate-spin h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg font-semibold text-cyan-400">Creative Agent is generating...</p>
        </div>
      )}
      {!isLoading && !design && (
        <div className="text-center text-gray-500">
          <h2 className="text-2xl font-bold">Design Canvas</h2>
          <p>Your generated design will appear here.</p>
          <p className="mt-2 text-sm">Use the controls on the left to start.</p>
        </div>
      )}
      {design && (
        <img
          key={design.id}
          src={design.imageUrl}
          alt={design.prompt}
          className="max-w-full max-h-full object-contain rounded-md shadow-lg animate-fade-in"
        />
      )}
    </div>
  );
};

export default DesignCanvas;
