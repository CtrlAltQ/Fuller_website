import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { serviceAreas, businessInfo } from '@/data/businessInfo';
import { fullerProjects } from '@/data/projects';
import { generateSEOData, generateCanonicalUrl, generateBreadcrumbSchema } from '@/utils/seo';

interface AreaPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return serviceAreas.map((area) => ({
    id: area.id,
  }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const area = serviceAreas.find((a) => a.id === params.id);
  
  if (!area) {
    return {
      title: 'Service Area Not Found - Fuller Restoration',
      description: 'The requested service area could not be found.',
    };
  }

  const seoData = generateSEOData('area', {
    title: `${area.name}, ${area.state} Services`,
    description: `Professional home renovation and custom carpentry services in ${area.name}, ${area.state}. Fuller Restoration serves the ${area.name} area with quality craftsmanship.`,
    location: `${area.name}, ${area.state}`,
  });

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords.join(', '),
    alternates: {
      canonical: generateCanonicalUrl(`/areas/${params.id}`),
    },
  };
}

export default function ServiceAreaPage({ params }: AreaPageProps) {
  const area = serviceAreas.find((a) => a.id === params.id);

  if (!area) {
    notFound();
  }

  // Get projects in this area
  const areaProjects = fullerProjects.filter(project => 
    project.location.city.toLowerCase().includes(area.name.toLowerCase()) ||
    project.location.county.toLowerCase().includes(area.name.toLowerCase())
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fullerrestoration.com' },
    { name: 'Service Areas', url: 'https://fullerrestoration.com/areas' },
    { name: `${area.name}, ${area.state}`, url: `https://fullerrestoration.com/areas/${area.id}` }
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
                <Link href="/areas" className="text-blue-600 hover:text-blue-800">
                  Service Areas
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-900 font-medium">{area.name}, {area.state}</li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Home Renovation Services in {area.name}, {area.state}
              </h1>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Fuller Restoration proudly serves {area.name} and surrounding areas with professional 
                home renovation, custom carpentry, and restoration services. With 15+ years of experience, 
                we bring quality craftsmanship to every project.
              </p>
            </div>

            {/* Service Area Info */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Why Choose Fuller Restoration in {area.name}?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Local Expertise</h3>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>15+ years serving Middle Tennessee</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Family-owned and operated</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Licensed and insured</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Free estimates and consultations</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Our Services</h3>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Custom carpentry and millwork</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Flooring installation and repair</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Window and door services</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Deck and porch construction</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects in Area */}
            {areaProjects.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-900 mb-8">
                  Recent Projects in {area.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {areaProjects.slice(0, 6).map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative aspect-[4/3]">
                        <img
                          src={project.images.featured}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors mb-2">
                          {project.title}
                        </h3>
                        <p className="text-neutral-600 text-sm mb-2">{project.location.city}, {project.location.state}</p>
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {project.serviceType}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Start Your Project in {area.name}?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Contact Fuller Restoration today for a free estimate on your home renovation project. 
                We're proud to serve {area.name} and surrounding areas with quality craftsmanship and 
                exceptional customer service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${businessInfo.phone.replace(/[^\d]/g, '')}`}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Call {businessInfo.phone}
                </a>
                <Link
                  href="/contact"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Get Free Estimate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}