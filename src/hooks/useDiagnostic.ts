import { useState, useCallback, useMemo } from 'react';
import type {
  DiagnosticState,
  DiagnosticStep,
  UserContext,
  LeadData,
} from '@/types/diagnostic';
import { questions, totalQuestions } from '@/data/questions';
import { calculateTotalScore, calculateAllAxisScores, getScoreLevel } from '@/data/scoring';
import { getRecommendations } from '@/data/recommendations';
import { totalMaxPoints } from '@/data/axes';

const initialState: DiagnosticState = {
  currentStep: 'welcome',
  currentQuestionIndex: 0,
  context: {},
  answers: {},
  leadData: null,
};

export function useDiagnostic() {
  const [state, setState] = useState<DiagnosticState>(initialState);

  // Navigation
  const goToStep = useCallback((step: DiagnosticStep) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const startDiagnostic = useCallback(() => {
    setState((prev) => ({ ...prev, currentStep: 'context' }));
  }, []);

  const submitContext = useCallback((context: UserContext) => {
    setState((prev) => ({
      ...prev,
      context,
      currentStep: 'questions',
      currentQuestionIndex: 0,
    }));
  }, []);

  const answerQuestion = useCallback((questionId: string, points: number) => {
    setState((prev) => {
      const newAnswers = { ...prev.answers, [questionId]: points };
      const nextIndex = prev.currentQuestionIndex + 1;

      // Check if all questions are answered
      if (nextIndex >= totalQuestions) {
        return {
          ...prev,
          answers: newAnswers,
          currentStep: 'lead-capture',
        };
      }

      return {
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: nextIndex,
      };
    });
  }, []);

  const goToPreviousQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.currentQuestionIndex > 0) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1,
        };
      }
      // Go back to context if at first question
      return {
        ...prev,
        currentStep: 'context',
      };
    });
  }, []);

  const submitLeadData = useCallback((leadData: LeadData) => {
    setState((prev) => ({
      ...prev,
      leadData,
      currentStep: 'results',
    }));
  }, []);

  const skipLeadCapture = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: 'results',
    }));
  }, []);

  const restart = useCallback(() => {
    setState(initialState);
  }, []);

  // Current question
  const currentQuestion = useMemo(() => {
    return questions[state.currentQuestionIndex];
  }, [state.currentQuestionIndex]);

  // Progress (0-100)
  const progress = useMemo(() => {
    if (state.currentStep === 'welcome') return 0;
    if (state.currentStep === 'context') return 5;
    if (state.currentStep === 'questions') {
      // Questions represent 5% to 85%
      const questionProgress = (state.currentQuestionIndex / totalQuestions) * 80;
      return 5 + questionProgress;
    }
    if (state.currentStep === 'lead-capture') return 90;
    return 100;
  }, [state.currentStep, state.currentQuestionIndex]);

  // Computed results
  const results = useMemo(() => {
    const totalScore = calculateTotalScore(state.answers, questions);
    const normalizedScore = Math.round((totalScore / totalMaxPoints) * 100);
    const axisScores = calculateAllAxisScores(state.answers, questions);
    const scoreLevel = getScoreLevel(normalizedScore);
    const recs = getRecommendations(state.answers);

    return {
      totalScore,
      normalizedScore,
      axisScores,
      scoreLevel,
      recommendations: recs,
    };
  }, [state.answers]);

  return {
    // State
    currentStep: state.currentStep,
    currentQuestionIndex: state.currentQuestionIndex,
    context: state.context,
    answers: state.answers,
    leadData: state.leadData,
    currentQuestion,
    progress,
    totalQuestions,

    // Results
    results,

    // Actions
    startDiagnostic,
    submitContext,
    answerQuestion,
    goToPreviousQuestion,
    submitLeadData,
    skipLeadCapture,
    restart,
    goToStep,
  };
}

export type UseDiagnosticReturn = ReturnType<typeof useDiagnostic>;
