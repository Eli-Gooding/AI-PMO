import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="flex items-center border-r border-gray-800 pr-6 mr-6">
        <h1 className="text-4xl font-bold">404</h1>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">This page could not be found.</h2>
        <p className="text-gray-400 mb-4">The page you are looking for doesn't exist or has been moved.</p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors font-medium"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 