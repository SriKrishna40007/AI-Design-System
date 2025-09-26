
export enum AgentName {
  CREATIVE = 'Creative Agent',
  BRAND = 'Brand Guideline Agent',
  AB_TESTING = 'A/B Testing Agent',
  COMPLIANCE = 'Compliance Agent',
  REFINEMENT = 'Refinement Agent',
}

export interface Design {
  id: string;
  imageUrl: string;
  prompt: string;
}

export interface ABTestVariation {
  id: string;
  imageUrl: string;
  rationale: string;
  variable: string;
}

export enum ComplianceIssueType {
  WCAG = 'WCAG 2.1 AA',
  LEGAL = 'Legal Ad Copy',
}

export interface ComplianceIssue {
  type: ComplianceIssueType;
  description: string;
  suggestion: string;
}

export interface ComplianceReportData {
  status: 'Pass' | 'Fail';
  issues: ComplianceIssue[];
}
