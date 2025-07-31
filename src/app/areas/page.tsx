import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { serviceAreas, businessInfo } from '@/data/businessInfo';
import { generateSEOData, generateCanonicalUrl, generateBreadcrumbSchema } from '@/utils/seo';

const seoData = generateSEOData('areas');

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords.join(', '),
  alternates: {
    canonical: generateCanonicalUrl('/areas'),
  },
};

export default function ServiceAreasPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fullerrestoration.com' },
    { name: 'Service Areas', url: 'https://fullerrestoration.com/areas' }
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
              <li className="text-gray-900 font-medium">Service Areas</li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Service Areas in Middle Tennessee
              </h1>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Fuller Restoration proudly serves Columbia, TN and surrounding Middle Tennessee communities 
                with professional home renovation and custom carpentry services.
              </p>
            </div>

            {/* Primary Service Area */}
            <div className="bg-blue-600 text-white rounded-lg p-8 mb-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Primary Service Area</h2>
              <p className="text-xl mb-6">Columbia, TN & Surrounding Areas</p>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Based in Columbia, Tennessee, we provide comprehensive home renovation services 
                throughout Middle Tennessee with a focus on quality craftsmanship and customer satisfaction.
              </p>
            </div>

            {/* Service Areas Grid */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
                Areas We Serve
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceAreas.map((area) => (
                  <Link
                    key={area.id}
                    href={`/areas/${area.id}`}
                    className="group bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                        {area.name}
                      </h3>
                      <span className="text-sm text-neutral-600">{area.state}</span>
                    </div>
                    <p className="text-neutral-600 text-sm mb-4">
                      Professional home renovation and custom carpentry services in {area.name} and surrounding areas.
                    </p>
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                      <span className="text-sm font-medium">Learn More</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Service Information */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                Why Choose Fuller Restoration?
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
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Our Services</h3>
                  <ul className="space-y-2 text-neutral-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Home renovation and remodeling</span>
                    </li>
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
                      <span>Deck and patio construction</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Contact Fuller Restoration today for a free estimate on your home renovation project. 
                We're proud to serve Middle Tennessee with quality craftsmanship and exceptional customer service.
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