import { Metadata } from 'next';
import ContactForm from '@/components/ui/ContactForm'
import { businessInfo } from '@/data/businessInfo'
import { generateSEOData, generateOpenGraphData, generateCanonicalUrl, generateBreadcrumbSchema, formatPhoneForCall, formatPhoneForDisplay } from '@/utils/seo';

const seoData = generateSEOData('contact');
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
    canonical: generateCanonicalUrl('/contact'),
  },
};

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://fullerrestoration.com' },
    { name: 'Contact', url: 'https://fullerrestoration.com/contact' }
  ]);

  return (
    <main className="min-h-screen bg-neutral-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <div className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Get Your Free Estimate
              </h1>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Ready to start your project? Fill out the form below and we'll get back to you 
                within 24 hours with a detailed estimate.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <ContactForm />

              {/* Contact Info */}
              <div className="space-y-8">
                {/* Direct Contact */}
                <div className="bg-black text-white rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-6">Contact Us Directly</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 mr-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <div>
                        <p className="font-medium">Call or Text</p>
                        <a href={`tel:${formatPhoneForCall(businessInfo.phone)}`} className="text-yellow-400 hover:text-yellow-300">
                          {formatPhoneForDisplay(businessInfo.phone)}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-6 h-6 mr-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <div>
                        <p className="font-medium">Email</p>
                        <a href={`mailto:${businessInfo.email}`} className="text-yellow-400 hover:text-yellow-300">
                          {businessInfo.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="w-6 h-6 mr-4 mt-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">Service Area</p>
                        <p className="text-gray-300">
                          Columbia, TN & Middle Tennessee
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6">Business Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Friday</span>
                      <span>8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday</span>
                      <span>9:00 AM - 3:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Emergency Services:</strong> Available 24/7 for urgent repairs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}