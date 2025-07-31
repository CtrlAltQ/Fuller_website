import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fullerProjects } from '@/data/projects';
import { businessInfo } from '@/data/businessInfo';
import { generateSEOData, generateOpenGraphData, generateCanonicalUrl, generateBreadcrumbSchema, formatPhoneForCall, formatPhoneForDisplay } from '@/utils/seo';
import { getImagePath } from '@/utils/imagePaths';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return fullerProjects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = fullerProjects.find((p) => p.id === params.id);
  
  if (!project) {
    return {
      title: 'Project Not Found - Fuller Restoration',
      description: 'The requested project could not be found.',
    };
  }

  const seoData = generateSEOData('project', {
    title: project.title,
    description: project.description,
    location: `${project.location.city}, ${project.location.state}`,
    category: project.serviceType,
  });

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords.join(', '),
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: 'article',
      images: [
        {
          url: project.images.featured,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    alternates: {
      canonical: generateCanonicalUrl(`/projects/${params.id}`),
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = fullerProjects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fullerrestoration.com' },
    { name: 'Projects', url: 'https://fullerrestoration.com/projects' },
    { name: project.title, url: `https://fullerrestoration.com/projects/${project.id}` }
  ]);

  return (
    <main className="min-h-screen bg-neutral-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Header />
      
      <div className="section-padding">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link href="/projects" className="text-blue-600 hover:text-blue-800">
                  Projects
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-900 font-medium">{project.title}</li>
            </ol>
          </nav>

          <div className="max-w-6xl mx-auto">
            {/* Project Header */}
            <div className="mb-12">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {project.serviceType}
                </span>
                <span className="text-gray-600">
                  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {project.location.city}, {project.location.state}
                </span>
                {project.completedDate && (
                  <span className="text-gray-600">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0V7a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V8a1 1 0 00-1-1H9z" />
                    </svg>
                    Completed {project.completedDate}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {project.title}
              </h1>
              
              <p className="text-xl text-neutral-600 max-w-3xl">
                {project.description}
              </p>
            </div>

            {/* Project Images */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Featured Image */}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={getImagePath(project.images.featured)}
                    alt={`${project.title} - Featured Image`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* After Images */}
                {project.images.after?.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={getImagePath(image)}
                      alt={`${project.title} - After Image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Project Details</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-neutral-700 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-4">Project Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Project Information</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium text-neutral-700">Service Type:</span>
                      <span className="ml-2 text-neutral-600">{project.serviceType}</span>
                    </div>
                    <div>
                      <span className="font-medium text-neutral-700">Location:</span>
                      <span className="ml-2 text-neutral-600">{project.location.city}, {project.location.county}, {project.location.state}</span>
                    </div>
                    {project.completedDate && (
                      <div>
                        <span className="font-medium text-neutral-700">Completed:</span>
                        <span className="ml-2 text-neutral-600">{project.completedDate}</span>
                      </div>
                    )}

                  </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-black text-white rounded-lg p-6 mt-6">
                  <h3 className="text-xl font-bold mb-4">Ready to Start Your Project?</h3>
                  <p className="text-gray-300 mb-6">
                    Get a free estimate for your home renovation project today.
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className="block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg text-center transition-colors duration-200"
                    >
                      Get Free Estimate
                    </Link>
                    <a
                      href={`tel:${formatPhoneForCall(businessInfo.phone)}`}
                      className="block bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-6 rounded-lg text-center transition-colors duration-200"
                    >
                      Call {formatPhoneForDisplay(businessInfo.phone)}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Projects */}
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-neutral-900 mb-8">More Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {fullerProjects
                  .filter((p) => p.id !== project.id && p.serviceType === project.serviceType)
                  .slice(0, 3)
                  .map((relatedProject) => (
                    <Link
                      key={relatedProject.id}
                      href={`/projects/${relatedProject.id}`}
                      className="group"
                    >
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg mb-4">
                        <Image
                          src={getImagePath(relatedProject.images.featured)}
                          alt={relatedProject.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-neutral-600 text-sm">{relatedProject.location.city}, {relatedProject.location.state}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}