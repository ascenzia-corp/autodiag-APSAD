export function DiagnosticFooter() {
  return (
    <footer className="py-6 border-t border-border bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs text-muted leading-relaxed">
            Ce diagnostic est une évaluation de premier niveau basée sur vos déclarations.
            Il ne constitue pas un audit de conformité ni une attestation APSAD officielle.
          </p>
          <p className="text-xs text-muted mt-2">
            © {new Date().getFullYear()} Groupe Perin Sécurité - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
