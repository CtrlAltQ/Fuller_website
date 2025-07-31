import { LocalBusinessSchema, SEOData } from '@/types/business';
import { businessInfo, serviceAreas, localSEOKeywords, services } from '@/data/businessInfo';

// Enhanced Middle Tennessee contractor keywords
const middleTennesseeKeywords = [
  'Middle Tennessee contractor',
  'Columbia TN renovation',
  'Tennessee home improvement',
  'Maury County contractor',
  'Nashville area contractor',
  'Franklin TN renovation',
  'Brentwood home improvement',
  'Spring Hill contractor',
  'Williamson County renovation',
  'Davidson County contractor',
  'Hickman County renovation',
  'Marshall County contractor',
  'Giles County renovation',
  'Lawrence County contractor',
  'Tennessee custom carpentry',
  'Middle TN deck builder',
  'Tennessee fence installation',
  'Columbia window replacement',
  'Tennessee door installation',
  'Middle Tennessee remodeling',
  '15 years experience contractor',
  'family owned contractor Tennessee',
  'licensed contractor Middle Tennessee',
  'insured contractor Columbia TN'
];

// Generate comprehensive local business schema markup
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: businessInfo.name,
    description: `${businessInfo.description} With 15+ years of experience serving Middle Tennessee, we specialize in flooring, trim, windows, cabinets & countertops, fences, decks, and porches.`,
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
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.6151,
      longitude: -87.0353
    },
    areaServed: serviceAreas.map(area => ({
      '@type': 'City',
      name: area.name,
      containedInPlace: {
        '@type': 'State',
        name: 'Tennessee'
      }
    })),
    serviceType: [
      'Home Renovation',
      'Home Restoration', 
      'Custom Carpentry',
      'Flooring Installation',
      'Trim Work',
      'Window Installation',
      'Door Installation',
      'Cabinet Installation',
      'Countertop Installation',
      'Deck Construction',
      'Fence Installation',
      'Porch Construction',
      'Gutter Services'
    ],
    foundingDate: businessInfo.founded,
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Financing Available'],
    openingHours: [
      'Mo-Fr 08:00-17:00',
      'Sa 09:00-15:00'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Home Renovation Services',
      itemListElement: services.map(service => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.shortDescription,
          areaServed: service.serviceAreas.map(areaId => {
            const area = serviceAreas.find(a => a.id === areaId);
            return area ? `${area.name}, ${area.state}` : '';
          }).filter(Boolean)
        }
      }))
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '25',
      bestRating: '5',
      worstRating: '1'
    },
    sameAs: [
      businessInfo.socialMedia?.facebook || ''
    ].filter(Boolean)
  };
}

// Generate service-specific schema markup
export function generateServiceSchema(serviceId: string) {
  const service = services.find(s => s.id === serviceId);
  if (!service) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'GeneralContractor',
      name: businessInfo.name,
      telephone: businessInfo.phone,
      email: businessInfo.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: businessInfo.address.city,
        addressRegion: businessInfo.address.state,
        postalCode: businessInfo.address.zipCode,
        addressCountry: 'US'
      }
    },
    areaServed: service.serviceAreas.map(areaId => {
      const area = serviceAreas.find(a => a.id === areaId);
      return area ? {
        '@type': 'City',
        name: area.name,
        containedInPlace: {
          '@type': 'State',
          name: 'Tennessee'
        }
      } : null;
    }).filter(Boolean),
    serviceType: service.title,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceRange: service.priceRange || '$$',
      areaServed: service.serviceAreas.map(areaId => {
        const area = serviceAreas.find(a => a.id === areaId);
        return area ? `${area.name}, ${area.state}` : '';
      }).filter(Boolean)
    }
  };
}

// Generate optimized SEO data for pages
export function generateSEOData(
  pageType: 'home' | 'service' | 'area' | 'contact' | 'about' | 'projects' | 'project' | 'areas',
  specificData?: { title?: string; description?: string; keywords?: string[]; location?: string; category?: string }
): SEOData {
  const baseKeywords = [...localSEOKeywords, ...middleTennesseeKeywords];
  
  switch (pageType) {
    case 'home':
      return {
        title: `${businessInfo.name} | 15+ Years Experience | Columbia TN Home Renovation & Custom Carpentry`,
        description: `Family-owned home renovation and custom carpentry serving Columbia, TN and Middle Tennessee for 15+ years. Expert flooring, trim, windows, cabinets, countertops, fences, decks & porches. Licensed & insured. Call ${businessInfo.phone} for free estimate.`,
        keywords: [
          ...baseKeywords,
          'Columbia TN contractor',
          'Tennessee home renovation',
          'custom carpentry Columbia',
          'family owned contractor',
          '15 years experience',
          'flooring installation Columbia',
          'cabinet installation Tennessee',
          'deck builder Middle Tennessee',
          'fence installation Columbia TN',
          'window replacement Tennessee'
        ],
        localKeywords: [
          'Columbia TN renovation',
          'Middle Tennessee contractor',
          'Tennessee custom carpentry',
          'home improvement Columbia',
          'Maury County contractor',
          'Nashville area renovation'
        ]
      };
      
    case 'service':
      return {
        title: specificData?.title || `${businessInfo.name} Services | Middle Tennessee Contractor`,
        description: specificData?.description || `Professional home renovation and carpentry services in Columbia, TN and Middle Tennessee. 15+ years experience in flooring, trim, windows, cabinets, countertops, fences, decks & porches. Licensed & insured contractor.`,
        keywords: [
          ...baseKeywords,
          ...(specificData?.keywords || []),
          'professional contractor services',
          'licensed contractor Middle Tennessee',
          'insured renovation contractor',
          'quality craftsmanship Tennessee'
        ],
        localKeywords: [
          'Columbia TN services',
          'Tennessee contractor services',
          'Middle Tennessee renovation',
          'Maury County services'
        ]
      };
      
    case 'area':
      return {
        title: specificData?.title || `${businessInfo.name} | Service Area | Middle Tennessee Contractor`,
        description: specificData?.description || `Professional home renovation and carpentry services throughout Middle Tennessee. Serving Columbia, Nashville, Franklin, Brentwood, Spring Hill and surrounding counties with 15+ years experience.`,
        keywords: [
          ...baseKeywords,
          ...(specificData?.keywords || []),
          'service area Middle Tennessee',
          'contractor coverage area',
          'Tennessee renovation coverage'
        ],
        localKeywords: [
          ...(specificData?.keywords || [])
        ]
      };
      
    case 'contact':
      return {
        title: `Contact ${businessInfo.name} | Free Estimates | Columbia TN Contractor`,
        description: `Contact Fuller Restoration for your home renovation and carpentry needs in Columbia, TN and Middle Tennessee. 15+ years experience. Licensed & insured. Call ${businessInfo.phone} or email ${businessInfo.email} for a free estimate today.`,
        keywords: [
          ...baseKeywords,
          'contact Columbia contractor',
          'Tennessee renovation estimate',
          'free estimate Columbia TN',
          'contractor consultation',
          'renovation quote Tennessee',
          'home improvement estimate'
        ],
        localKeywords: [
          'Columbia TN contractor contact',
          'Tennessee renovation quote',
          'Middle Tennessee estimate',
          'Maury County contractor contact'
        ]
      };
      
    case 'about':
      return {
        title: `About ${businessInfo.name} | 15+ Years Experience | Family-Owned Columbia TN Contractor`,
        description: `Learn about Fuller Restoration, a family-owned home renovation and custom carpentry business serving Columbia, TN and Middle Tennessee for 15+ years. Quality craftsmanship, personalized service, and local expertise in flooring, trim, windows, cabinets, countertops, fences, decks & porches.`,
        keywords: [
          ...baseKeywords,
          'family owned contractor Columbia',
          'Tennessee renovation company',
          'about Fuller Restoration',
          '15 years experience contractor',
          'local contractor Middle Tennessee',
          'quality craftsmanship Tennessee',
          'personalized service contractor'
        ],
        localKeywords: [
          'Columbia TN family business',
          'Tennessee contractor history',
          'Middle Tennessee renovation company',
          'Maury County family contractor'
        ]
      };

    case 'projects':
      return {
        title: `Our Projects | ${businessInfo.name} | Columbia TN Home Renovation Gallery`,
        description: `View our portfolio of completed home renovation and carpentry projects in Columbia, TN and Middle Tennessee. 15+ years of quality craftsmanship in flooring, trim, windows, cabinets, countertops, fences, decks & porches. See why families trust Fuller Restoration.`,
        keywords: [
          ...baseKeywords,
          'renovation projects Columbia TN',
          'contractor portfolio Tennessee',
          'home improvement gallery',
          'before and after renovations',
          'quality craftsmanship examples',
          'Middle Tennessee projects'
        ],
        localKeywords: [
          'Columbia TN renovation projects',
          'Tennessee contractor portfolio',
          'Middle Tennessee home improvements',
          'Maury County renovation gallery'
        ]
      };

    case 'project':
      return {
        title: specificData?.title || `${businessInfo.name} | Project Details | Columbia TN Contractor`,
        description: specificData?.description || `View detailed information about this home renovation project by Fuller Restoration in ${specificData?.location || 'Middle Tennessee'}. Quality craftsmanship and professional results from our experienced team.`,
        keywords: [
          ...baseKeywords,
          ...(specificData?.keywords || []),
          'renovation project details',
          'contractor project gallery',
          'home improvement showcase',
          `${specificData?.category || 'renovation'} project`,
          'quality craftsmanship example'
        ],
        localKeywords: [
          `${specificData?.location || 'Middle Tennessee'} renovation`,
          'Columbia TN project',
          'Tennessee contractor work'
        ]
      };

    case 'areas':
      return {
        title: `Service Areas | ${businessInfo.name} | Middle Tennessee Contractor Coverage`,
        description: `Fuller Restoration serves Columbia, TN and surrounding Middle Tennessee communities including Nashville, Franklin, Brentwood, Spring Hill, and more. 15+ years of professional home renovation and custom carpentry services throughout the region.`,
        keywords: [
          ...baseKeywords,
          'Middle Tennessee service areas',
          'contractor coverage area',
          'Tennessee renovation coverage',
          'Columbia TN service area',
          'Nashville area contractor',
          'Franklin contractor services',
          'Brentwood renovation services'
        ],
        localKeywords: [
          'Middle Tennessee coverage',
          'Columbia TN service area',
          'Nashville area contractor',
          'Williamson County services',
          'Davidson County contractor',
          'Maury County services'
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

// Generate area-specific SEO data with enhanced local targeting
export function generateAreaSEOData(areaId: string): SEOData {
  const area = serviceAreas.find(a => a.id === areaId);
  if (!area) {
    return generateSEOData('area');
  }
  
  const areaKeywords = [
    `${area.name} ${area.state} contractor`,
    `${area.name} home renovation`,
    `${area.name} custom carpentry`,
    `${area.county} contractor`,
    `${area.county} renovation`,
    `${area.name} ${area.state} home improvement`,
    `${area.name} flooring installation`,
    `${area.name} deck builder`,
    `${area.name} fence installation`,
    `${area.name} window replacement`,
    `${area.name} cabinet installation`,
    `contractor near ${area.name}`,
    `renovation services ${area.name}`,
    `home improvement ${area.county}`
  ];
  
  return generateSEOData('area', {
    title: `${businessInfo.name} | ${area.name} ${area.state} Contractor | 15+ Years Experience`,
    description: `Professional home renovation and custom carpentry services in ${area.name}, ${area.state} and ${area.county}. Family-owned contractor with 15+ years experience serving Middle Tennessee. Specializing in flooring, trim, windows, cabinets, countertops, fences, decks & porches. Licensed & insured. Call ${businessInfo.phone} for free estimate.`,
    keywords: areaKeywords
  });
}

// Generate service-specific SEO data with enhanced targeting
export function generateServiceSEOData(serviceId: string, serviceName: string): SEOData {
  const service = services.find(s => s.id === serviceId);
  const serviceKeywords = service?.keywords || [];
  
  const enhancedKeywords = [
    `Columbia TN ${serviceName.toLowerCase()}`,
    `Tennessee ${serviceName.toLowerCase()}`,
    `${serviceName.toLowerCase()} contractor Columbia`,
    `Middle Tennessee ${serviceName.toLowerCase()}`,
    `${serviceName.toLowerCase()} services Tennessee`,
    `professional ${serviceName.toLowerCase()}`,
    `quality ${serviceName.toLowerCase()}`,
    `licensed ${serviceName.toLowerCase()} contractor`,
    `experienced ${serviceName.toLowerCase()}`,
    `${serviceName.toLowerCase()} Middle Tennessee`,
    `${serviceName.toLowerCase()} Maury County`,
    `${serviceName.toLowerCase()} Nashville area`,
    `${serviceName.toLowerCase()} Williamson County`,
    `15 years ${serviceName.toLowerCase()} experience`
  ];
  
  return generateSEOData('service', {
    title: `${serviceName} | ${businessInfo.name} | Columbia TN & Middle Tennessee`,
    description: `Professional ${serviceName.toLowerCase()} services in Columbia, TN and Middle Tennessee. Family-owned contractor with 15+ years experience. Quality craftsmanship, licensed & insured. Serving Maury, Williamson, Davidson, and surrounding counties. Call ${businessInfo.phone} for free estimate.`,
    keywords: [...serviceKeywords, ...enhancedKeywords]
  });
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

// Generate FAQ schema for service pages
export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
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

// Generate Open Graph data
export function generateOpenGraphData(pageType: string, title: string, description: string, image?: string) {
  return {
    'og:type': pageType === 'home' ? 'website' : 'article',
    'og:title': title,
    'og:description': description,
    'og:image': image || '/images/logos/Fuller_Logo.jpg',
    'og:url': 'https://fullerrestoration.com', // Update with actual domain
    'og:site_name': businessInfo.name,
    'og:locale': 'en_US',
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image || '/images/logos/Fuller_Logo.jpg'
  };
}

// Generate canonical URL
export function generateCanonicalUrl(path: string): string {
  const baseUrl = 'https://fullerrestoration.com'; // Update with actual domain
  return `${baseUrl}${path}`;
}