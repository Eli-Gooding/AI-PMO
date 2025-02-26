'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for message in URL parameters
    const message = searchParams?.get('message');
    if (message) {
      setSuccessMessage(message);
    }
  }, [searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Make sure we have a session
      if (data?.session) {
        // Force a hard redirect to ensure the session is picked up
        window.location.href = '/';
      } else {
        throw new Error('No session established after login');
      }
    } catch (error: any) {
      console.error('Authentication error occurred');
      setError(error.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'github' | 'google') => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error(`OAuth sign in error occurred`);
      setError(error.message || `An error occurred during ${provider} sign in`);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md p-8 rounded-lg bg-[#111] border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome back</h1>
        <p className="text-gray-400 text-center mb-6">Enter your credentials to sign in to your account</p>
        
        {successMessage && (
          <div className="mb-6 p-4 rounded bg-green-900/30 border border-green-800 text-green-400">
            <p>{successMessage}</p>
          </div>
        )}
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => handleOAuthSignIn('github')}
            className="flex items-center justify-center gap-2 w-1/2 py-2 px-4 rounded bg-[#1a1a1a] hover:bg-[#222] transition-colors border border-gray-800"
            disabled={loading}
            type="button"
          >
            <FaGithub className="text-xl" />
            <span>GitHub</span>
          </button>
          <button
            onClick={() => handleOAuthSignIn('google')}
            className="flex items-center justify-center gap-2 w-1/2 py-2 px-4 rounded bg-[#1a1a1a] hover:bg-[#222] transition-colors border border-gray-800"
            disabled={loading}
            type="button"
          >
            <FcGoogle className="text-xl" />
            <span>Google</span>
          </button>
        </div>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#111] text-gray-500">OR CONTINUE WITH</span>
          </div>
        </div>
        
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full p-3 rounded bg-[#0a0a0a] border border-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <Link href="/forgot-password" className="text-sm text-green-500 hover:text-green-400">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-[#0a0a0a] border border-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 rounded bg-red-900/30 border border-red-800 text-red-400 text-sm">
              <p>{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 rounded bg-green-600 hover:bg-green-700 transition-colors font-medium"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-green-500 hover:text-green-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
} 