import type { Axis } from '@/types/diagnostic';

export const axes: Axis[] = [
  {
    id: 'risk',
    name: 'Analyse du risque',
    shortName: 'Risque',
    icon: 'Target',
    description:
      "La première étape d'une installation APSAD est l'analyse du risque. Elle permet de dimensionner le système en fonction de vos enjeux réels : valeur des biens, environnement, historique d'incidents.",
    maxPoints: 25,
  },
  {
    id: 'coverage',
    name: 'Couverture & implantation',
    shortName: 'Couverture',
    icon: 'Radio',
    description:
      "La couverture désigne l'étendue de la protection : quelles zones sont surveillées, par quels moyens, et avec quelle cohérence entre détection intrusion et vidéosurveillance.",
    maxPoints: 25,
  },
  {
    id: 'performance',
    name: 'Performance & exploitation',
    shortName: 'Performance',
    icon: 'Zap',
    description:
      "Un système performant est un système qui génère peu de fausses alarmes et dont les vraies alarmes sont traitées efficacement. L'exploitation au quotidien est aussi importante que l'installation.",
    maxPoints: 20,
  },
  {
    id: 'maintenance',
    name: 'Maintenance & pérennité',
    shortName: 'Maintenance',
    icon: 'Wrench',
    description:
      "Un système de sécurité nécessite une maintenance régulière pour rester fiable. Les équipements vieillissent, les batteries s'usent, les technologies évoluent.",
    maxPoints: 20,
  },
  {
    id: 'documentation',
    name: 'Documentation & gouvernance',
    shortName: 'Documentation',
    icon: 'FileText',
    description:
      'La documentation permet de piloter le système dans la durée : qui a accès à quoi, comment sont gérés les codes, les badges, les habilitations.',
    maxPoints: 10,
  },
];

export function getAxisById(id: string): Axis | undefined {
  return axes.find((axis) => axis.id === id);
}

export const totalMaxPoints = axes.reduce((sum, axis) => sum + axis.maxPoints, 0);
