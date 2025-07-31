import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { businessInfo, serviceAreas, services } from '@/data/businessInfo';
import { getImagePath } from '@/utils/imagePaths';
import { generateSEOData, generateOpenGraphData, generateCanonicalUrl, generateBreadcrumbSchema, formatPhoneForCall, formatPhoneForDisplay } from '@/utils/seo';

const seoData = generateSEOData('about');
const openGraphData = generateOpenGraphData('article', seoData.title, seoData.description);

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
    canonical: generateCanonicalUrl('/about'),
  },
};

export default function AboutPage() {
  const primaryServiceAreas = serviceAreas.filter(area => area.isPrimary);
  const secondaryServiceAreas = serviceAreas.filter(area => !area.isPrimary);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fullerrestoration.com' },
    { name: 'About', url: 'https://fullerrestoration.com/about' }
  ]);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Fuller Restoration
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Family-owned and operated with 15+ years of experience in home renovations and custom carpentry throughout Middle Tennessee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Get Free Estimate
                </Link>
                <a
                  href={`tel:${formatPhoneForCall(businessInfo.phone)}`}
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Call {formatPhoneForDisplay(businessInfo.phone)}
                </a>
              </div>
            </div>
            <div className="relative">
              <Image
                src={getImagePath("images/logos/Fuller_Logo.jpg")}
                alt="Fuller Restoration and Renovation LLC"
                width={400}
                height={300}
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  Fuller Restoration and Renovation LLC was founded with a simple mission: to provide Middle Tennessee homeowners with exceptional craftsmanship and personalized service that transforms houses into dream homes.
                </p>
                <p className="mb-6">
                  With over 15 years of experience in remodels and restorations, we've built our reputation on quality workmanship, attention to detail, and treating every project as if it were our own home. As a family-owned and operated business, we understand the importance of trust, reliability, and clear communication throughout every project.
                </p>
                <p className="mb-6">
                  From our home base in Columbia, Tennessee, we've had the privilege of serving families throughout Maury County and the surrounding Middle Tennessee region, helping them create spaces that reflect their unique style and meet their practical needs.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src={getImagePath("images/projects/ProjectExp.jpg")}
                alt="Fuller Restoration project example"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Expertise
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specializing in comprehensive home renovation and custom carpentry services with a focus on quality craftsmanship and customer satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values & Commitment
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What sets us apart is our unwavering commitment to quality and our family-owned approach to business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Family Owned & Operated
              </h3>
              <p className="text-gray-600">
                As a family business, we treat every client like family and every project with personal care and attention.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quality Craftsmanship
              </h3>
              <p className="text-gray-600">
                With 15+ years of experience, we deliver superior workmanship that stands the test of time.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Local Middle Tennessee Focus
              </h3>
              <p className="text-gray-600">
                We're proud to serve our local community and understand the unique needs of Middle Tennessee homes.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Personalized Service
              </h3>
              <p className="text-gray-600">
                We work closely with each client to understand their vision and deliver customized solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Service Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proudly serving Columbia, TN and the surrounding Middle Tennessee counties with professional home renovation and custom carpentry services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Primary Service Area
              </h3>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                {primaryServiceAreas.map((area) => (
                  <div key={area.id} className="mb-4 last:mb-0">
                    <h4 className="font-semibold text-gray-900">
                      {area.name}, {area.state}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Extended Service Areas
              </h3>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="grid grid-cols-1 gap-3">
                  {secondaryServiceAreas.map((area) => (
                    <div key={area.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-gray-900">
                        {area.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {area.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Map Integration */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Service Area Map
              </h3>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51873.31042569034!2d-87.08797233343316!3d35.61498022499054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8863f8f5e9b2fd8d%3A0x7a14a71c9d8f9a0f!2sColumbia%2C%20TN!5e0!3m2!1sen!2sus!4v1627308912345!5m2!1sen!2sus"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                    title="Fuller Restoration Service Area - Columbia, TN and Middle Tennessee"
                  ></iframe>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Serving Columbia, TN and surrounding Middle Tennessee counties
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Don't see your area listed? Contact us to discuss your project - we may be able to accommodate special requests.
            </p>
            <a
              href={`tel:${formatPhoneForCall(businessInfo.phone)}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Call {formatPhoneForDisplay(businessInfo.phone)}
            </a>
          </div>
        </div>
      </section>

      {/* Business Hours & Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Information & Hours
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to get started on your project? Here's how to reach us and when we're available.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Contact Us
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <a
                    href={`tel:${formatPhoneForCall(businessInfo.phone)}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {formatPhoneForDisplay(businessInfo.phone)}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {businessInfo.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="text-gray-900">
                    {businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.zipCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            {businessInfo.businessHours && (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-2">
                  {Object.entries(businessInfo.businessHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="text-gray-600 capitalize">{day}</span>
                      <span className="text-gray-900 font-medium">{hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Emergency services available by appointment
                  </p>
                </div>
              </div>
            )}

            {/* Social Media & Follow Us */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Follow Us
                </h3>
              </div>
              <div className="space-y-4">
                {businessInfo.socialMedia?.facebook && (
                  <div>
                    <a
                      href={businessInfo.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="font-medium">Follow us on Facebook</span>
                    </a>
                    <p className="text-sm text-gray-600 mt-2 ml-9">
                      See our latest projects, customer reviews, and get updates on our work in Middle Tennessee.
                    </p>
                  </div>
                )}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Stay Connected:</strong> Follow us on Facebook to see our latest projects, read customer testimonials, and stay updated on our work throughout Middle Tennessee. We regularly share before-and-after photos and project highlights!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            With 15+ years of experience and a commitment to quality craftsmanship, we're ready to help bring your home renovation vision to life. Contact us today for a free estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Free Estimate
            </Link>
            <Link
              href="/projects"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View Our Work
            </Link>
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
              About
            </li>
          </ol>
        </div>
      </nav>

      <Footer />
    </div>
  );
}