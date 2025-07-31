import { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';
import { generateSEOData, generateOpenGraphData, generateCanonicalUrl } from '@/utils/seo';

const seoData = generateSEOData('projects');
const openGraphData = generateOpenGraphData('website', seoData.title, seoData.description);

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords.join(', '),
  openGraph: {
    title: openGraphData['og:title'],
    description: openGraphData['og:description'],
    type: 'website',
    images: [openGraphData['og:image']],
  },
  twitter: {
    card: 'summary_large_image',
    title: openGraphData['twitter:title'],
    description: openGraphData['twitter:description'],
    images: [openGraphData['twitter:image']],
  },
  alternates: {
    canonical: generateCanonicalUrl('/projects'),
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}