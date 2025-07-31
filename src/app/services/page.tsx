import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { services, businessInfo } from '@/data/businessInfo';
import { generateSEOData, generateOpenGraphData, generateCanonicalUrl, generateBreadcrumbSchema } from '@/utils/seo';

const seoData = generateSEOData('service', {
  title: `Services | ${businessInfo.name} | Columbia TN & Middle Tennessee Contractor`,
  description: `Professional home renovation and custom carpentry services in Columbia, TN and Middle Tennessee. 15+ years experience in flooring, trim, windows, cabinets, countertops, fences, decks & porches. Licensed & insured contractor serving Maury, Williamson, Davidson counties.`,
  keywords: [
    'Columbia TN contractor services',
    'Tennessee home renovation services',
    'custom carpentry services Middle Tennessee',
    'deck construction Columbia TN',
    'fence installation Tennessee',
    'window installation Middle Tennessee',
    'door installation Columbia TN',
    'flooring installation Tennessee',
    'cabinet installation Middle Tennessee',
    'countertop installation Columbia TN',
    'licensed contractor services',
    'insured renovation contractor'
  ]
});
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
    canonical: generateCanonicalUrl('/services'),
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fullerrestoration.com' },
    { name: 'Services', url: 'https://fullerrestoration.com/services' }
  ]);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            Professional home renovation and custom carpentry services throughout Middle Tennessee
          </p>
          <a
            href={`tel:${businessInfo.phone.replace(/[^\d]/g, '')}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            Call {businessInfo.phone} for Free Estimate
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                {service.image && (
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {service.shortDescription}
                  </p>
                  {service.estimatedTimeframe && (
                    <p className="text-sm text-blue-600 mb-4">
                      Timeframe: {service.estimatedTimeframe}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="text-gray-500 text-xs">
                        +{service.features.length - 3} more
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/services/${service.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors inline-block"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Fuller Restoration?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Family-owned and operated with a commitment to quality craftsmanship and personalized service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessInfo.specialties.map((specialty, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
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
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {specialty}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free estimate. We're here to help bring your home renovation vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Free Estimate
            </Link>
            <a
              href={`tel:${businessInfo.phone.replace(/[^\d]/g, '')}`}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Call {businessInfo.phone}
            </a>
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
            <li className="text-gray-500" aria-current="page">
              Services
            </li>
          </ol>
        </div>
      </nav>
    </div>
  );
}