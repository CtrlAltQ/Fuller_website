// Core TypeScript interfaces for Fuller Restoration & Renovation

export interface BusinessInfo {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: {
    street?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  founded: string;
  description: string;
  specialties: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  businessHours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export interface ServiceArea {
  id: string;
  name: string;
  county: string;
  state: string;
  isPrimary: boolean;
  description?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  keywords: string[];
  serviceAreas: string[]; // ServiceArea IDs
  features: string[];
  process?: string[];
  estimatedTimeframe?: string;
  priceRange?: string;
  image?: string;
  gallery?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  serviceType: string; // Service ID
  location: {
    city: string;
    county: string;
    state: string;
  };
  completedDate: string;
  duration?: string;
  images: {
    before?: string[];
    during?: string[];
    after: string[];
    featured: string; // Main project image
  };
  testimonial?: {
    text: string;
    author: string;
    rating: number;
  };
  tags: string[];
}

export interface ContactForm {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string[];
  projectDescription: string;
  preferredContact: 'phone' | 'email';
  timeline: 'immediate' | '1-3months' | '3-6months' | 'planning';
  budget?: 'under-5k' | '5k-15k' | '15k-30k' | '30k-50k' | 'over-50k';
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  serviceType: string;
  date: string;
  verified: boolean;
  projectId?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  localKeywords: string[];
}

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': string;
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  areaServed: Array<{
    '@type': string;
    name: string;
    containedInPlace: {
      '@type': string;
      name: string;
    };
  }> | string[];
  serviceType: string[];
  foundingDate: string;
  priceRange?: string;
  paymentAccepted?: string[];
  openingHours?: string[];
  hasOfferCatalog?: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      itemOffered: {
        '@type': string;
        name: string;
        description: string;
        areaServed: string[];
      };
    }>;
  };
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    reviewCount: string;
    bestRating: string;
    worstRating: string;
  };
  sameAs?: string[];
}