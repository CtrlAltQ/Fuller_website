import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { services, serviceAreas, businessInfo } from '@/data/businessInfo';
import { fullerProjects, featuredProjects } from '@/data/projects';
import { generateServiceSEOData, generateServiceSchema, generateOpenGraphData, generateCanonicalUrl, generateBreadcrumbSchema } from '@/utils/seo';
import { ServiceArea } from '@/types/business';

interface ServicePageProps {
  params: {
    id: string;
  };
}

// Generate static params for all services
export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

// Generate metadata for each service page
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = services.find((s) => s.id === params.id);
  
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service page could not be found.',
    };
  }

  const seoData = generateServiceSEOData(service.id, service.title);
  const openGraphData = generateOpenGraphData('article', seoData.title, seoData.description, service.image);
  
  return {
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
      canonical: generateCanonicalUrl(`/services/${service.id}`),
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find((s) => s.id === params.id);
  
  if (!service) {
    notFound();
  }

  // Get service areas for this service
  const serviceAreaDetails = service.serviceAreas
    .map(areaId => serviceAreas.find(area => area.id === areaId))
    .filter((area): area is ServiceArea => area !== undefined);

  // Get relevant project examples for this service
  const relevantProjects = [...featuredProjects, ...fullerProjects]
    .filter(project => project.serviceType === service.id)
    .slice(0, 6); // Show up to 6 relevant projects

  // Generate structured data for this service
  const serviceSchema = generateServiceSchema(service.id);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fullerrestoration.com' },
    { name: 'Services', url: 'https://fullerrestoration.com/services' },
    { name: service.title, url: `https://fullerrestoration.com/services/${service.id}` }
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white py-20">
          {service.image && (
            <div className="absolute inset-0 z-0">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover opacity-30"
                priority
              />
            </div>
          )}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
                {service.shortDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Get Free Estimate
                </Link>
                <a
                  href={`tel:${businessInfo.phone.replace(/[^\d]/g, '')}`}
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Call {businessInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Professional {service.title} in Middle Tennessee
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  With over 15 years of experience serving Middle Tennessee, Fuller Restoration brings 
                  expertise, quality craftsmanship, and personalized service to every {service.title.toLowerCase()} project. 
                  We're a family-owned business committed to exceeding your expectations.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.estimatedTimeframe && (
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <svg className="w-6 h-6 text-blue-600 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Project Timeline
                      </h3>
                      <p className="text-gray-700">{service.estimatedTimeframe}</p>
                    </div>
                  )}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      <svg className="w-6 h-6 text-green-600 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Quality Guarantee
                    </h3>
                    <p className="text-gray-700">100% satisfaction guaranteed on all work</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  What's Included
                </h3>
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Why Choose Us */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Why Choose Fuller Restoration?
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      15+ years of experience
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Family-owned and operated
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Licensed and insured
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Free estimates
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        {service.process && service.process.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our {service.title} Process
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We follow a proven process to ensure your project is completed on time, 
                  within budget, and to your complete satisfaction.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.process.map((step, index) => (
                  <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm">
                    <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Step {index + 1}
                    </h3>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <p className="text-lg text-gray-600 mb-6">
                  Ready to get started? Contact us today for your free consultation and estimate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Get Free Estimate
                  </Link>
                  <a
                    href={`tel:${businessInfo.phone.replace(/[^\d]/g, '')}`}
                    className="bg-transparent border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Call {businessInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Project Examples */}
        {relevantProjects.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Recent {service.title} Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relevantProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={project.images.featured}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm">
                        {project.location.city}, {project.location.county}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {project.description}
                      </p>
                      {project.duration && (
                        <p className="text-sm text-blue-600 mb-3">
                          Duration: {project.duration}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/projects"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
                >
                  View All Projects
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Service Areas */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Service Areas
            </h2>
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We proudly serve Middle Tennessee communities with professional {service.title.toLowerCase()} services. 
                Our experienced team brings quality craftsmanship to your doorstep.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceAreaDetails.map((area) => (
                <div key={area.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {area.name}, {area.state}
                  </h3>
                  <p className="text-gray-600 mb-2">{area.county}</p>
                  {area.description && (
                    <p className="text-gray-700 text-sm">{area.description}</p>
                  )}
                  {area.isPrimary && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
                      Primary Service Area
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Ready to Transform Your Space?
                </h2>
                <p className="text-xl mb-6">
                  Get a free, no-obligation estimate for your {service.title.toLowerCase()} project. 
                  Our experienced team is ready to bring your vision to life.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Free consultation and estimate
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Licensed and insured professionals
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Quality workmanship guarantee
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Serving Middle Tennessee since 2009
                  </li>
                </ul>
              </div>
              <div className="bg-white text-gray-900 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Get Your Free Estimate
                </h3>
                <div className="space-y-4">
                  <Link
                    href="/contact"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-center block"
                  >
                    Request Online Estimate
                  </Link>
                  <a
                    href={`tel:${businessInfo.phone.replace(/[^\d]/g, '')}`}
                    className="w-full bg-transparent border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors text-center block"
                  >
                    Call {businessInfo.phone}
                  </a>
                  <div className="text-center text-sm text-gray-600 mt-4">
                    <p>Available Monday - Friday: 8AM - 5PM</p>
                    <p>Saturday: 9AM - 3PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <nav className="bg-gray-100 py-4" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
              </li>
              <li>
                <svg
                  className="w-4 h-4 text-gray-400 mx-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <Link href="/services" className="text-blue-600 hover:text-blue-800">
                  Services
                </Link>
              </li>
              <li>
                <svg
                  className="w-4 h-4 text-gray-400 mx-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li className="text-gray-500" aria-current="page">
                {service.title}
              </li>
            </ol>
          </div>
        </nav>
      </div>
    </>
  );
}