'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error');
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
          <div className="w-full max-w-md p-8 rounded-lg bg-[#111] border border-gray-800">
            <h1 className="text-3xl font-bold text-center mb-2">Something went wrong</h1>
            <p className="text-gray-400 text-center mb-6">
              An unexpected error occurred.
            </p>
            
            <div className="mb-6 p-4 rounded bg-red-900/30 border border-red-800 text-red-400 text-sm">
              <p>{this.state.error?.message || 'Unknown error'}</p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
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

    return this.props.children;
  }
} 