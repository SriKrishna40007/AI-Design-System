
import React from 'react';
import { ComplianceReportData, ComplianceIssueType } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface ComplianceReportProps {
  report: ComplianceReportData;
}

const ComplianceReport: React.FC<ComplianceReportProps> = ({ report }) => {
  const isPass = report.status === 'Pass';

  return (
    <div className="space-y-4 animate-fade-in">
      <div className={`flex items-center gap-3 p-3 rounded-lg ${isPass ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
        {isPass ? <CheckIcon className="w-8 h-8"/> : <XCircleIcon className="w-8 h-8"/>}
        <div>
          <h3 className="text-xl font-bold">{isPass ? 'Compliance Passed' : 'Compliance Failed'}</h3>
          <p className="text-sm">{isPass ? 'No critical issues found.' : `${report.issues.length} issues found.`}</p>
        </div>
      </div>

      {!isPass && (
        <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-200">Suggested Fixes:</h4>
            {report.issues.map((issue, index) => (
                <div key={index} className="p-3 bg-gray-800 rounded-md border-l-4 border-yellow-500">
                    <p className={`text-xs font-bold uppercase ${issue.type === ComplianceIssueType.WCAG ? 'text-sky-400' : 'text-orange-400'}`}>
                        {issue.type}
                    </p>
                    <p className="font-semibold text-gray-300 mt-1">{issue.description}</p>
                    <p className="text-sm text-gray-400 mt-1">
                        <span className="font-medium text-gray-200">Suggestion:</span> {issue.suggestion}
                    </p>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ComplianceReport;
