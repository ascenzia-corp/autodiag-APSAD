import type { ScoreLevel, Answers, AxisScore } from '@/types/diagnostic';
import type { Question } from '@/types/diagnostic';
import { axes } from './axes';

export const scoreLevels: ScoreLevel[] = [
  {
    min: 0,
    max: 20,
    label: 'Conforme',
    color: 'success',
    description:
      'Votre installation présente un bon niveau de conformité aux exigences APSAD. Maintenez cette vigilance par une maintenance régulière.',
  },
  {
    min: 21,
    max: 45,
    label: 'À surveiller',
    color: 'info',
    description:
      "Des points d'amélioration existent. Une mise à niveau ciblée renforcerait significativement votre protection.",
  },
  {
    min: 46,
    max: 70,
    label: 'Écarts significatifs',
    color: 'warning',
    description:
      "Des écarts importants sont identifiés sur plusieurs axes. Un plan d'action structuré est recommandé.",
  },
  {
    min: 71,
    max: 100,
    label: 'Écarts critiques',
    color: 'danger',
    description:
      'Votre installation présente des lacunes majeures nécessitant une intervention rapide pour assurer une protection efficace.',
  },
];

export function getScoreLevel(score: number): ScoreLevel {
  return (
    scoreLevels.find((level) => score >= level.min && score <= level.max) ||
    scoreLevels[scoreLevels.length - 1]
  );
}

export function calculateAxisScore(
  answers: Answers,
  axisId: string,
  questions: Question[]
): number {
  return questions
    .filter((q) => q.axisId === axisId)
    .reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
}

export function calculateTotalScore(answers: Answers, questions: Question[]): number {
  return questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
}

export function calculateAllAxisScores(
  answers: Answers,
  questions: Question[]
): AxisScore[] {
  return axes.map((axis) => {
    const score = calculateAxisScore(answers, axis.id, questions);
    return {
      axis: axis.shortName,
      score,
      max: axis.maxPoints,
      percentage: Math.round((score / axis.maxPoints) * 100),
    };
  });
}

// Get color based on percentage score (0% = best, 100% = worst)
export function getScoreColor(percentage: number): string {
  if (percentage <= 20) return '#22c55e'; // success
  if (percentage <= 50) return '#3b82f6'; // info
  if (percentage <= 75) return '#f59e0b'; // warning
  return '#ef4444'; // danger
}

// Get indicator color
export function getIndicatorColor(indicator?: 'optimal' | 'warning' | 'critical'): string {
  switch (indicator) {
    case 'optimal':
      return '#22c55e';
    case 'warning':
      return '#f59e0b';
    case 'critical':
      return '#ef4444';
    default:
      return '#64748b';
  }
}
