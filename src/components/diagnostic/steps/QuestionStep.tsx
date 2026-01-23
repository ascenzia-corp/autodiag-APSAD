import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Info, BookOpen } from 'lucide-react';
import { Button, Badge, OptionButton } from '../ui';
import { getAxisById } from '@/data/axes';
import type { Question } from '@/types/diagnostic';

export interface QuestionStepProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  currentAnswer?: number;
  onAnswer: (questionId: string, points: number) => void;
  onBack: () => void;
}

export function QuestionStep({
  question,
  questionIndex,
  totalQuestions,
  currentAnswer,
  onAnswer,
  onBack,
}: QuestionStepProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const axis = getAxisById(question.axisId);

  // Reset selection when question changes, but check for existing answer
  useEffect(() => {
    if (currentAnswer !== undefined) {
      const existingIndex = question.options.findIndex(
        (opt) => opt.points === currentAnswer
      );
      setSelectedIndex(existingIndex >= 0 ? existingIndex : null);
    } else {
      setSelectedIndex(null);
    }
  }, [question.id, currentAnswer]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const handleContinue = () => {
    if (selectedIndex !== null) {
      onAnswer(question.id, question.options[selectedIndex].points);
    }
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="py-8 sm:py-12"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Question header */}
        <div className="mb-6">
          {/* Axis and progress */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="default">
              {axis?.shortName || 'Question'}
            </Badge>
            <span className="text-sm text-muted tabular-nums">
              Question {questionIndex + 1} / {totalQuestions}
            </span>
          </div>

          {/* Question text */}
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground leading-relaxed">
            {question.text}
          </h2>

          {/* Help text */}
          {question.helpText && (
            <div className="mt-4 flex gap-3 p-4 rounded-lg bg-info-light/50 border border-info/20">
              <Info className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/80 leading-relaxed">
                {question.helpText}
              </p>
            </div>
          )}

          {/* APSAD Reference */}
          {question.apsadReference && (
            <div className="mt-3 flex items-center gap-2 text-xs text-muted">
              <BookOpen className="w-4 h-4" />
              <span>Réf. APSAD : {question.apsadReference}</span>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          <AnimatePresence mode="wait">
            {question.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <OptionButton
                  option={option}
                  index={index}
                  isSelected={selectedIndex === index}
                  onSelect={() => handleSelect(index)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </Button>

          <Button
            onClick={handleContinue}
            disabled={selectedIndex === null}
            size="lg"
          >
            Continuer
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
