
import React, { useState } from 'react';
import { AgentName } from '../types';
import Spinner from './Spinner';
import { CreativeIcon } from './icons/CreativeIcon';
import { ABTestIcon } from './icons/ABTestIcon';
import { ComplianceIcon } from './icons/ComplianceIcon';
import { RefineIcon } from './icons/RefineIcon';
import { BrandIcon } from './icons/BrandIcon';


interface AgentControlsProps {
  isLoading: boolean;
  activeAgent: AgentName | null;
  isDesignLoaded: boolean;
  onGenerate: (prompt: string, brandFile: File | null) => void;
  onRefine: (prompt: string) => void;
  onRunABTest: () => void;
  onRunComplianceCheck: () => void;
}

const AgentControls: React.FC<AgentControlsProps> = ({
  isLoading,
  activeAgent,
  isDesignLoaded,
  onGenerate,
  onRefine,
  onRunABTest,
  onRunComplianceCheck,
}) => {
  const [creativePrompt, setCreativePrompt] = useState('A futuristic logo for a space exploration company called "Nebula".');
  const [brandFile, setBrandFile] = useState<File | null>(null);
  const [refinementPrompt, setRefinementPrompt] = useState('Make the colors warmer and more inviting.');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBrandFile(e.target.files[0]);
    }
  };

  const isCreativeAgentRunning = isLoading && activeAgent === AgentName.CREATIVE;
  const isRefinementAgentRunning = isLoading && activeAgent === AgentName.REFINEMENT;
  const isABTestAgentRunning = isLoading && activeAgent === AgentName.AB_TESTING;
  const isComplianceAgentRunning = isLoading && activeAgent === AgentName.COMPLIANCE;

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Creative Agent */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2"><CreativeIcon /> Creative Agent</h3>
        <textarea
          value={creativePrompt}
          onChange={(e) => setCreativePrompt(e.target.value)}
          placeholder="Enter a design prompt..."
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          rows={3}
        />
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2"><BrandIcon /> Brand Guidelines (Optional)</label>
            <input type="file" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-900 file:text-cyan-300 hover:file:bg-cyan-800"/>
            {brandFile && <p className="text-xs text-gray-500 truncate">Uploaded: {brandFile.name}</p>}
        </div>
        <button
          onClick={() => onGenerate(creativePrompt, brandFile)}
          disabled={isLoading || !creativePrompt}
          className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-all"
        >
          {isCreativeAgentRunning ? <Spinner /> : <CreativeIcon />}
          {isCreativeAgentRunning ? 'Generating...' : 'Generate Design'}
        </button>
      </div>

      <hr className="border-gray-600"/>

      {/* Post-Generation Agents */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-300">Analysis & Refinement</h3>
        {/* Refinement Agent */}
        <div className="space-y-3">
            <h4 className="text-md font-semibold text-fuchsia-400 flex items-center gap-2"><RefineIcon /> Iterative Refinement</h4>
            <textarea
                value={refinementPrompt}
                onChange={(e) => setRefinementPrompt(e.target.value)}
                placeholder="e.g., 'make the logo bigger'"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
                rows={2}
                disabled={!isDesignLoaded}
            />
            <button
                onClick={() => onRefine(refinementPrompt)}
                disabled={!isDesignLoaded || isLoading || !refinementPrompt}
                className="w-full flex items-center justify-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-all"
            >
                {isRefinementAgentRunning ? <Spinner /> : <RefineIcon />}
                {isRefinementAgentRunning ? 'Refining...' : 'Refine'}
            </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {/* A/B Test Agent */}
          <button
            onClick={onRunABTest}
            disabled={!isDesignLoaded || isLoading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-all"
          >
            {isABTestAgentRunning ? <Spinner /> : <ABTestIcon />}
            {isABTestAgentRunning ? 'Testing...' : 'A/B Test'}
          </button>

          {/* Compliance Agent */}
          <button
            onClick={onRunComplianceCheck}
            disabled={!isDesignLoaded || isLoading}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-all"
          >
            {isComplianceAgentRunning ? <Spinner /> : <ComplianceIcon />}
            {isComplianceAgentRunning ? 'Checking...' : 'Compliance'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentControls;
