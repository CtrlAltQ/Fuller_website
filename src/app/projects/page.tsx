'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ImageModal from '@/components/ui/ImageModal'
import { businessInfo, services } from '@/data/businessInfo'
import { fullerProjects, projectCategories } from '@/data/projects'

export default function ProjectsPage() {
  const [selectedService, setSelectedService] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let filtered = fullerProjects.filter(project => {
      // Service type filter
      if (selectedService !== 'all' && project.serviceType !== selectedService) {
        return false
      }

      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }

      return true
    })

    return filtered
  }, [selectedService, searchQuery])

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Explore our completed projects across Middle Tennessee. From custom carpentry 
              to complete home renovations, see the quality craftsmanship that sets us apart.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-neutral-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Service Filter */}
            <div className="flex flex-wrap gap-2">
              {projectCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedService(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedService === category.id
                      ? 'bg-black text-white'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-neutral-600">No projects found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map(project => (
                <div key={project.id} className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                  <ImageModal src={project.images.featured} alt={project.title}>
                    <div className="relative overflow-hidden cursor-pointer">
                      <Image
                        src={project.images.featured}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Click indicator */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                        <div className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
                          Click to enlarge
                        </div>
                      </div>
                    </div>
                  </ImageModal>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Let's discuss your vision and create something beautiful together. 
            Contact us today for your free estimate.
          </p>
          <div className="flex justify-center">
            <a
              href={`tel:${businessInfo.phone}`}
              className="btn-call inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call {businessInfo.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}