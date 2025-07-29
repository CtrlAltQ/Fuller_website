/**
 * Utility to handle image paths for GitHub Pages deployment
 * In production, GitHub Pages serves from /Fuller_website/ subdirectory
 */
export function getImagePath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production build, add GitHub Pages prefix
  // The basePath from next.config.js doesn't affect public folder images
  return `/Fuller_website/${cleanPath}`;
}
