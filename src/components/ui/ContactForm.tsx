'use client'

import { useState } from 'react'
import { businessInfo, serviceAreas, services } from '@/data/businessInfo'
import { ContactForm as ContactFormType } from '@/types/business'

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: [],
    projectDescription: '',
    preferredContact: 'phone',
    timeline: 'planning',
    budget: undefined
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleServiceTypeChange = (serviceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      serviceType: checked 
        ? [...prev.serviceType, serviceId]
        : prev.serviceType.filter(id => id !== serviceId)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Here you would typically send the form data to your API
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        serviceType: [],
        projectDescription: '',
        preferredContact: 'phone',
        timeline: 'planning',
        budget: undefined
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700 mb-4">
          We've received your project inquiry and will contact you within 24 hours.
        </p>
        <p className="text-green-600 text-sm">
          For immediate assistance, call us at <strong>{businessInfo.phone}</strong>
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="mt-4 text-green-600 hover:text-green-700 font-medium"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="(931) 555-0123"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
            Project Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="City, State (for service area verification)"
          />
        </div>
      </div>

      {/* Services Needed */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Services Needed (Select all that apply)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((service) => (
            <label key={service.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.serviceType.includes(service.id)}
                onChange={(e) => handleServiceTypeChange(service.id, e.target.checked)}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">{service.title}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Project Details */}
      <div>
        <label htmlFor="projectDescription" className="block text-sm font-medium text-neutral-700 mb-2">
          Project Description *
        </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          required
          rows={4}
          value={formData.projectDescription}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="Please describe your project in detail..."
        />
      </div>

      {/* Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="preferredContact" className="block text-sm font-medium text-neutral-700 mb-2">
            Preferred Contact Method
          </label>
          <select
            id="preferredContact"
            name="preferredContact"
            value={formData.preferredContact}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            <option value="phone">Phone Call</option>
            <option value="email">Email</option>
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-neutral-700 mb-2">
            Project Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            <option value="immediate">ASAP</option>
            <option value="1-3months">1-3 Months</option>
            <option value="3-6months">3-6 Months</option>
            <option value="planning">Just Planning</option>
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-neutral-700 mb-2">
            Estimated Budget (Optional)
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            <option value="">Prefer not to say</option>
            <option value="under-5k">Under $5,000</option>
            <option value="5k-15k">$5,000 - $15,000</option>
            <option value="15k-30k">$15,000 - $30,000</option>
            <option value="30k-50k">$30,000 - $50,000</option>
            <option value="over-50k">Over $50,000</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending Request...
            </span>
          ) : (
            'Get Free Estimate'
          )}
        </button>
        
        {submitStatus === 'error' && (
          <p className="mt-2 text-sm text-red-600">
            There was an error submitting your request. Please try again or call us directly.
          </p>
        )}
      </div>

      {/* Contact Info */}
      <div className="text-center pt-4 border-t border-neutral-200">
        <p className="text-sm text-neutral-600 mb-2">
          Need immediate assistance?
        </p>
        <a
          href={`tel:${businessInfo.phone.replace(/[^\d]/g, '')}`}
          className="text-primary-600 hover:text-primary-700 font-semibold text-lg"
        >
          Call {businessInfo.phone}
        </a>
      </div>
    </form>
  )
}