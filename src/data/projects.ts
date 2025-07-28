import { Project } from '@/types/business';

// Fuller Restoration project gallery - clean image showcase
export const fullerProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Project 1',
    description: '',
    serviceType: 'home-renovation',
    completedDate: '2024-11-15',
    images: {
      featured: '/images/projects/GridArt_20250720_214425735.jpg',
      after: ['/images/projects/GridArt_20250720_214425735.jpg'],
      before: []
    },
    tags: []
  },
  {
    id: 'project-2',
    title: 'Project 2',
    description: '',
    serviceType: 'home-renovation',
    completedDate: '2024-10-22',
    images: {
      featured: '/images/projects/image000001.jpg',
      after: ['/images/projects/image000001.jpg'],
      before: []
    },
    tags: []
  },
  {
    id: 'project-3',
    title: 'Project 3',
    description: '',
    serviceType: 'decks-patios',
    completedDate: '2024-09-10',
    images: {
      featured: '/images/projects/GridArt_20250720_214555882.jpg',
      after: ['/images/projects/GridArt_20250720_214555882.jpg'],
      before: []
    },
    tags: []
  },
  {
    id: 'project-4',
    title: 'Project 4',
    description: '',
    serviceType: 'custom-carpentry',
    completedDate: '2024-08-15',
    images: {
      featured: '/images/projects/image000002.jpg',
      after: ['/images/projects/image000002.jpg'],
      before: []
    },
    tags: []
  },
  {
    id: 'project-5',
    title: 'Project 5',
    description: '',
    serviceType: 'windows-doors',
    completedDate: '2024-07-20',
    images: {
      featured: '/images/projects/image000003.jpg',
      after: ['/images/projects/image000003.jpg'],
      before: []
    },
    tags: []
  },
  {
    id: 'project-6',
    title: 'Project 6',
    description: '',
    serviceType: 'home-renovation',
    completedDate: '2024-06-18',
    images: {
      featured: '/images/projects/image000004.jpg',
      after: ['/images/projects/image000004.jpg'],
      before: []
    },
    tags: []
  },
  {
    id: 'project-7',
    title: 'Project 7',
    description: '',
    serviceType: 'custom-carpentry',
    completedDate: '2024-05-25',
    images: {
      featured: '/images/projects/image000005.jpg',
      after: ['/images/projects/image000005.jpg'],
      before: []
    },
    tags: []
  },
  {
    id: 'project-8',
    title: 'Project 8',
    description: '',
    serviceType: 'decks-patios',
    completedDate: '2024-04-12',
    images: {
      featured: '/images/projects/image000006.jpg',
      after: ['/images/projects/image000006.jpg'],
      before: []
    },
    tags: []
  },
  {
    id: 'project-9',
    title: 'Project 9',
    description: '',
    serviceType: 'home-renovation',
    completedDate: '2024-03-08',
    images: {
      featured: '/images/projects/image000007.jpg',
      after: ['/images/projects/image000007.jpg'],
      before: []
    },
    tags: []
  },
  {
    id: 'project-10',
    title: 'Project 10',
    description: '',
    serviceType: 'windows-doors',
    completedDate: '2024-02-14',
    images: {
      featured: '/images/projects/image000008.jpg',
      after: ['/images/projects/image000008.jpg'],
      before: []
    },
    tags: []
  },
  {
    id: 'project-11',
    title: 'Project 11',
    description: '',
    serviceType: 'custom-carpentry',
    completedDate: '2024-01-20',
    images: {
      featured: '/images/projects/image000009.jpg',
      after: ['/images/projects/image000009.jpg'],
      before: []
    },
    tags: []
  },
  {
    id: 'project-12',
    title: 'Project 12',
    description: '',
    serviceType: 'home-renovation',
    completedDate: '2023-12-15',
    images: {
      featured: '/images/projects/FB_IMG_1753069922220.jpg',
      after: ['/images/projects/FB_IMG_1753069922220.jpg'],
      before: []
    },
    tags: []
  }
];

// Featured projects for home page slider
export const featuredProjects = fullerProjects.slice(0, 6);

// Project categories with counts
export const projectCategories = [
  { id: 'all', name: 'All Projects', count: fullerProjects.length },
  { id: 'home-renovation', name: 'Home Renovations', count: fullerProjects.filter(p => p.serviceType === 'home-renovation').length },
  { id: 'custom-carpentry', name: 'Custom Carpentry', count: fullerProjects.filter(p => p.serviceType === 'custom-carpentry').length },
  { id: 'decks-patios', name: 'Decks & Patios', count: fullerProjects.filter(p => p.serviceType === 'decks-patios').length },
  { id: 'windows-doors', name: 'Windows & Doors', count: fullerProjects.filter(p => p.serviceType === 'windows-doors').length }
];
