import { BusinessInfo, ServiceArea, Service } from '@/types/business';

export const businessInfo: BusinessInfo = {
  name: 'Fuller Restoration and Renovation LLC',
  tagline: 'Custom Carpentry & Home Renovation',
  phone: '(931) 446-9792',
  email: 'fullerresto@gmail.com',
  address: {
    city: 'Columbia',
    state: 'TN',
    zipCode: '38401',
  },
  founded: '2025-07-22',
  description: 'Family-owned and operated home renovation and custom carpentry business serving Columbia, TN and surrounding Middle Tennessee counties. Specializing in quality craftsmanship and personalized service.',
  specialties: [
    'Family owned and operated',
    'Custom carpentry expertise',
    'Local Middle Tennessee focus',
    'Quality craftsmanship',
    'Personalized service'
  ],
  socialMedia: {
    facebook: 'https://www.facebook.com/61578319719409'
  },
  businessHours: {
    monday: '8:00 AM - 5:00 PM',
    tuesday: '8:00 AM - 5:00 PM',
    wednesday: '8:00 AM - 5:00 PM',
    thursday: '8:00 AM - 5:00 PM',
    friday: '8:00 AM - 5:00 PM',
    saturday: '9:00 AM - 3:00 PM',
    sunday: 'Closed'
  }
};

export const serviceAreas: ServiceArea[] = [
  {
    id: 'columbia-tn',
    name: 'Columbia',
    county: 'Maury County',
    state: 'TN',
    isPrimary: true,
    description: 'Our home base and primary service area'
  },
  {
    id: 'williamson-county',
    name: 'Williamson County',
    county: 'Williamson County',
    state: 'TN',
    isPrimary: false,
    description: 'Including Franklin, Brentwood, and surrounding areas'
  },
  {
    id: 'hickman-county',
    name: 'Hickman County',
    county: 'Hickman County',
    state: 'TN',
    isPrimary: false,
    description: 'Including Centerville and surrounding areas'
  },
  {
    id: 'davidson-county',
    name: 'Davidson County',
    county: 'Davidson County',
    state: 'TN',
    isPrimary: false,
    description: 'Including Nashville and surrounding areas'
  },
  {
    id: 'giles-county',
    name: 'Giles County',
    county: 'Giles County',
    state: 'TN',
    isPrimary: false,
    description: 'Including Pulaski and surrounding areas'
  },
  {
    id: 'marshall-county',
    name: 'Marshall County',
    county: 'Marshall County',
    state: 'TN',
    isPrimary: false,
    description: 'Including Lewisburg and surrounding areas'
  },
  {
    id: 'maury-county',
    name: 'Maury County',
    county: 'Maury County',
    state: 'TN',
    isPrimary: false,
    description: 'Including Spring Hill and surrounding areas'
  },
  {
    id: 'lawrence-county',
    name: 'Lawrence County',
    county: 'Lawrence County',
    state: 'TN',
    isPrimary: false,
    description: 'Including Lawrenceburg and surrounding areas'
  }
];

export const services: Service[] = [
  {
    id: 'home-renovation',
    title: 'Home Renovations & Restorations',
    description: 'Complete home renovation and restoration services for Middle Tennessee homeowners. From kitchen and bathroom remodels to whole-house renovations, we bring your vision to life with quality craftsmanship.',
    shortDescription: 'Complete home renovations and restorations with quality craftsmanship',
    keywords: [
      'Columbia TN home renovation',
      'Tennessee house restoration',
      'Middle Tennessee remodeling',
      'home renovation Columbia',
      'house remodel Tennessee'
    ],
    serviceAreas: ['columbia-tn', 'williamson-county', 'davidson-county', 'maury-county'],
    features: [
      'Kitchen renovations',
      'Bathroom remodeling',
      'Whole house renovations',
      'Historic home restoration',
      'Room additions',
      'Interior renovations'
    ],
    process: [
      'Initial consultation and assessment',
      'Design planning and permits',
      'Material selection and ordering',
      'Professional installation',
      'Final inspection and walkthrough'
    ],
    estimatedTimeframe: '2-8 weeks depending on scope',
    image: '/images/projects/ProjectExp.jpg'
  },
  {
    id: 'custom-carpentry',
    title: 'Custom Carpentry',
    description: 'Expert custom carpentry services including built-in cabinets, custom shelving, trim work, and specialty woodworking projects. Our skilled craftsmen create beautiful, functional pieces tailored to your space.',
    shortDescription: 'Expert custom carpentry and woodworking services',
    keywords: [
      'Columbia TN custom carpentry',
      'Tennessee custom woodwork',
      'custom cabinets Columbia',
      'carpentry services Tennessee',
      'custom built-ins Middle Tennessee'
    ],
    serviceAreas: ['columbia-tn', 'williamson-county', 'hickman-county', 'maury-county'],
    features: [
      'Custom built-in cabinets',
      'Specialty shelving',
      'Crown molding and trim',
      'Custom furniture pieces',
      'Architectural millwork',
      'Repair and restoration'
    ],
    process: [
      'Design consultation',
      'Measurements and planning',
      'Material selection',
      'Custom fabrication',
      'Professional installation'
    ],
    estimatedTimeframe: '1-4 weeks depending on project'
  },
  {
    id: 'decks-patios',
    title: 'Decks & Outdoor Spaces',
    description: 'Custom deck construction and outdoor living space creation. We build beautiful, durable decks that extend your living space and enhance your property value.',
    shortDescription: 'Custom deck construction and outdoor living spaces',
    keywords: [
      'Columbia TN deck builder',
      'Tennessee deck construction',
      'custom decks Middle Tennessee',
      'outdoor living spaces Columbia',
      'deck installation Tennessee'
    ],
    serviceAreas: ['columbia-tn', 'williamson-county', 'maury-county', 'giles-county'],
    features: [
      'Custom deck design',
      'Composite and wood decking',
      'Railings and balusters',
      'Outdoor kitchens',
      'Pergolas and shade structures',
      'Deck repair and refinishing'
    ],
    estimatedTimeframe: '1-3 weeks depending on size'
  },
  {
    id: 'fencing',
    title: 'Fencing Installation',
    description: 'Professional fence installation for privacy, security, and property enhancement. We install various fence types to meet your specific needs and complement your property.',
    shortDescription: 'Professional fence installation and repair services',
    keywords: [
      'Columbia TN fence installation',
      'Tennessee fencing contractor',
      'privacy fence Columbia',
      'fence repair Tennessee',
      'fencing services Middle Tennessee'
    ],
    serviceAreas: ['columbia-tn', 'hickman-county', 'maury-county', 'lawrence-county'],
    features: [
      'Privacy fencing',
      'Security fencing',
      'Decorative fencing',
      'Gate installation',
      'Fence repair',
      'Property line fencing'
    ],
    estimatedTimeframe: '1-2 weeks depending on length'
  },
  {
    id: 'windows-doors',
    title: 'Windows & Doors',
    description: 'Professional window and door installation and replacement services. Improve your home\'s energy efficiency, security, and curb appeal with quality windows and doors.',
    shortDescription: 'Professional window and door installation services',
    keywords: [
      'Columbia TN window installation',
      'Tennessee door replacement',
      'window replacement Columbia',
      'door installation Tennessee',
      'energy efficient windows Middle Tennessee'
    ],
    serviceAreas: ['columbia-tn', 'williamson-county', 'davidson-county', 'marshall-county'],
    features: [
      'Window replacement',
      'Door installation',
      'Energy efficient options',
      'Custom door fitting',
      'Window repair',
      'Weatherproofing'
    ],
    estimatedTimeframe: '1-2 days per installation'
  }
];

// Local SEO keywords for the business
export const localSEOKeywords = [
  'Columbia TN contractor',
  'Tennessee home renovation',
  'Middle Tennessee carpentry',
  'Columbia renovation contractor',
  'Tennessee custom carpentry',
  'home improvement Columbia TN',
  'renovation services Tennessee',
  'custom carpentry Columbia',
  'home contractor Middle Tennessee',
  'renovation company Columbia TN'
];