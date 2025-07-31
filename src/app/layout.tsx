import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { generateSEOData, generateLocalBusinessSchema } from '@/utils/seo'

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})



const seoData = generateSEOData('home')
const businessSchema = generateLocalBusinessSchema()

export const metadata: Metadata = {
  metadataBase: new URL('https://fullerrestoration.com'),
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords.join(', '),
  authors: [{ name: 'Fuller Restoration and Renovation LLC' }],
  creator: 'Fuller Restoration and Renovation LLC',
  publisher: 'Fuller Restoration and Renovation LLC',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fullerrestoration.com',
    title: seoData.title,
    description: seoData.description,
    siteName: 'Fuller Restoration and Renovation LLC',
    images: [
      {
        url: '/images/logos/Fuller_Logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Fuller Restoration and Renovation LLC - Columbia TN Contractor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoData.title,
    description: seoData.description,
    images: ['/images/logos/Fuller_Logo.jpg'],
  },
  verification: {
    google: 'your-google-verification-code', // Add actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#369936" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js');
                  });
                }
              `,
            }}
          />
        )}
        {children}
      </body>
    </html>
  )
}