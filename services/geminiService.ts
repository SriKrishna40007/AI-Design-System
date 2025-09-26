
import { Design, ABTestVariation, ComplianceReportData, ComplianceIssueType } from '../types';

const MOCK_DELAY = 1500; // Simulate network latency

const getRandomId = () => Math.random().toString(36).substring(2, 9);
const getRandomImageUrl = (width=800, height=600) => `https://picsum.photos/${width}/${height}?random=${getRandomId()}`;

// Agent 1: The Creative Agent
export const runCreativeAgent = (prompt: string, brandFile: File | null): Promise<Design> => {
  console.log('Running Creative Agent with prompt:', prompt, 'and brand file:', brandFile?.name);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: getRandomId(),
        imageUrl: getRandomImageUrl(1024, 768),
        prompt: prompt,
      });
    }, MOCK_DELAY);
  });
};

// Agent 5: The Iterative Refinement Agent
export const runRefinementAgent = (currentDesign: Design, refinementPrompt: string): Promise<Design> => {
  console.log('Running Refinement Agent on design', currentDesign.id, 'with prompt:', refinementPrompt);
   return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: getRandomId(),
        imageUrl: getRandomImageUrl(1024, 768),
        prompt: `${currentDesign.prompt}, refined with: "${refinementPrompt}"`,
      });
    }, MOCK_DELAY);
  });
};

// Agent 3: The A/B Testing Agent
export const runABTestingAgent = (design: Design): Promise<ABTestVariation[]> => {
  console.log('Running A/B Testing Agent on design:', design.id);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: getRandomId(), imageUrl: getRandomImageUrl(600, 400), variable: 'Color Palette', rationale: 'Hypothesis: A warmer color palette will increase user trust and engagement.' },
        { id: getRandomId(), imageUrl: getRandomImageUrl(600, 400), variable: 'CTA Button Placement', rationale: 'Hypothesis: Moving the CTA above the fold will improve click-through rates by 15%.' },
        { id: getRandomId(), imageUrl: getRandomImageUrl(600, 400), variable: 'Headline Font', rationale: 'Hypothesis: Using a serif font for the headline will convey a more premium and authoritative brand image.' },
        { id: getRandomId(), imageUrl: getRandomImageUrl(600, 400), variable: 'Image Subject', rationale: 'Hypothesis: Featuring a person-focused image instead of a product shot will create a stronger emotional connection.' },
        { id: getRandomId(), imageUrl: getRandomImageUrl(600, 400), variable: 'Copy Tone', rationale: 'Hypothesis: A more direct and benefit-oriented copy will lead to higher conversions.' },
      ]);
    }, MOCK_DELAY);
  });
};

// Agent 4: The Accessibility & Compliance Agent
export const runComplianceAgent = (design: Design): Promise<ComplianceReportData> => {
  console.log('Running Compliance Agent on design:', design.id);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 'Fail',
        issues: [
          { type: ComplianceIssueType.WCAG, description: 'Low contrast on button text.', suggestion: 'Increase text color lightness from #888888 to #DDDDDD for a contrast ratio of at least 4.5:1.' },
          { type: ComplianceIssueType.WCAG, description: 'Missing ALT text for primary image.', suggestion: 'Add descriptive alt text, e.g., "A designer sketching on a tablet."' },
          { type: ComplianceIssueType.LEGAL, description: 'Vague claim: "The best design tool ever."', suggestion: 'Change to a more defensible claim, e.g., "A top-rated design tool by our users."' },
          { type: ComplianceIssueType.LEGAL, description: 'Missing disclaimer for promotional offer.', suggestion: 'Add "*Terms and conditions apply" link next to the offer details.' },
        ],
      });
    }, MOCK_DELAY);
  });
};
