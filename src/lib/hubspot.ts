// HubSpot configuration
export const HUBSPOT_CONFIG = {
  portalId: '146239117',
  formGuid: '5827dd33-8f31-4058-8ffb-04b86781c1c0',
};

export interface HubSpotFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  jobTitle: string;
  wantsCallback: boolean;
  diagnosticScore: number;
  diagnosticLevel: string;
  siteArea?: string;
  sector?: string;
  mainConcern?: string;
}

export async function submitToHubSpot(data: HubSpotFormData): Promise<boolean> {
  const { portalId, formGuid } = HUBSPOT_CONFIG;

  // HubSpot Forms API endpoint
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

  // Build fields array for HubSpot
  const fields = [
    { name: 'firstname', value: data.firstName },
    { name: 'lastname', value: data.lastName },
    { name: 'email', value: data.email },
    { name: 'company', value: data.company },
    { name: 'jobtitle', value: data.jobTitle },
    // Custom properties - make sure these exist in HubSpot
    { name: 'diagnostic_score', value: String(data.diagnosticScore) },
    { name: 'diagnostic_level', value: data.diagnosticLevel },
    { name: 'wants_callback', value: data.wantsCallback ? 'true' : 'false' },
  ];

  // Add optional fields
  if (data.phone) {
    fields.push({ name: 'phone', value: data.phone });
  }
  if (data.siteArea) {
    fields.push({ name: 'site_area', value: data.siteArea });
  }
  if (data.sector) {
    fields.push({ name: 'sector', value: data.sector });
  }
  if (data.mainConcern) {
    fields.push({ name: 'main_concern', value: data.mainConcern });
  }

  const payload = {
    fields,
    context: {
      pageUri: window.location.href,
      pageName: 'Autodiagnostic Sécurité APSAD',
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: 'Je consens au traitement de mes données personnelles.',
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('HubSpot submission error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('HubSpot submission failed:', error);
    return false;
  }
}
