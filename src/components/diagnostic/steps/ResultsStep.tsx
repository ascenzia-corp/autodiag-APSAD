import { motion } from 'framer-motion';
import {
  Download,
  RefreshCw,
  Calendar,
  Building2,
  FileText,
} from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  CTACard,
} from '../ui';
import { ScoreGauge } from '../ui/ScoreGauge';
import { SecurityRadarChart, RadarChartLegend } from '../ui/RadarChart';
import { AxisScoreList } from '../ui/AxisScoreCard';
import { RecommendationList } from '../ui/RecommendationList';
import type { AxisScore, ScoreLevel, Recommendation, APSADCategory } from '@/types/diagnostic';

export interface ResultsStepProps {
  totalScore: number;
  normalizedScore: number;
  axisScores: AxisScore[];
  scoreLevel: ScoreLevel;
  recommendations: Recommendation[];
  apsadCategory: APSADCategory;
  onRestart: () => void;
  onDownloadPDF?: () => void;
}

export function ResultsStep({
  totalScore: _totalScore,
  normalizedScore,
  axisScores,
  scoreLevel,
  recommendations,
  apsadCategory,
  onRestart,
  onDownloadPDF,
}: ResultsStepProps) {
  const getBadgeVariant = (color: ScoreLevel['color']) => {
    switch (color) {
      case 'success':
        return 'success';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-8 sm:py-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 bg-primary rounded-r-full" />
              <span className="text-sm font-bold text-foreground">PERIN</span>
            </div>
            <span className="text-xs text-primary font-semibold">Sécurité</span>
          </div>
          <Badge variant="outline">
            Catégorie APSAD : {apsadCategory}
          </Badge>
        </div>

        {/* Main score card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <ScoreGauge score={normalizedScore} level={scoreLevel} size="lg" />
              <div className="flex-1 text-center sm:text-left">
                <Badge variant={getBadgeVariant(scoreLevel.color)} className="mb-2">
                  {scoreLevel.label}
                </Badge>
                <p className="text-foreground leading-relaxed">
                  {scoreLevel.description}
                </p>
                <p className="text-xs text-muted mt-3">
                  0 = alignement fort aux standards APSAD • 100 = écart critique
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Radar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Votre profil de maturité sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              <SecurityRadarChart data={axisScores} />
              <RadarChartLegend />
            </CardContent>
          </Card>
        </motion.div>

        {/* Axis scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Répartition par axe</CardTitle>
            </CardHeader>
            <CardContent>
              <AxisScoreList axisScores={axisScores} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <CardTitle>Recommandations prioritaires</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <RecommendationList recommendations={recommendations} />
            </CardContent>
          </Card>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          <CTACard
            icon={Calendar}
            title="Échanger avec un expert"
            description="15 minutes sans engagement pour approfondir votre diagnostic."
            buttonText="Prendre rendez-vous"
            buttonVariant="primary"
            href="https://calendly.com/groupe-perin/diagnostic-apsad"
          />
          <CTACard
            icon={Building2}
            title="Audit approfondi APSAD"
            description="Identifiez précisément les écarts techniques et normatifs."
            buttonText="Demander un devis"
            buttonVariant="outline"
          />
        </motion.div>

        {/* Secondary actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {onDownloadPDF && (
            <Button variant="ghost" onClick={onDownloadPDF}>
              <Download className="w-4 h-4" />
              Télécharger le rapport PDF
            </Button>
          )}
          <Button variant="ghost" onClick={onRestart}>
            <RefreshCw className="w-4 h-4" />
            Recommencer
          </Button>
        </motion.div>

        {/* Footer disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 pt-6 border-t border-border"
        >
          <p className="text-xs text-muted text-center">
            Ce diagnostic est une évaluation de premier niveau basée sur vos déclarations.
            Il ne constitue pas un audit de conformité ni une attestation APSAD officielle.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
