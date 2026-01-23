import { AnimatePresence } from 'framer-motion';
import { useDiagnostic } from '@/hooks/useDiagnostic';
import { DiagnosticHeader, DiagnosticFooter } from './layout';
import {
  WelcomeStep,
  ContextStep,
  QuestionStep,
  LeadCaptureStep,
  ResultsStep,
} from './steps';
import { getAPSADCategory } from '@/types/diagnostic';

export function DiagnosticWizard() {
  const {
    currentStep,
    currentQuestionIndex,
    context,
    answers,
    currentQuestion,
    progress,
    totalQuestions,
    results,
    startDiagnostic,
    submitContext,
    answerQuestion,
    goToPreviousQuestion,
    submitLeadData,
    skipLeadCapture,
    restart,
  } = useDiagnostic();

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep onStart={startDiagnostic} />;

      case 'context':
        return (
          <ContextStep
            initialContext={context}
            onSubmit={submitContext}
          />
        );

      case 'questions':
        if (!currentQuestion) return null;
        return (
          <QuestionStep
            key={currentQuestion.id}
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            currentAnswer={answers[currentQuestion.id]}
            onAnswer={answerQuestion}
            onBack={goToPreviousQuestion}
          />
        );

      case 'lead-capture':
        return (
          <LeadCaptureStep
            previewData={results.axisScores}
            onSubmit={submitLeadData}
            onSkip={skipLeadCapture}
          />
        );

      case 'results':
        return (
          <ResultsStep
            totalScore={results.totalScore}
            normalizedScore={results.normalizedScore}
            axisScores={results.axisScores}
            scoreLevel={results.scoreLevel}
            recommendations={results.recommendations}
            apsadCategory={getAPSADCategory(context.siteArea)}
            onRestart={restart}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with progress */}
      <DiagnosticHeader
        progress={progress}
        showProgress={currentStep !== 'welcome' && currentStep !== 'results'}
      />

      {/* Main content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </main>

      {/* Footer */}
      {currentStep === 'results' && <DiagnosticFooter />}
    </div>
  );
}
