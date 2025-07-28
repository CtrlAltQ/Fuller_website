import { services } from '@/data/businessInfo'

const serviceIcons = {
  'home-renovation': (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  'custom-carpentry': (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  'decks-patios': (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  'fencing': (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  'windows-doors': (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  ),
}

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Professional Home Services in
            <span className="block text-primary-600 mt-2">Columbia, TN & Middle Tennessee</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            From complete home renovations to custom carpentry, we bring quality craftsmanship
            and personalized service to every project across Middle Tennessee.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-neutral-100 hover:border-primary-200 group">
              {/* Icon */}
              <div className="text-primary-600 mb-6 group-hover:text-primary-700 transition-colors duration-300 group-hover:scale-110 transform transition-transform">
                {serviceIcons[service.id as keyof typeof serviceIcons]}
              </div>

              {/* Service Title */}
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-neutral-600 mb-6 leading-relaxed text-lg">
                {service.shortDescription}
              </p>

              {/* Service Features */}
              <ul className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-neutral-700">
                    <svg className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Service Areas */}
              <div className="mb-6">
                <p className="text-xs text-neutral-500 mb-2">Service Areas:</p>
                <div className="flex flex-wrap gap-1">
                  {service.serviceAreas.slice(0, 2).map((areaId) => (
                    <span key={areaId} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                      {areaId === 'columbia-tn' ? 'Columbia' : 
                       areaId === 'williamson-county' ? 'Williamson Co.' :
                       areaId === 'davidson-county' ? 'Davidson Co.' :
                       areaId === 'hickman-county' ? 'Hickman Co.' :
                       areaId === 'maury-county' ? 'Maury Co.' :
                       areaId === 'marshall-county' ? 'Marshall Co.' :
                       areaId === 'giles-county' ? 'Giles Co.' :
                       'Lawrence Co.'}
                    </span>
                  ))}
                  {service.serviceAreas.length > 2 && (
                    <span className="text-xs text-neutral-500">+{service.serviceAreas.length - 2} more</span>
                  )}
                </div>
              </div>



              {/* Service info only - no links */}
              <div className="text-primary-600 font-semibold">
                Available Service
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-2xl p-12 text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h3>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get a free estimate for your home renovation or custom carpentry project.
            We serve Columbia, TN and all of Middle Tennessee with quality craftsmanship.
          </p>
          <div className="flex justify-center">
            <a
              href="tel:(931) 446-9792"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
            >
              Call (931) 446-9792
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}