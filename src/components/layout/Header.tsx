'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { businessInfo } from '@/data/businessInfo'
import { formatPhoneForCall, formatPhoneForDisplay } from '@/utils/seo'
import { getImagePath } from '@/utils/imagePaths'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' }
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
                src={getImagePath("images/logos/Fuller logo.jpg")}
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
            {/* Contact Information - Enhanced Prominence */}
            <div className="hidden xl:flex items-center space-x-6">
              {/* Phone Number - Enhanced Prominence */}
              <a
                href={`tel:${formatPhoneForCall(businessInfo.phone)}`}
                className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-200 bg-neutral-800 px-3 py-2 rounded-lg border border-neutral-700"
                title="Call Fuller Restoration for immediate assistance"
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
                <span className="font-semibold">
                  {formatPhoneForDisplay(businessInfo.phone)}
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${businessInfo.email}`}
                className="flex items-center space-x-2 text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                title="Email Fuller Restoration"
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium">Email Us</span>
              </a>
            </div>

            {/* Phone Number - Visible on Medium Screens */}
            <a
              href={`tel:${formatPhoneForCall(businessInfo.phone)}`}
              className="xl:hidden flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-200"
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
            <Link
              href="/contact"
              className="hidden md:inline-flex btn-primary"
            >
              Get Free Estimate
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-white hover:text-primary-400 hover:bg-neutral-800 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
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
        <div className={`lg:hidden border-t border-neutral-800 transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-screen opacity-100 py-4' 
            : 'max-h-0 opacity-0 py-0 overflow-hidden'
        }`}>
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
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Call {formatPhoneForDisplay(businessInfo.phone)}
                </a>
                <Link
                  href="/contact"
                  className="btn-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Free Estimate
                </Link>
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="flex items-center justify-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-200 py-2"
                  onClick={() => setMobileMenuOpen(false)}
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
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">Email Us</span>
                </a>
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
      </div>
    </header>
  )
}