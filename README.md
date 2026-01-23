# Autodiagnostic Sécurité APSAD

Outil d'autodiagnostic en ligne pour évaluer la conformité d'un système de sécurité aux normes APSAD R81 (intrusion) et R82 (vidéosurveillance).

**Développé pour Groupe Perin Sécurité**

## Fonctionnalités

- Évaluation basée sur 12 questions couvrant 5 axes d'analyse
- Score global et scores par axe avec visualisation radar
- Recommandations personnalisées basées sur les réponses
- Formulaire de capture de leads
- Interface responsive et animations fluides

## Stack Technique

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts (radar chart)
- **Forms**: react-hook-form + zod
- **Animations**: Framer Motion

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Build Production

```bash
npm run build
```

## Structure du Projet

```
src/
├── components/
│   └── diagnostic/
│       ├── DiagnosticWizard.tsx    # Composant principal
│       ├── steps/                   # Étapes du diagnostic
│       ├── ui/                      # Composants UI réutilisables
│       └── layout/                  # Header et Footer
├── data/
│   ├── questions.ts                 # Questions du diagnostic
│   ├── axes.ts                      # Définition des 5 axes
│   ├── scoring.ts                   # Logique de calcul
│   └── recommendations.ts           # Recommandations contextuelles
├── hooks/
│   └── useDiagnostic.ts            # State management
└── types/
    └── diagnostic.ts                # Types TypeScript
```

## Axes d'évaluation

1. **Analyse du risque** (max 25 pts) - Formalisation et prise en compte des risques
2. **Couverture & implantation** (max 25 pts) - Détection intrusion et vidéosurveillance
3. **Performance & exploitation** (max 20 pts) - Gestion des alarmes et télésurveillance
4. **Maintenance & pérennité** (max 20 pts) - Contrats et tests périodiques
5. **Documentation & gouvernance** (max 10 pts) - Dossier d'installation et gestion des accès

## Références APSAD

- R81 : Détection d'intrusion
- R82 : Vidéosurveillance
- I81 : Installation intrusion
- I82 : Installation vidéo
- R31 : Télésurveillance

## Licence

Propriétaire - Groupe Perin Sécurité
