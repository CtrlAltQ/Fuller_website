'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { businessInfo } from '@/data/businessInfo'
import { formatPhoneForCall, formatPhoneForDisplay } from '@/utils/seo'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' }
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-black shadow-lg sticky top-0 z-50 border-b border-neutral-800">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logos/Fuller logo.jpg"
                alt="Fuller Restoration and Renovation LLC Logo"
                width={50}
                height={50}
                className="rounded-lg"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white leading-tight">
                  Fuller Restoration
                </h1>
                <p className="text-sm text-primary-400 font-medium">
                  Custom Carpentry
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-primary-400 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="flex items-center space-x-4">
            {/* Phone Number - Always Visible */}
            <a
              href={`tel:${formatPhoneForCall(businessInfo.phone)}`}
              className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="hidden sm:inline font-semibold">
                {formatPhoneForDisplay(businessInfo.phone)}
              </span>
            </a>

            {/* Contact Us Button - Hidden on Mobile */}
            <button
              onClick={() => {
                // If on home page, scroll to contact form
                if (window.location.pathname === '/') {
                  const contactForm = document.querySelector('#contact-form');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  // If on other pages, go to home page with contact form anchor
                  window.location.href = '/#contact-form';
                }
              }}
              className="hidden md:inline-flex btn-primary"
            >
              Contact Us
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-white hover:text-primary-400 hover:bg-neutral-800 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-800 py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-primary-400 font-medium py-2 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-neutral-800">
                <a
                  href={`tel:${formatPhoneForCall(businessInfo.phone)}`}
                  className="btn-call text-center"
                >
                  Call {formatPhoneForDisplay(businessInfo.phone)}
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    // If on home page, scroll to contact form
                    if (window.location.pathname === '/') {
                      setTimeout(() => {
                        const contactForm = document.querySelector('#contact-form');
                        if (contactForm) {
                          contactForm.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    } else {
                      // If on other pages, go to home page with contact form anchor
                      window.location.href = '/#contact-form';
                    }
                  }}
                  className="btn-primary text-center"
                >
                  Contact Us
                </button>
              </div>

              {/* Location Info */}
              <div className="pt-4 border-t border-neutral-800">
                <p className="text-sm text-neutral-300">
                  <span className="font-medium">Serving:</span> Columbia, TN & Middle Tennessee
                </p>
                <p className="text-sm text-neutral-300">
                  <span className="font-medium">Email:</span>{' '}
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="text-primary-400 hover:text-primary-300"
                  >
                    {businessInfo.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}