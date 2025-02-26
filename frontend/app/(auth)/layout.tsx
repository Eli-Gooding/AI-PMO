import React from 'react';
import { ErrorBoundary } from '@/components/error-boundary';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black flex items-center justify-center">
        {children}
      </div>
    </ErrorBoundary>
  );
} 