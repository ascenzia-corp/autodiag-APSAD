import type { Recommendation, Answers } from '@/types/diagnostic';

export const recommendations: Recommendation[] = [
  {
    id: 'rec_risk_analysis',
    questionId: 'risk_analysis',
    threshold: 5,
    priority: 1,
    text: 'Formaliser une analyse de risque documentée avec un professionnel certifié',
    apsadRef: 'R81 §3.1',
  },
  {
    id: 'rec_incident_history',
    questionId: 'incident_history',
    threshold: 8,
    priority: 2,
    text: "Réaliser un retour d'expérience sur les incidents récents et adapter le système",
  },
  {
    id: 'rec_environment',
    questionId: 'environment_risk',
    threshold: 4,
    priority: 2,
    text: "Documenter les facteurs environnementaux de risque et ajuster le dimensionnement",
    apsadRef: 'R81 §3.2',
  },
  {
    id: 'rec_intrusion_coverage',
    questionId: 'intrusion_detection',
    threshold: 8,
    priority: 1,
    text: "Compléter la couverture de détection intrusion sur les zones non protégées",
    apsadRef: 'R81 §4',
  },
  {
    id: 'rec_video_coverage',
    questionId: 'video_coverage',
    threshold: 6,
    priority: 2,
    text: 'Étendre la vidéosurveillance aux zones sensibles non couvertes',
    apsadRef: 'R82 §4',
  },
  {
    id: 'rec_system_interface',
    questionId: 'system_coherence',
    threshold: 5,
    priority: 2,
    text: "Interfacer les systèmes d'intrusion et vidéo pour la levée de doute automatique",
  },
  {
    id: 'rec_false_alarms',
    questionId: 'alarm_management',
    threshold: 5,
    priority: 1,
    text: 'Réaliser un diagnostic technique pour réduire le taux de fausses alarmes',
    apsadRef: 'R81 §7',
  },
  {
    id: 'rec_monitoring',
    questionId: 'monitoring',
    threshold: 4,
    priority: 1,
    text: "Mettre en place une télésurveillance 24/7 avec protocole d'intervention défini",
    apsadRef: 'R31',
  },
  {
    id: 'rec_maintenance',
    questionId: 'maintenance_contract',
    threshold: 5,
    priority: 2,
    text: 'Mettre en place un contrat de maintenance conforme APSAD',
    apsadRef: 'I81 §8',
  },
  {
    id: 'rec_tests',
    questionId: 'periodic_tests',
    threshold: 6,
    priority: 2,
    text: 'Instaurer des tests périodiques documentés (trimestriels minimum)',
    apsadRef: 'R81 §7.3',
  },
  {
    id: 'rec_documentation',
    questionId: 'installation_file',
    threshold: 5,
    priority: 2,
    text: "Constituer un dossier d'installation complet avec plans et procédures",
    apsadRef: 'I81 §9',
  },
  {
    id: 'rec_access_codes',
    questionId: 'access_management',
    threshold: 4,
    priority: 1,
    text: 'Revoir la gestion des codes et badges : codes personnels, mise à jour régulière',
  },
];

export function getRecommendations(answers: Answers): Recommendation[] {
  return recommendations
    .filter((rec) => (answers[rec.questionId] ?? 0) >= rec.threshold)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 5); // Max 5 recommendations
}

export function getAllTriggeredRecommendations(answers: Answers): Recommendation[] {
  return recommendations
    .filter((rec) => (answers[rec.questionId] ?? 0) >= rec.threshold)
    .sort((a, b) => a.priority - b.priority);
}
