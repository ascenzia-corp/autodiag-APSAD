import type { Question, ContextQuestion } from '@/types/diagnostic';

// Context questions (not scored)
export const contextQuestions: ContextQuestion[] = [
  {
    id: 'sector',
    label: "Secteur d'activité",
    type: 'select',
    required: true,
    options: [
      { value: 'industrie', label: 'Industrie / Logistique' },
      { value: 'tertiaire', label: 'Tertiaire / Bureaux' },
      { value: 'commerce', label: 'Commerce / Distribution' },
      { value: 'sante', label: 'Santé / Médico-social' },
      { value: 'erp', label: 'Établissement recevant du public (ERP)' },
      { value: 'autre', label: 'Autre' },
    ],
  },
  {
    id: 'siteArea',
    label: 'Surface approximative du site principal',
    type: 'select',
    required: true,
    helpText: 'Détermine votre catégorie APSAD',
    options: [
      { value: 'less_800', label: 'Moins de 800 m²', category: 'A' },
      { value: '800_3000', label: '800 à 3 000 m²', category: 'B' },
      { value: 'more_3000', label: 'Plus de 3 000 m²', category: 'C' },
    ],
  },
  {
    id: 'mainConcern',
    label: "Votre principal enjeu sécurité aujourd'hui",
    type: 'select',
    required: true,
    options: [
      { value: 'conformite', label: 'Mise en conformité réglementaire ou assurance' },
      { value: 'sinistre', label: "Suite à un sinistre ou une tentative d'intrusion" },
      { value: 'optimisation', label: 'Optimisation ou modernisation du système' },
      { value: 'nouveau_site', label: 'Nouveau site ou extension' },
      { value: 'audit', label: "Préparation d'un audit ou renouvellement de certification" },
    ],
  },
];

// Scored questions by axis
export const questions: Question[] = [
  // AXE 1: Analyse du risque (max 25 pts)
  {
    id: 'risk_analysis',
    axisId: 'risk',
    text: "Disposez-vous d'une analyse de risque formalisée pour votre site ?",
    helpText:
      "Une analyse de risque identifie les menaces (vol, intrusion, vandalisme), les zones sensibles et les mesures de protection adaptées. Elle est exigée par les référentiels APSAD.",
    apsadReference: 'R81 §3.1',
    options: [
      {
        text: 'Oui, une analyse documentée réalisée par un professionnel',
        points: 0,
        indicator: 'optimal',
        feedback: "Excellent. Vérifiez qu'elle est mise à jour régulièrement.",
      },
      {
        text: 'Oui, mais réalisée en interne sans méthodologie formelle',
        points: 5,
        indicator: 'warning',
      },
      {
        text: "Non, les équipements ont été installés sans étude préalable",
        points: 10,
        indicator: 'critical',
        feedback: "Une analyse de risque permettrait d'optimiser votre installation.",
      },
    ],
  },
  {
    id: 'incident_history',
    axisId: 'risk',
    text: "Votre site a-t-il connu des incidents de sécurité ces 3 dernières années ?",
    helpText:
      "Les incidents passés (intrusions, tentatives, vols, dégradations) doivent alimenter l'analyse de risque et justifier les évolutions du système.",
    options: [
      {
        text: 'Aucun incident significatif',
        points: 0,
        indicator: 'optimal',
      },
      {
        text: 'Incidents anciens (> 2 ans), mesures correctives prises',
        points: 3,
        indicator: 'optimal',
      },
      {
        text: 'Incidents récents (< 2 ans), système inchangé depuis',
        points: 8,
        indicator: 'warning',
        feedback: "Un retour d'expérience permettrait d'adapter votre protection.",
      },
      {
        text: 'Incidents récurrents malgré le système en place',
        points: 12,
        indicator: 'critical',
        feedback: 'Votre système actuel ne répond pas aux menaces identifiées.',
      },
    ],
  },
  {
    id: 'environment_risk',
    axisId: 'risk',
    text: 'Les facteurs environnementaux de risque sont-ils pris en compte ?',
    helpText:
      "L'environnement impacte le niveau de risque : zone isolée ou passante, voisinage sensible, visibilité depuis la voie publique, valeur des biens stockés.",
    apsadReference: 'R81 §3.2',
    options: [
      {
        text: 'Oui, ces facteurs sont documentés et intégrés au dimensionnement',
        points: 0,
        indicator: 'optimal',
      },
      {
        text: 'Partiellement, certains facteurs ont été considérés',
        points: 4,
        indicator: 'warning',
      },
      {
        text: "Non, le système est standard sans adaptation au contexte",
        points: 8,
        indicator: 'critical',
      },
    ],
  },

  // AXE 2: Couverture & implantation (max 25 pts)
  {
    id: 'intrusion_detection',
    axisId: 'coverage',
    text: "Comment qualifiez-vous la couverture de votre détection d'intrusion ?",
    helpText:
      "Une installation APSAD R81 combine généralement détection périmétrique (ouvertures, bris de vitre) et volumétrique (mouvement dans les locaux) pour une protection en profondeur.",
    apsadReference: 'R81 §4',
    options: [
      {
        text: 'Détection périmétrique ET volumétrique cohérente sur toutes les zones sensibles',
        points: 0,
        indicator: 'optimal',
      },
      {
        text: 'Détection présente mais partielle (certaines zones non couvertes)',
        points: 8,
        indicator: 'warning',
        feedback: 'Identifiez les zones non protégées et évaluez leur criticité.',
      },
      {
        text: "Détection minimale (uniquement quelques points d'accès)",
        points: 15,
        indicator: 'critical',
      },
      {
        text: "Pas de système de détection d'intrusion",
        points: 20,
        indicator: 'critical',
      },
    ],
  },
  {
    id: 'video_coverage',
    axisId: 'coverage',
    text: 'Quelle est la couverture de votre système de vidéosurveillance ?',
    helpText:
      "Les zones sensibles typiques : accès principaux, quais de livraison, parkings, zones de stockage à forte valeur, circulations principales.",
    apsadReference: 'R82 §4',
    options: [
      {
        text: 'Toutes les zones sensibles sont couvertes (accès, quais, stocks, circulations)',
        points: 0,
        indicator: 'optimal',
      },
      {
        text: 'Couverture partielle, certaines zones critiques non filmées',
        points: 6,
        indicator: 'warning',
      },
      {
        text: 'Couverture insuffisante ou caméras mal positionnées',
        points: 12,
        indicator: 'critical',
      },
      {
        text: 'Pas de vidéosurveillance',
        points: 18,
        indicator: 'critical',
      },
    ],
  },
  {
    id: 'system_coherence',
    axisId: 'coverage',
    text: 'Vos systèmes de détection et de vidéosurveillance sont-ils coordonnés ?',
    helpText:
      "Une bonne pratique : chaque alarme déclenche l'enregistrement et la levée de doute vidéo. Cela permet de qualifier l'événement (vraie alarme ou fausse alarme) et de réagir rapidement.",
    options: [
      {
        text: 'Oui, alarme = enregistrement vidéo + levée de doute automatique',
        points: 0,
        indicator: 'optimal',
      },
      {
        text: 'Partiellement, les systèmes fonctionnent mais ne sont pas interfacés',
        points: 5,
        indicator: 'warning',
      },
      {
        text: 'Non, les systèmes sont totalement indépendants',
        points: 10,
        indicator: 'critical',
        feedback: "L'interfaçage améliorerait significativement l'efficacité de votre installation.",
      },
    ],
  },

  // AXE 3: Performance & exploitation (max 20 pts)
  {
    id: 'alarm_management',
    axisId: 'performance',
    text: 'Comment qualifiez-vous la gestion de vos alarmes au quotidien ?',
    helpText:
      "Un taux élevé de fausses alarmes (> 5/mois) dégrade la réactivité : les opérateurs finissent par ignorer les alertes. L'objectif APSAD est < 2 fausses alarmes par mois.",
    apsadReference: 'R81 §7',
    options: [
      {
        text: 'Alarmes fiables, faible taux de fausses alarmes, traitement systématique',
        points: 0,
        indicator: 'optimal',
      },
      {
        text: 'Fausses alarmes occasionnelles mais gérées',
        points: 5,
        indicator: 'warning',
      },
      {
        text: 'Trop de fausses alarmes, certaines ne sont plus traitées',
        points: 12,
        indicator: 'critical',
        feedback: 'Un diagnostic technique permettrait de réduire les fausses alarmes.',
      },
      {
        text: 'Alarmes rarement ou jamais traitées',
        points: 18,
        indicator: 'critical',
      },
    ],
  },
  {
    id: 'monitoring',
    axisId: 'performance',
    text: 'Vos alarmes sont-elles reportées vers un centre de télésurveillance ?',
    helpText:
      "La télésurveillance 24/7 permet une réaction immédiate (levée de doute, appel forces de l'ordre). Sans télésurveillance, l'efficacité du système dépend de la présence sur site.",
    apsadReference: 'R31',
    options: [
      {
        text: "Oui, télésurveillance 24/7 avec protocole d'intervention défini",
        points: 0,
        indicator: 'optimal',
      },
      {
        text: "Oui, mais protocole d'intervention à clarifier",
        points: 4,
        indicator: 'warning',
      },
      {
        text: 'Report sur téléphone personnel uniquement',
        points: 10,
        indicator: 'warning',
        feedback: "Attention à la réactivité en cas d'absence ou de nuit.",
      },
      {
        text: 'Aucun report, alarme locale uniquement (sirène)',
        points: 15,
        indicator: 'critical',
      },
    ],
  },

  // AXE 4: Maintenance & pérennité (max 20 pts)
  {
    id: 'maintenance_contract',
    axisId: 'maintenance',
    text: 'Quel type de maintenance est en place pour votre installation ?',
    helpText:
      "Un contrat APSAD inclut : visites préventives planifiées, intervention curative sous délai garanti, vérifications périodiques, mise à jour des équipements.",
    apsadReference: 'I81 §8 / I82 §8',
    options: [
      {
        text: 'Contrat de maintenance conforme APSAD (préventif + curatif)',
        points: 0,
        indicator: 'optimal',
      },
      {
        text: 'Contrat de maintenance standard (curatif uniquement)',
        points: 5,
        indicator: 'warning',
      },
      {
        text: 'Maintenance occasionnelle, au coup par coup',
        points: 12,
        indicator: 'critical',
      },
      {
        text: "Aucune maintenance depuis l'installation",
        points: 18,
        indicator: 'critical',
        feedback: 'Les équipements non maintenus présentent un risque de défaillance.',
      },
    ],
  },
  {
    id: 'periodic_tests',
    axisId: 'maintenance',
    text: 'Réalisez-vous des tests périodiques de votre installation ?',
    helpText:
      'Les tests vérifient le bon fonctionnement des détecteurs, caméras, transmissions et permettent de détecter les anomalies avant un incident réel.',
    apsadReference: 'R81 §7.3',
    options: [
      {
        text: 'Oui, tests réguliers documentés (au moins trimestriels)',
        points: 0,
        indicator: 'optimal',
      },
      {
        text: 'Tests occasionnels, non systématiques',
        points: 6,
        indicator: 'warning',
      },
      {
        text: 'Aucun test depuis la mise en service',
        points: 14,
        indicator: 'critical',
      },
    ],
  },

  // AXE 5: Documentation & gouvernance (max 10 pts)
  {
    id: 'installation_file',
    axisId: 'documentation',
    text: "Disposez-vous d'un dossier d'installation complet ?",
    helpText:
      "Le dossier d'installation comprend : plans d'implantation des équipements, schémas de câblage, procédures de mise en/hors service, liste des codes et badges.",
    apsadReference: 'I81 §9 / I82 §9',
    options: [
      {
        text: "Oui, dossier complet et à jour (plans, schémas, procédures)",
        points: 0,
        indicator: 'optimal',
      },
      {
        text: 'Documentation partielle ou obsolète',
        points: 5,
        indicator: 'warning',
      },
      {
        text: "Pas de documentation, tout est \"dans la tête\" de quelqu'un",
        points: 10,
        indicator: 'critical',
        feedback: "Risque fort en cas de départ ou d'incident.",
      },
    ],
  },
  {
    id: 'access_management',
    axisId: 'documentation',
    text: "Comment sont gérés les codes d'accès et les badges ?",
    helpText:
      "Une bonne pratique : codes personnels (pas de code partagé), mise à jour lors des départs, historique des accès conservé.",
    options: [
      {
        text: 'Codes/badges personnels, mis à jour à chaque mouvement de personnel',
        points: 0,
        indicator: 'optimal',
      },
      {
        text: 'Gestion partielle, certains codes partagés ou anciens badges actifs',
        points: 4,
        indicator: 'warning',
      },
      {
        text: "Code unique partagé, jamais changé depuis l'installation",
        points: 8,
        indicator: 'critical',
        feedback: 'Risque majeur de compromission des accès.',
      },
    ],
  },
];

export function getQuestionsByAxis(axisId: string): Question[] {
  return questions.filter((q) => q.axisId === axisId);
}

export const totalQuestions = questions.length;
