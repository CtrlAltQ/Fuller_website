'use client'

import { useState } from 'react'
import { ContactForm as ContactFormType } from '@/types/business'
import { services } from '@/data/businessInfo'

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  address?: string
  serviceType?: string
  projectDescription?: string
  preferredContact?: string
  timeline?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: [],
    projectDescription: '',
    preferredContact: 'phone',
    timeline: 'immediate'
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Timeline options
  const timelineOptions = [
    { value: 'immediate', label: 'As soon as possible' },
    { value: '1-3months', label: '1-3 months' },
    { value: '3-6months', label: '3-6 months' },
    { value: 'planning', label: 'Just planning ahead' }
  ]

  // Budget options
  const budgetOptions = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-30k', label: '$15,000 - $30,000' },
    { value: '30k-50k', label: '$30,000 - $50,000' },
    { value: 'over-50k', label: 'Over $50,000' }
  ]

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // More comprehensive phone validation for US numbers
    const phoneRegex = /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '')
    return cleanPhone.length >= 10 && phoneRegex.test(phone)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Required field validation with enhanced checks
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid US phone number (e.g., (931) 555-0123)'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Service address is required'
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please enter a complete address'
    }

    if (formData.serviceType.length === 0) {
      newErrors.serviceType = 'Please select at least one service type'
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required'
    } else if (formData.projectDescription.trim().length < 20) {
      newErrors.projectDescription = 'Please provide more details about your project (minimum 20 characters)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleServiceTypeChange = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: prev.serviceType.includes(serviceId)
        ? prev.serviceType.filter(id => id !== serviceId)
        : [...prev.serviceType, serviceId]
    }))

    // Clear error when user selects a service
    if (errors.serviceType) {
      setErrors(prev => ({
        ...prev,
        serviceType: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      // Scroll to first error field for better UX
      const firstErrorField = document.querySelector('.border-red-500')
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Enhanced form submission simulation with realistic timing
      // In production, this would send to your backend API or email service
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      }

      // Simulate network request with variable timing
      const delay = Math.random() * 1000 + 1000 // 1-2 seconds
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional network errors for testing
          if (Math.random() < 0.05) { // 5% chance of error
            reject(new Error('Network error'))
          } else {
            resolve(submissionData)
          }
        }, delay)
      })
      
      console.log('Form submitted successfully:', submissionData)
      setSubmitStatus('success')
      
      // Reset form on success with slight delay for better UX
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          serviceType: [],
          projectDescription: '',
          preferredContact: 'phone',
          timeline: 'immediate'
        })
        setErrors({})
      }, 500)

    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      
      // Log error details for debugging
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          formData: formData
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors text-base touch-manipulation ${
              errors.name ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="Enter your full name"
            autoComplete="name"
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors text-base touch-manipulation ${
              errors.phone ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="(931) 555-0123"
            autoComplete="tel"
            inputMode="tel"
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            aria-invalid={errors.phone ? 'true' : 'false'}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors text-base touch-manipulation ${
              errors.email ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="your.email@example.com"
            autoComplete="email"
            inputMode="email"
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Service Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
            Service Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors text-base touch-manipulation ${
              errors.address ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="123 Main St, Columbia, TN 38401"
            autoComplete="street-address"
            aria-describedby={errors.address ? 'address-error' : undefined}
            aria-invalid={errors.address ? 'true' : 'false'}
          />
          {errors.address && (
            <p id="address-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.address}
            </p>
          )}
        </div>

        {/* Service Type Multi-Select */}
        <fieldset>
          <legend className="block text-sm font-medium text-neutral-700 mb-2">
            Service Types Needed *
          </legend>
          <div className="space-y-2" role="group" aria-describedby={errors.serviceType ? 'service-type-error' : undefined}>
            {services.map(service => (
              <label key={service.id} className="flex items-center cursor-pointer hover:bg-neutral-50 p-3 sm:p-2 rounded touch-manipulation tap-target">
                <input
                  type="checkbox"
                  checked={formData.serviceType.includes(service.id)}
                  onChange={() => handleServiceTypeChange(service.id)}
                  className="h-5 w-5 sm:h-4 sm:w-4 text-black focus:ring-black border-neutral-300 rounded touch-manipulation"
                  aria-describedby={`service-${service.id}-desc`}
                />
                <span className="ml-3 sm:ml-2 text-base sm:text-sm text-neutral-700">{service.title}</span>
                <span id={`service-${service.id}-desc`} className="sr-only">
                  {service.shortDescription}
                </span>
              </label>
            ))}
          </div>
          {errors.serviceType && (
            <p id="service-type-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.serviceType}
            </p>
          )}
        </fieldset>

        {/* Project Description */}
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-neutral-700 mb-2">
            Project Description *
            <span className="text-xs text-neutral-500 ml-1">
              ({formData.projectDescription.length}/500 characters)
            </span>
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            rows={4}
            maxLength={500}
            value={formData.projectDescription}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors resize-vertical text-base touch-manipulation ${
              errors.projectDescription ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="Please describe your project in detail... Include room dimensions, materials preferences, timeline, and any specific requirements."
            aria-describedby={errors.projectDescription ? 'project-description-error' : 'project-description-help'}
            aria-invalid={errors.projectDescription ? 'true' : 'false'}
          />
          <p id="project-description-help" className="mt-1 text-xs text-neutral-500">
            The more details you provide, the more accurate our estimate will be.
          </p>
          {errors.projectDescription && (
            <p id="project-description-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.projectDescription}
            </p>
          )}
        </div>

        {/* Preferred Contact Method */}
        <fieldset>
          <legend className="block text-sm font-medium text-neutral-700 mb-2">
            Preferred Contact Method *
          </legend>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6" role="radiogroup">
            <label className="flex items-center cursor-pointer hover:bg-neutral-50 p-3 sm:p-2 rounded touch-manipulation tap-target">
              <input
                type="radio"
                name="preferredContact"
                value="phone"
                checked={formData.preferredContact === 'phone'}
                onChange={handleInputChange}
                className="h-5 w-5 sm:h-4 sm:w-4 text-black focus:ring-black border-neutral-300 touch-manipulation"
                aria-describedby="phone-contact-desc"
              />
              <span className="ml-3 sm:ml-2 text-base sm:text-sm text-neutral-700">Phone Call</span>
              <span id="phone-contact-desc" className="sr-only">
                We'll call you during business hours
              </span>
            </label>
            <label className="flex items-center cursor-pointer hover:bg-neutral-50 p-3 sm:p-2 rounded touch-manipulation tap-target">
              <input
                type="radio"
                name="preferredContact"
                value="email"
                checked={formData.preferredContact === 'email'}
                onChange={handleInputChange}
                className="h-5 w-5 sm:h-4 sm:w-4 text-black focus:ring-black border-neutral-300 touch-manipulation"
                aria-describedby="email-contact-desc"
              />
              <span className="ml-3 sm:ml-2 text-base sm:text-sm text-neutral-700">Email</span>
              <span id="email-contact-desc" className="sr-only">
                We'll send you a detailed email response
              </span>
            </label>
          </div>
        </fieldset>

        {/* Timeline */}
        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-neutral-700 mb-2">
            Project Timeline *
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors text-base touch-manipulation"
          >
            {timelineOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Budget (Optional) */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-neutral-700 mb-2">
            Estimated Budget (Optional)
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget || ''}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors text-base touch-manipulation"
          >
            <option value="">Select budget range</option>
            {budgetOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white font-bold py-4 px-6 rounded-lg hover:bg-neutral-800 active:bg-neutral-900 focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation tap-target text-base sm:text-lg"
          aria-describedby="submit-help"
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
        <p id="submit-help" className="text-xs text-neutral-500 text-center mt-2">
          By submitting this form, you agree to be contacted about your project. No spam, ever.
        </p>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg" role="alert" aria-live="polite">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-green-800 font-medium">
                  Thank you for your request!
                </p>
                <p className="text-green-700 text-sm mt-1">
                  We'll contact you within 24 hours via {formData.preferredContact === 'phone' ? 'phone' : 'email'} to discuss your project and schedule a free estimate.
                </p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="assertive">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-red-800 font-medium">
                  Unable to send your request
                </p>
                <p className="text-red-700 text-sm mt-1">
                  Please try again, or contact us directly at{' '}
                  <a href="tel:(931) 446-9792" className="underline hover:no-underline">
                    (931) 446-9792
                  </a>{' '}
                  or{' '}
                  <a href="mailto:fullerresto@gmail.com" className="underline hover:no-underline">
                    fullerresto@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}