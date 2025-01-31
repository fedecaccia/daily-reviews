'use client';

import { useRouter } from 'next/navigation';

export default function AuthError() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
      <p className="mb-4">You must use an authorized email address to access this application.</p>
      <p className="mb-8">Allowed emails: only fede emails</p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/api/auth/signin')}
          className="px-4 py-2 bg-[var(--button-success)] text-white rounded hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    </div>
  );
} 