'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { featuredProjects } from '@/data/projects'
import { getImagePath } from '@/utils/imagePaths'

// Transform featured projects for slider display with enhanced metadata
const sliderProjects = featuredProjects.map(project => {
  // Create category badge from service type
  const categoryMap: { [key: string]: string } = {
    'home-renovation': 'Home Renovation',
    'custom-carpentry': 'Custom Carpentry',
    'decks-patios': 'Decks & Patios',
    'windows-doors': 'Windows & Doors',
    'fencing': 'Fencing'
  }
  
  return {
    id: project.id,
    src: getImagePath(project.images.featured),
    alt: project.title,
    title: project.title,
    category: categoryMap[project.serviceType] || 'Home Improvement',
    description: project.description,
    location: `${project.location.city}, ${project.location.state}`,
    serviceType: project.serviceType
  }
})

export default function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  // Auto-advance slider every 5 seconds (slightly longer to allow reading metadata)
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === sliderProjects.length - 1 ? 0 : prevIndex + 1
        )
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex(currentIndex === 0 ? sliderProjects.length - 1 : currentIndex - 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [currentIndex])

  const goToNext = useCallback(() => {
    setCurrentIndex(currentIndex === sliderProjects.length - 1 ? 0 : currentIndex + 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [currentIndex])

  // Touch event handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsAutoPlaying(false)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
    
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  const currentProject = sliderProjects[currentIndex]

  return (
    <div 
      ref={sliderRef}
      className="relative w-full h-80 sm:h-96 bg-gray-900 rounded-lg overflow-hidden shadow-2xl touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Project showcase slider"
      aria-live="polite"
    >
      {/* Main Image */}
      <div className="relative w-full h-full">
        <Image
          key={currentIndex}
          src={currentProject.src}
          alt={currentProject.alt}
          fill
          className="object-cover transition-opacity duration-300"
          priority={currentIndex === 0}
          loading={currentIndex === 0 ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Project Category Badge - Top Left */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
          <span className="bg-primary-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg">
            {currentProject.category}
          </span>
        </div>

        {/* Location Tag - Top Right */}
        <div className="absolute top-2 sm:top-4 right-12 sm:right-16 z-10">
          <div className="flex items-center bg-black bg-opacity-60 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm shadow-lg">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">{currentProject.location}</span>
            <span className="sm:hidden">{currentProject.location.split(',')[0]}</span>
          </div>
        </div>

        {/* Enhanced Project Info Overlay - Clickable */}
        <Link 
          href="/projects" 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-6 hover:from-black/90 transition-all duration-300 cursor-pointer group touch-manipulation"
          aria-label="View all projects"
        >
          <div className="text-white">
            {/* Project Title */}
            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 group-hover:text-yellow-300 transition-colors duration-300 line-clamp-1">
              {currentProject.title}
            </h3>
            
            {/* Project Description - Hidden on very small screens */}
            <p className="hidden sm:block text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 mb-3 line-clamp-2">
              {currentProject.description}
            </p>
            
            {/* Fuller Restoration Brand & View Project Indicator */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 bg-white bg-opacity-10 px-2 py-1 rounded hidden sm:inline">
                Fuller Restoration & Renovation
              </span>
              <div className="flex items-center text-xs sm:text-sm text-primary-300 group-hover:text-primary-200 transition-colors duration-300 ml-auto sm:ml-0">
                <span>View All Projects</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Arrows - Enhanced for mobile */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 active:bg-opacity-90 text-white p-2 sm:p-3 rounded-full transition-all duration-200 touch-manipulation z-10"
        aria-label="Previous project image"
        type="button"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 active:bg-opacity-90 text-white p-2 sm:p-3 rounded-full transition-all duration-200 touch-manipulation z-10"
        aria-label="Next project image"
        type="button"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator - Enhanced for mobile */}
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex space-x-1 sm:space-x-2 z-10">
        {sliderProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 touch-manipulation ${
              index === currentIndex 
                ? 'bg-white scale-110' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75 active:bg-opacity-90'
            }`}
            aria-label={`Go to project ${index + 1} of ${sliderProjects.length}`}
            type="button"
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black bg-opacity-50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm z-10">
        {currentIndex + 1} / {sliderProjects.length}
      </div>

      {/* Swipe Indicator for Mobile - Shows briefly on first load */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 sm:hidden">
        <div className="flex items-center space-x-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs animate-pulse">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Swipe</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  )
}