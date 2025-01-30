'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[var(--text-primary)]"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--text-primary)]">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">Please sign in with an authorized Google account.</p>
        <button
          onClick={() => router.push('/api/auth/signin')}
          className="px-4 py-2 bg-[var(--button-success)] text-white rounded hover:opacity-90 transition-opacity"
        >
          Sign In with Google
        </button>
      </div>
    );
  }

  return <>{children}</>;
};