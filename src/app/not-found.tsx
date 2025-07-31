import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="mb-4">
          <h1 className="text-6xl font-bold text-gray-300">404</h1>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}