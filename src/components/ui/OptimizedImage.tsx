'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { createImageObserver } from '@/utils/performance'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return

    const observer = createImageObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer?.unobserve(entry.target)
        }
      })
    })

    if (observer && imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [priority, isInView])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Generate blur placeholder if not provided
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#f3f4f6'
      ctx.fillRect(0, 0, w, h)
    }
    return canvas.toDataURL()
  }

  const defaultBlurDataURL = blurDataURL || (width && height ? generateBlurDataURL(width, height) : undefined)

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={!fill && width && height ? { width, height } : undefined}
    >
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse ${fill ? 'w-full h-full' : ''}`}
          style={!fill && width && height ? { width, height } : undefined}
        >
          <div className="flex items-center justify-center h-full">
            <svg 
              className="w-8 h-8 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div 
          className={`absolute inset-0 bg-gray-100 flex items-center justify-center ${fill ? 'w-full h-full' : ''}`}
          style={!fill && width && height ? { width, height } : undefined}
        >
          <div className="text-center text-gray-500">
            <svg 
              className="w-8 h-8 mx-auto mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <p className="text-xs">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Actual image - only render when in view or priority */}
      {(isInView || priority) && !hasError && (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          priority={priority}
          quality={quality}
          sizes={sizes}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  )
}