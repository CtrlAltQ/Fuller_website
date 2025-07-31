/**
 * Performance optimization utilities for mobile and web
 */

// Lazy loading intersection observer for images
export const createImageObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (typeof window === 'undefined') return null
  
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  })
}

// Debounce function for performance-sensitive operations
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for scroll and resize events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Check if device supports touch
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return 'ontouchstart' in window || 
         navigator.maxTouchPoints > 0 || 
         (navigator as any).msMaxTouchPoints > 0
}

// Get device pixel ratio for high-DPI displays
export const getDevicePixelRatio = (): number => {
  if (typeof window === 'undefined') return 1
  return window.devicePixelRatio || 1
}

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Get optimal image size based on container and device
export const getOptimalImageSize = (
  containerWidth: number,
  containerHeight: number,
  maxWidth: number = 1920
): { width: number; height: number } => {
  const dpr = getDevicePixelRatio()
  const scaledWidth = Math.min(containerWidth * dpr, maxWidth)
  const scaledHeight = containerHeight * dpr
  
  return {
    width: Math.round(scaledWidth),
    height: Math.round(scaledHeight)
  }
}

// Measure Core Web Vitals
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return
  
  // Largest Contentful Paint
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    console.log('LCP:', lastEntry.startTime)
  })
  
  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] })
  } catch (e) {
    // Fallback for browsers that don't support LCP
    console.log('LCP measurement not supported')
  }
  
  // First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry: any) => {
      if (entry.processingStart) {
        console.log('FID:', entry.processingStart - entry.startTime)
      }
    })
  })
  
  try {
    fidObserver.observe({ entryTypes: ['first-input'] })
  } catch (e) {
    // Fallback for browsers that don't support FID
    console.log('FID measurement not supported')
  }
}

// Optimize scroll performance
export const optimizeScroll = () => {
  if (typeof window === 'undefined') return
  
  let ticking = false
  
  const updateScrollPosition = () => {
    // Update scroll-dependent elements here
    ticking = false
  }
  
  const requestScrollUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition)
      ticking = true
    }
  }
  
  window.addEventListener('scroll', requestScrollUpdate, { passive: true })
  
  return () => {
    window.removeEventListener('scroll', requestScrollUpdate)
  }
}

// Memory usage monitoring (development only)
export const monitorMemoryUsage = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return
  
  const memory = (performance as any).memory
  if (memory) {
    console.log('Memory Usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
    })
  }
}

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return
  
  try {
    const registration = await navigator.serviceWorker.register('/sw.js')
    console.log('Service Worker registered:', registration)
    return registration
  } catch (error) {
    console.log('Service Worker registration failed:', error)
  }
}