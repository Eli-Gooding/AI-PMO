'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
          data: {
            name: name,
          },
        },
      });

      if (error) throw error;
      
      // Show success message or redirect
      router.push('/login?message=Check your email to confirm your account');
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'github' | 'google') => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
          queryParams: {
            ...(name ? { name } : {}),
          },
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message || `An error occurred during ${provider} sign in`);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md p-8 rounded-lg bg-[#111] border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-2">Create an account</h1>
        <p className="text-gray-400 text-center mb-6">Sign up to get started with AI-PMO</p>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => handleOAuthSignIn('github')}
            className="flex items-center justify-center gap-2 w-1/2 py-2 px-4 rounded bg-[#1a1a1a] hover:bg-[#222] transition-colors border border-gray-800"
            disabled={loading}
          >
            <FaGithub className="text-xl" />
            <span>GitHub</span>
          </button>
          <button
            onClick={() => handleOAuthSignIn('google')}
            className="flex items-center justify-center gap-2 w-1/2 py-2 px-4 rounded bg-[#1a1a1a] hover:bg-[#222] transition-colors border border-gray-800"
            disabled={loading}
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
        
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full p-3 rounded bg-[#0a0a0a] border border-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
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
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-[#0a0a0a] border border-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              minLength={6}
            />
            <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 rounded bg-red-900/30 border border-red-800 text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 rounded bg-green-600 hover:bg-green-700 transition-colors font-medium"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-green-500 hover:text-green-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
} 