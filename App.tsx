
import React, { useState, useCallback } from 'react';
import { AgentName, Design, ABTestVariation, ComplianceReportData } from './types';
import Header from './components/Header';
import AgentControls from './components/AgentControls';
import DesignCanvas from './components/DesignCanvas';
import ABTestView from './components/ABTestView';
import ComplianceReport from './components/ComplianceReport';
import { runCreativeAgent, runABTestingAgent, runComplianceAgent, runRefinementAgent } from './services/geminiService';

type ActiveView = 'ab-test' | 'compliance' | 'none';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeAgent, setActiveAgent] = useState<AgentName | null>(null);
  const [currentDesign, setCurrentDesign] = useState<Design | null>(null);
  const [abTestVariations, setAbTestVariations] = useState<ABTestVariation[] | null>(null);
  const [complianceReport, setComplianceReport] = useState<ComplianceReportData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('none');

  const handleRunAgent = useCallback(async <T,>(
    agentName: AgentName,
    agentFunction: () => Promise<T>,
    onSuccess: (result: T) => void
  ) => {
    setIsLoading(true);
    setActiveAgent(agentName);
    setErrorMessage(null);
    try {
      const result = await agentFunction();
      onSuccess(result);
    } catch (error) {
      console.error(`Error running ${agentName}:`, error);
      setErrorMessage(`An error occurred while running the ${agentName}. Please try again.`);
    } finally {
      setIsLoading(false);
      setActiveAgent(null);
    }
  }, []);

  const handleGenerateDesign = useCallback((prompt: string, brandFile: File | null) => {
    handleRunAgent(
      AgentName.CREATIVE,
      () => runCreativeAgent(prompt, brandFile),
      (newDesign: Design) => {
        setCurrentDesign(newDesign);
        setActiveView('none');
        setAbTestVariations(null);
        setComplianceReport(null);
      }
    );
  }, [handleRunAgent]);

  const handleRefineDesign = useCallback((prompt: string) => {
    if (!currentDesign) return;
    handleRunAgent(
      AgentName.REFINEMENT,
      () => runRefinementAgent(currentDesign, prompt),
      (refinedDesign: Design) => {
        setCurrentDesign(refinedDesign);
        setActiveView('none');
      }
    );
  }, [currentDesign, handleRunAgent]);

  const handleRunABTest = useCallback(() => {
    if (!currentDesign) return;
    handleRunAgent(
      AgentName.AB_TESTING,
      () => runABTestingAgent(currentDesign),
      (variations: ABTestVariation[]) => {
        setAbTestVariations(variations);
        setComplianceReport(null);
        setActiveView('ab-test');
      }
    );
  }, [currentDesign, handleRunAgent]);

  const handleRunComplianceCheck = useCallback(() => {
    if (!currentDesign) return;
    handleRunAgent(
      AgentName.COMPLIANCE,
      () => runComplianceAgent(currentDesign),
      (report: ComplianceReportData) => {
        setComplianceReport(report);
        setAbTestVariations(null);
        setActiveView('compliance');
      }
    );
  }, [currentDesign, handleRunAgent]);
  
  const RightPanelContent = () => {
    if (activeView === 'ab-test' && abTestVariations) {
      return <ABTestView variations={abTestVariations} />;
    }
    if (activeView === 'compliance' && complianceReport) {
      return <ComplianceReport report={complianceReport} />;
    }
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Run A/B Test or Compliance Check to see results here.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
        <div className="lg:col-span-3 bg-gray-800/50 rounded-lg p-4 shadow-lg flex flex-col gap-4 overflow-y-auto">
          <AgentControls
            isLoading={isLoading}
            activeAgent={activeAgent}
            isDesignLoaded={!!currentDesign}
            onGenerate={handleGenerateDesign}
            onRefine={handleRefineDesign}
            onRunABTest={handleRunABTest}
            onRunComplianceCheck={handleRunComplianceCheck}
          />
        </div>

        <div className="lg:col-span-5 bg-gray-800/50 rounded-lg shadow-lg flex items-center justify-center p-4">
          <DesignCanvas design={currentDesign} isLoading={isLoading && activeAgent === AgentName.CREATIVE} />
        </div>

        <div className="lg:col-span-4 bg-gray-800/50 rounded-lg shadow-lg flex flex-col overflow-hidden">
           <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-cyan-400">Analysis & Validation</h2>
            <p className="text-sm text-gray-400">View A/B test variations and compliance reports.</p>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {isLoading && activeAgent !== AgentName.CREATIVE && activeAgent !== AgentName.REFINEMENT ? (
               <div className="flex items-center justify-center h-full">
                 <div className="text-center">
                    <p className="text-lg font-semibold text-cyan-400 animate-pulse">Running {activeAgent}...</p>
                    <p className="text-sm text-gray-400">Please wait while the AI is working.</p>
                 </div>
               </div>
            ) : <RightPanelContent />}
          </div>
        </div>
      </main>
      {errorMessage && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-xl animate-fade-in-up">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
