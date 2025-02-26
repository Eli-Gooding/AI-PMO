'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're not loading and there's no user
    if (!isLoading && !user) {
      console.log('ProtectedRoute - No user found, redirecting to login');
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <div className="w-full max-w-md p-8 rounded-lg bg-[#111] border border-gray-800">
          <h1 className="text-3xl font-bold text-center mb-2">Authentication Error</h1>
          <p className="text-gray-400 text-center mb-6">
            There was a problem with authentication.
          </p>
          
          <div className="mb-6 p-4 rounded bg-red-900/30 border border-red-800 text-red-400 text-sm">
            <p>{error.message || 'Unknown error'}</p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-3 rounded bg-green-600 hover:bg-green-700 transition-colors font-medium"
            >
              Try again
            </button>
            
            <Link
              href="/login"
              className="flex-1 py-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors font-medium text-center"
            >
              Go to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state only if we're still checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // If we have a user, render the protected content
  if (user) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
} 