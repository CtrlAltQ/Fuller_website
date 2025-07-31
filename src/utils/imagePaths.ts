/**
 * Utility to handle image paths for GitHub Pages deployment
 * In production, GitHub Pages serves from /Fuller_website/ subdirectory
 */
export function getImagePath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    // In development, serve from root
    return `/${cleanPath}`;
  } else {
    // In production build, add GitHub Pages prefix
    return `/Fuller_website/${cleanPath}`;
  }
}
