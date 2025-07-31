'use client'

import { useEffect } from 'react'
import { measureWebVitals, monitorMemoryUsage } from '@/utils/performance'

export default function PerformanceMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Measure Core Web Vitals
      measureWebVitals()
      
      // Monitor memory usage every 30 seconds
      const memoryInterval = setInterval(monitorMemoryUsage, 30000)
      
      // Log performance metrics
      const logPerformance = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigation) {
          console.log('Performance Metrics:', {
            'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
            'TCP Connection': navigation.connectEnd - navigation.connectStart,
            'Request': navigation.responseStart - navigation.requestStart,
            'Response': navigation.responseEnd - navigation.responseStart,
            'DOM Processing': navigation.domComplete - navigation.domContentLoadedEventStart,
            'Total Load Time': navigation.loadEventEnd - navigation.fetchStart
          })
        }
      }
      
      // Log performance after page load
      if (document.readyState === 'complete') {
        logPerformance()
      } else {
        window.addEventListener('load', logPerformance)
      }
      
      return () => {
        clearInterval(memoryInterval)
        window.removeEventListener('load', logPerformance)
      }
    }
  }, [])

  // This component doesn't render anything
  return null
}