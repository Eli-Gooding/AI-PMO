'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error occurred');
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md p-8 rounded-lg bg-[#111] border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-2">Something went wrong</h1>
        <p className="text-gray-400 text-center mb-6">
          An error occurred while loading this page.
        </p>
        
        <div className="mb-6 p-4 rounded bg-red-900/30 border border-red-800 text-red-400 text-sm">
          <p>{error.message || 'Unknown error'}</p>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="flex-1 py-3 rounded bg-green-600 hover:bg-green-700 transition-colors font-medium"
          >
            Try again
          </button>
          
          <Link
            href="/"
            className="flex-1 py-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors font-medium text-center"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
} 