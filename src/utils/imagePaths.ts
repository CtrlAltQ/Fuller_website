/**
 * Utility to handle image paths for both local development and GitHub Pages
 */
export function getImagePath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production (GitHub Pages), add the base path
  if (process.env.NODE_ENV === 'production') {
    return `/Fuller_website/${cleanPath}`;
  }
  
  // In development, use the path as-is with leading slash
  return `/${cleanPath}`;
}
