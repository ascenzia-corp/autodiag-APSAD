// Axis definition
export interface Axis {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  maxPoints: number;
}

// Question option
export interface QuestionOption {
  text: string;
  points: number;
  indicator?: 'optimal' | 'warning' | 'critical';
  feedback?: string;
}

// Question definition
export interface Question {
  id: string;
  axisId: string;
  text: string;
  helpText?: string;
  apsadReference?: string;
  options: QuestionOption[];
}

// Context question (not scored)
export interface ContextOption {
  value: string;
  label: string;
  category?: string;
}

export interface ContextQuestion {
  id: string;
  label: string;
  type: 'select';
  required: boolean;
  helpText?: string;
  options: ContextOption[];
}

// User context data
export interface UserContext {
  sector?: string;
  siteArea?: string;
  mainConcern?: string;
}

// Lead data
export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  jobTitle: string;
  wantsCallback: boolean;
}

// Answers map
export type Answers = Record<string, number>;

// Score level
export interface ScoreLevel {
  min: number;
  max: number;
  label: string;
  color: 'success' | 'info' | 'warning' | 'danger';
  description: string;
}

// Recommendation
export interface Recommendation {
  id: string;
  questionId: string;
  threshold: number;
  priority: 1 | 2 | 3;
  text: string;
  apsadRef?: string;
}

// Axis score for radar chart
export interface AxisScore {
  axis: string;
  score: number;
  max: number;
  percentage: number;
}

// Diagnostic state
export type DiagnosticStep =
  | 'welcome'
  | 'context'
  | 'questions'
  | 'lead-capture'
  | 'results';

export interface DiagnosticState {
  currentStep: DiagnosticStep;
  currentQuestionIndex: number;
  context: UserContext;
  answers: Answers;
  leadData: LeadData | null;
}

// APSAD category based on site area
export type APSADCategory = 'A' | 'B' | 'C';

export function getAPSADCategory(siteArea: string | undefined): APSADCategory {
  switch (siteArea) {
    case 'less_800':
      return 'A';
    case '800_3000':
      return 'B';
    case 'more_3000':
      return 'C';
    default:
      return 'B';
  }
}
