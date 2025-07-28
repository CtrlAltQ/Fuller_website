'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { featuredProjects } from '@/data/projects'

// Transform featured projects for slider display
const sliderProjects = featuredProjects.map(project => ({
  id: project.id,
  src: project.images.featured,
  alt: project.title,
  title: project.title,
  category: project.tags[0]?.replace(/^\w/, c => c.toUpperCase()) || 'Home Improvement',
  description: project.description.split('.')[0] + '.',
  serviceType: project.serviceType
}))

export default function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-advance slider every 5 seconds (slightly longer to allow reading metadata)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === sliderProjects.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? sliderProjects.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === sliderProjects.length - 1 ? 0 : currentIndex + 1)
  }

  const currentProject = sliderProjects[currentIndex]

  return (
    <div className="relative w-full h-96 bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
      {/* Main Image */}
      <div className="relative w-full h-full">
        <Image
          key={currentIndex}
          src={currentProject.src}
          alt={currentProject.alt}
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Enhanced Project Info Overlay - Clickable */}
        <Link href={`/projects/${currentProject.id}`} className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 hover:from-black/90 transition-all duration-300 cursor-pointer group">
          <div className="text-white">
            {/* Project Category Badge */}
            <div className="mb-2">
              <span className="inline-block bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full group-hover:bg-primary-500 transition-colors duration-300">
                {currentProject.category}
              </span>
            </div>
            
            {/* Project Title */}
            <h3 className="text-lg font-bold mb-1 group-hover:text-yellow-300 transition-colors duration-300">
              {currentProject.title}
            </h3>
            
            {/* Project Description */}
            <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 mb-3">
              {currentProject.description}
            </p>
            
            {/* View Project Indicator */}
            <div className="flex items-center mt-3 text-xs text-primary-300 group-hover:text-primary-200 transition-colors duration-300">
              <span>Click to view project details</span>
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {sliderProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {sliderProjects.length}
      </div>
    </div>
  )
}