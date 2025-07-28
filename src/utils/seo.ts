import { LocalBusinessSchema, SEOData } from '@/types/business';
import { businessInfo, serviceAreas, localSEOKeywords } from '@/data/businessInfo';

// Generate local business schema markup
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessInfo.name,
    description: businessInfo.description,
    url: 'https://fullerrestoration.com', // Update with actual domain
    telephone: businessInfo.phone,
    email: businessInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: businessInfo.address.city,
      addressRegion: businessInfo.address.state,
      postalCode: businessInfo.address.zipCode,
      addressCountry: 'US'
    },
    areaServed: serviceAreas.map(area => `${area.name}, ${area.state}`),
    serviceType: [
      'Home Renovation',
      'Custom Carpentry',
      'Deck Construction',
      'Fence Installation',
      'Window Installation',
      'Door Installation'
    ],
    foundingDate: businessInfo.founded,
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Check', 'Credit Card'],
    openingHours: [
      'Mo-Fr 08:00-17:00',
      'Sa 09:00-15:00'
    ]
  };
}

// Generate SEO data for pages
export function generateSEOData(
  pageType: 'home' | 'service' | 'area' | 'contact' | 'about',
  specificData?: { title?: string; description?: string; keywords?: string[] }
): SEOData {
  const baseKeywords = localSEOKeywords;
  
  switch (pageType) {
    case 'home':
      return {
        title: `${businessInfo.name} | Columbia TN Home Renovation & Custom Carpentry`,
        description: `Family-owned home renovation and custom carpentry serving Columbia, TN and Middle Tennessee. Quality craftsmanship for renovations, decks, fences, windows & doors. Call ${businessInfo.phone}`,
        keywords: [
          ...baseKeywords,
          'Columbia TN contractor',
          'Tennessee home renovation',
          'custom carpentry Columbia',
          'family owned contractor'
        ],
        localKeywords: [
          'Columbia TN renovation',
          'Middle Tennessee contractor',
          'Tennessee custom carpentry',
          'home improvement Columbia'
        ]
      };
      
    case 'service':
      return {
        title: specificData?.title || `${businessInfo.name} Services`,
        description: specificData?.description || `Professional home renovation and carpentry services in Columbia, TN and surrounding areas.`,
        keywords: [
          ...baseKeywords,
          ...(specificData?.keywords || [])
        ],
        localKeywords: [
          'Columbia TN services',
          'Tennessee contractor services',
          'Middle Tennessee renovation'
        ]
      };
      
    case 'area':
      return {
        title: specificData?.title || `${businessInfo.name} | Service Area`,
        description: specificData?.description || `Professional home renovation and carpentry services in your area.`,
        keywords: [
          ...baseKeywords,
          ...(specificData?.keywords || [])
        ],
        localKeywords: [
          ...(specificData?.keywords || [])
        ]
      };
      
    case 'contact':
      return {
        title: `Contact ${businessInfo.name} | Columbia TN Contractor`,
        description: `Contact Fuller Restoration for your home renovation and carpentry needs in Columbia, TN. Call ${businessInfo.phone} or email ${businessInfo.email} for a free estimate.`,
        keywords: [
          ...baseKeywords,
          'contact Columbia contractor',
          'Tennessee renovation estimate',
          'free estimate Columbia TN'
        ],
        localKeywords: [
          'Columbia TN contractor contact',
          'Tennessee renovation quote',
          'Middle Tennessee estimate'
        ]
      };
      
    case 'about':
      return {
        title: `About ${businessInfo.name} | Family-Owned Columbia TN Contractor`,
        description: `Learn about Fuller Restoration, a family-owned home renovation and custom carpentry business serving Columbia, TN since 2025. Quality craftsmanship and personalized service.`,
        keywords: [
          ...baseKeywords,
          'family owned contractor Columbia',
          'Tennessee renovation company',
          'about Fuller Restoration'
        ],
        localKeywords: [
          'Columbia TN family business',
          'Tennessee contractor history',
          'Middle Tennessee renovation company'
        ]
      };
      
    default:
      return {
        title: businessInfo.name,
        description: businessInfo.description,
        keywords: baseKeywords,
        localKeywords: []
      };
  }
}

// Generate area-specific SEO data
export function generateAreaSEOData(areaId: string): SEOData {
  const area = serviceAreas.find(a => a.id === areaId);
  if (!area) {
    return generateSEOData('area');
  }
  
  return generateSEOData('area', {
    title: `${businessInfo.name} | ${area.name} ${area.state} Contractor`,
    description: `Professional home renovation and custom carpentry services in ${area.name}, ${area.state}. Family-owned contractor serving ${area.county} with quality craftsmanship.`,
    keywords: [
      `${area.name} ${area.state} contractor`,
      `${area.name} home renovation`,
      `${area.name} custom carpentry`,
      `${area.county} contractor`,
      `${area.county} renovation`,
      `${area.name} ${area.state} home improvement`
    ]
  });
}

// Generate service-specific SEO data
export function generateServiceSEOData(serviceId: string, serviceName: string): SEOData {
  return generateSEOData('service', {
    title: `${serviceName} | ${businessInfo.name} | Columbia TN`,
    description: `Professional ${serviceName.toLowerCase()} services in Columbia, TN and Middle Tennessee. Family-owned contractor with quality craftsmanship. Call ${businessInfo.phone} for estimate.`,
    keywords: [
      `Columbia TN ${serviceName.toLowerCase()}`,
      `Tennessee ${serviceName.toLowerCase()}`,
      `${serviceName.toLowerCase()} contractor Columbia`,
      `Middle Tennessee ${serviceName.toLowerCase()}`,
      `${serviceName.toLowerCase()} services Tennessee`
    ]
  });
}

// Utility to format phone number for click-to-call
export function formatPhoneForCall(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

// Utility to format phone number for display
export function formatPhoneForDisplay(phone: string): string {
  const cleaned = phone.replace(/[^\d]/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}