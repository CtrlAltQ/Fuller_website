import { Project } from '@/types/business';

// Fuller Restoration project gallery - clean image showcase
export const fullerProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Project 1',
    description: 'Fuller Restoration project showcasing quality craftsmanship',
    serviceType: 'home-renovation',
    location: { city: 'Columbia', county: 'Maury County', state: 'TN' },
    completedDate: '2024-11-15',
    images: {
      featured: '/images/projects/GridArt_20250720_214425735.jpg',
      after: ['/images/projects/GridArt_20250720_214425735.jpg']
    },
    tags: ['home renovation']
  },
  {
    id: 'project-2',
    title: 'Project 2',
    description: 'Quality home improvement project in Middle Tennessee',
    serviceType: 'home-renovation',
    location: { city: 'Franklin', county: 'Williamson County', state: 'TN' },
    completedDate: '2024-10-22',
    images: {
      featured: '/images/projects/image000001.jpg',
      after: ['/images/projects/image000001.jpg']
    },
    tags: ['home renovation']
  },
  {
    id: 'project-3',
    title: 'Project 3',
    description: 'Custom deck construction project',
    serviceType: 'decks-patios',
    location: { city: 'Spring Hill', county: 'Maury County', state: 'TN' },
    completedDate: '2024-09-10',
    images: {
      featured: '/images/projects/GridArt_20250720_214555882.jpg',
      after: ['/images/projects/GridArt_20250720_214555882.jpg']
    },
    tags: ['deck construction']
  },
  {
    id: 'project-4',
    title: 'Project 4',
    description: 'Custom carpentry and woodwork project',
    serviceType: 'custom-carpentry',
    location: { city: 'Columbia', county: 'Maury County', state: 'TN' },
    completedDate: '2024-08-15',
    images: {
      featured: '/images/projects/image000002.jpg',
      after: ['/images/projects/image000002.jpg']
    },
    tags: ['custom carpentry']
  },
  {
    id: 'project-5',
    title: 'Project 5',
    description: 'Window and door installation project',
    serviceType: 'windows-doors',
    location: { city: 'Brentwood', county: 'Williamson County', state: 'TN' },
    completedDate: '2024-07-20',
    images: {
      featured: '/images/projects/image000003.jpg',
      after: ['/images/projects/image000003.jpg']
    },
    tags: ['windows', 'doors']
  },
  {
    id: 'project-6',
    title: 'Project 6',
    description: 'Home renovation and restoration project',
    serviceType: 'home-renovation',
    location: { city: 'Columbia', county: 'Maury County', state: 'TN' },
    completedDate: '2024-06-18',
    images: {
      featured: '/images/projects/image000004.jpg',
      after: ['/images/projects/image000004.jpg']
    },
    tags: ['home renovation']
  },
  {
    id: 'project-7',
    title: 'Project 7',
    description: 'Custom carpentry and built-in project',
    serviceType: 'custom-carpentry',
    location: { city: 'Franklin', county: 'Williamson County', state: 'TN' },
    completedDate: '2024-05-25',
    images: {
      featured: '/images/projects/image000005.jpg',
      after: ['/images/projects/image000005.jpg']
    },
    tags: ['custom carpentry', 'built-ins']
  },
  {
    id: 'project-8',
    title: 'Project 8',
    description: 'Outdoor deck and patio construction',
    serviceType: 'decks-patios',
    location: { city: 'Columbia', county: 'Maury County', state: 'TN' },
    completedDate: '2024-04-12',
    images: {
      featured: '/images/projects/image000006.jpg',
      after: ['/images/projects/image000006.jpg']
    },
    tags: ['deck', 'patio']
  },
  {
    id: 'project-9',
    title: 'Project 9',
    description: 'Complete home renovation project',
    serviceType: 'home-renovation',
    location: { city: 'Spring Hill', county: 'Maury County', state: 'TN' },
    completedDate: '2024-03-08',
    images: {
      featured: '/images/projects/image000007.jpg',
      after: ['/images/projects/image000007.jpg']
    },
    tags: ['home renovation']
  },
  {
    id: 'project-10',
    title: 'Project 10',
    description: 'Window replacement and door installation',
    serviceType: 'windows-doors',
    location: { city: 'Columbia', county: 'Maury County', state: 'TN' },
    completedDate: '2024-02-14',
    images: {
      featured: '/images/projects/image000008.jpg',
      after: ['/images/projects/image000008.jpg']
    },
    tags: ['windows', 'doors']
  },
  {
    id: 'project-11',
    title: 'Project 11',
    description: 'Custom millwork and trim project',
    serviceType: 'custom-carpentry',
    location: { city: 'Franklin', county: 'Williamson County', state: 'TN' },
    completedDate: '2024-01-20',
    images: {
      featured: '/images/projects/image000009.jpg',
      after: ['/images/projects/image000009.jpg']
    },
    tags: ['custom carpentry', 'millwork']
  },
  {
    id: 'project-12',
    title: 'Project 12',
    description: 'Home restoration and renovation project',
    serviceType: 'home-renovation',
    location: { city: 'Columbia', county: 'Maury County', state: 'TN' },
    completedDate: '2023-12-15',
    images: {
      featured: '/images/projects/FB_IMG_1753069922220.jpg',
      after: ['/images/projects/FB_IMG_1753069922220.jpg']
    },
    tags: ['home renovation', 'restoration']
  }
];

// Enhanced featured projects for home page slider with better metadata
export const featuredProjects: Project[] = [
  {
    id: 'custom-kitchen-renovation-columbia',
    title: 'Custom Kitchen Renovation',
    description: 'Complete kitchen transformation with custom cabinets, granite countertops, and modern appliances for a Columbia family.',
    serviceType: 'home-renovation',
    location: {
      city: 'Columbia',
      county: 'Maury County',
      state: 'TN'
    },
    completedDate: '2024-11-15',
    duration: '4 weeks',
    images: {
      featured: '/images/projects/GridArt_20250720_214425735.jpg',
      after: ['/images/projects/GridArt_20250720_214425735.jpg']
    },
    tags: ['kitchen renovation', 'custom cabinets', 'granite countertops', 'appliances']
  },
  {
    id: 'composite-deck-franklin',
    title: 'Custom Composite Deck',
    description: 'Large composite deck with built-in seating, pergola, and outdoor kitchen for entertaining guests.',
    serviceType: 'decks-patios',
    location: {
      city: 'Franklin',
      county: 'Williamson County',
      state: 'TN'
    },
    completedDate: '2024-10-22',
    duration: '2 weeks',
    images: {
      featured: '/images/projects/GridArt_20250720_214555882.jpg',
      after: ['/images/projects/GridArt_20250720_214555882.jpg']
    },
    tags: ['custom deck', 'composite decking', 'pergola', 'outdoor living']
  },
  {
    id: 'custom-trim-work-spring-hill',
    title: 'Custom Trim & Millwork',
    description: 'Intricate crown molding, baseboards, and custom built-in cabinetry throughout a Spring Hill home.',
    serviceType: 'custom-carpentry',
    location: {
      city: 'Spring Hill',
      county: 'Maury County',
      state: 'TN'
    },
    completedDate: '2024-09-10',
    duration: '3 weeks',
    images: {
      featured: '/images/projects/GridArt_20250720_225708783.jpg',
      after: ['/images/projects/GridArt_20250720_225708783.jpg']
    },
    tags: ['custom carpentry', 'crown molding', 'built-ins', 'millwork']
  },
  {
    id: 'window-installation-columbia',
    title: 'Energy Efficient Windows',
    description: 'Complete window replacement with energy-efficient double-pane windows for improved comfort and savings.',
    serviceType: 'windows-doors',
    location: {
      city: 'Columbia',
      county: 'Maury County',
      state: 'TN'
    },
    completedDate: '2024-08-15',
    duration: '1 week',
    images: {
      featured: '/images/projects/FB_IMG_1753069922220.jpg',
      after: ['/images/projects/FB_IMG_1753069922220.jpg']
    },
    tags: ['window installation', 'energy efficient', 'double-pane', 'home improvement']
  },
  {
    id: 'privacy-fence-brentwood',
    title: 'Privacy Fence Installation',
    description: 'Custom privacy fencing with decorative gate installation for enhanced security and curb appeal.',
    serviceType: 'fencing',
    location: {
      city: 'Brentwood',
      county: 'Williamson County',
      state: 'TN'
    },
    completedDate: '2024-07-20',
    duration: '1 week',
    images: {
      featured: '/images/projects/FB_IMG_1753069926273.jpg',
      after: ['/images/projects/FB_IMG_1753069926273.jpg']
    },
    tags: ['privacy fence', 'custom gate', 'security', 'curb appeal']
  },
  {
    id: 'bathroom-renovation-columbia',
    title: 'Master Bathroom Renovation',
    description: 'Complete master bathroom remodel with custom tile work, vanity, and modern fixtures.',
    serviceType: 'home-renovation',
    location: {
      city: 'Columbia',
      county: 'Maury County',
      state: 'TN'
    },
    completedDate: '2024-06-18',
    duration: '3 weeks',
    images: {
      featured: '/images/projects/ProjectExp.jpg',
      after: ['/images/projects/ProjectExp.jpg']
    },
    tags: ['bathroom renovation', 'custom tile', 'vanity', 'modern fixtures']
  }
];

// Project categories with counts
export const projectCategories = [
  { id: 'all', name: 'All Projects', count: fullerProjects.length },
  { id: 'home-renovation', name: 'Home Renovations', count: fullerProjects.filter(p => p.serviceType === 'home-renovation').length },
  { id: 'custom-carpentry', name: 'Custom Carpentry', count: fullerProjects.filter(p => p.serviceType === 'custom-carpentry').length },
  { id: 'decks-patios', name: 'Decks & Patios', count: fullerProjects.filter(p => p.serviceType === 'decks-patios').length },
  { id: 'windows-doors', name: 'Windows & Doors', count: fullerProjects.filter(p => p.serviceType === 'windows-doors').length }
];
