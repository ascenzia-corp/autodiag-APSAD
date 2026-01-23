import { motion } from 'framer-motion';
import { Shield, Target, Clock, FileText, ArrowRight } from 'lucide-react';
import { Button, Badge, FeatureCard } from '../ui';

export interface WelcomeStepProps {
  onStart: () => void;
}

export function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Badge variant="outline" className="mb-6">
            Évaluation gratuite en ligne
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6"
        >
          Évaluez la conformité de votre{' '}
          <span className="text-primary">système de sécurité</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted max-w-2xl mx-auto mb-8"
        >
          Mesurez les écarts de votre installation aux exigences APSAD R81 (intrusion)
          et R82 (vidéosurveillance) et recevez des recommandations personnalisées.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Button size="lg" onClick={onStart}>
            Commencer le diagnostic
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <FeatureCard
            icon={Shield}
            title="Basé sur APSAD R81/R82"
            description="Évaluation selon les règles de référence françaises"
          />
          <FeatureCard
            icon={Target}
            title="5 axes d'analyse"
            description="Couverture complète de votre système de sécurité"
          />
          <FeatureCard
            icon={Clock}
            title="5 minutes"
            description="Diagnostic rapide avec résultats immédiats"
          />
          <FeatureCard
            icon={FileText}
            title="Recommandations"
            description="Actions prioritaires personnalisées"
          />
        </motion.div>

        {/* Reassurance */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted"
        >
          12 questions • Aucune connaissance technique requise • 100% gratuit
        </motion.p>
      </div>
    </motion.div>
  );
}
