
import React from 'react';
import { ABTestVariation } from '../types';

interface ABTestViewProps {
  variations: ABTestVariation[];
}

const ABTestView: React.FC<ABTestViewProps> = ({ variations }) => {
  return (
    <div className="space-y-4">
      {variations.map((variation) => (
        <div key={variation.id} className="bg-gray-800 p-3 rounded-lg flex gap-4 animate-fade-in-up">
          <img 
            src={variation.imageUrl} 
            alt={variation.variable} 
            className="w-24 h-24 object-cover rounded-md flex-shrink-0" 
          />
          <div className="flex flex-col">
            <h4 className="font-bold text-indigo-400">{variation.variable}</h4>
            <p className="text-sm text-gray-300">{variation.rationale}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ABTestView;
