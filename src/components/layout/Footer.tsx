import Image from 'next/image'
import Link from 'next/link'
import { businessInfo, serviceAreas, services } from '@/data/businessInfo'
import { formatPhoneForCall, formatPhoneForDisplay } from '@/utils/seo'
import { getImagePath } from '@/utils/imagePaths'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <Image
                  src={getImagePath("images/logos/Fuller_Logo.jpg")}
                  alt="Fuller Restoration and Renovation LLC Logo"
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-bold">Fuller Restoration</h3>
                  <p className="text-wood-200 text-sm">Custom Carpentry</p>
                </div>
              </div>
              
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Family-owned home renovation and custom carpentry business with 15+ years 
                of experience serving Columbia, TN and Middle Tennessee with quality craftsmanship.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href={`tel:${formatPhoneForCall(businessInfo.phone)}`}
                  className="flex items-center space-x-3 text-primary-400 hover:text-primary-300 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-semibold">{formatPhoneForDisplay(businessInfo.phone)}</span>
                </a>

                <a
                  href={`mailto:${businessInfo.email}`}
                  className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{businessInfo.email}</span>
                </a>

                <div className="flex items-start space-x-3 text-neutral-300">
                  <svg className="w-5 h-5 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p>{businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.zipCode}</p>
                    <p className="text-sm text-neutral-400">Serving Middle Tennessee</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              {businessInfo.socialMedia?.facebook && (
                <div className="mt-6">
                  <h5 className="text-sm font-semibold text-wood-200 mb-3">Follow Us</h5>
                  <div className="flex space-x-3">
                    <a
                      href={businessInfo.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                      aria-label="Follow Fuller Restoration on Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">
                    See our latest projects and updates
                  </p>
                </div>
              )}
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-wood-200">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.id}`}
                      className="text-neutral-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Areas */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-wood-200">Service Areas</h4>
              <ul className="space-y-2">
                {serviceAreas.map((area) => (
                  <li key={area.id}>
                    <Link
                      href={`/areas/${area.id}`}
                      className="text-neutral-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {area.name}, {area.state}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-neutral-800 rounded-lg">
                <p className="text-xs text-neutral-400 mb-1">Primary Service Area:</p>
                <p className="text-sm text-primary-400 font-medium">Columbia, TN & Surrounding Areas</p>
              </div>
            </div>

            {/* Quick Links & Business Hours */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-wood-200">Quick Links</h4>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link href="/" className="text-neutral-300 hover:text-white transition-colors duration-200 text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-neutral-300 hover:text-white transition-colors duration-200 text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-neutral-300 hover:text-white transition-colors duration-200 text-sm">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors duration-200 text-sm">
                    Contact & Estimates
                  </Link>
                </li>
              </ul>

              {/* Business Hours */}
              {businessInfo.businessHours && (
                <div className="bg-neutral-800 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-wood-200 mb-3">Business Hours</h5>
                  <div className="space-y-1 text-xs text-neutral-300">
                    <div className="flex justify-between">
                      <span>Monday:</span>
                      <span>{businessInfo.businessHours.monday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tuesday:</span>
                      <span>{businessInfo.businessHours.tuesday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wednesday:</span>
                      <span>{businessInfo.businessHours.wednesday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thursday:</span>
                      <span>{businessInfo.businessHours.thursday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday:</span>
                      <span>{businessInfo.businessHours.friday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>{businessInfo.businessHours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>{businessInfo.businessHours.sunday}</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">
                    Emergency services available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright and Legal */}
            <div className="text-center md:text-left">
              <p className="text-sm text-neutral-400">
                © {currentYear} {businessInfo.name}. All rights reserved.
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Licensed contractor serving Columbia, TN and Middle Tennessee
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Fully insured • Bonded • 15+ years experience
              </p>
            </div>

            {/* Social Media and Local SEO */}
            <div className="text-center md:text-right">
              {businessInfo.socialMedia?.facebook && (
                <div className="flex justify-center md:justify-end items-center space-x-4 mb-2">
                  <a
                    href={businessInfo.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-blue-400 transition-colors duration-200"
                    aria-label="Visit our Facebook page"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <span className="text-neutral-500 text-xs">Follow us for updates</span>
                </div>
              )}
              <p className="text-xs text-neutral-500">
                Columbia TN Contractor | Tennessee Home Renovation | Custom Carpentry Middle Tennessee
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <div className="bg-primary-900 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to Transform Your Home?
              </h3>
              <p className="text-primary-200 mb-4">
                Contact Fuller Restoration today for your free estimate
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`tel:${formatPhoneForCall(businessInfo.phone)}`}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Call {formatPhoneForDisplay(businessInfo.phone)}
                </a>
                <Link
                  href="/contact"
                  className="bg-white text-primary-900 hover:bg-neutral-100 font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Get Free Estimate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}