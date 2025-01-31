'use client';

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && !pathname.startsWith('/auth')) {
      router.push('/auth/signin');
    } else if (status === "authenticated" && pathname.startsWith('/auth')) {
      router.push('/');
    }
  }, [status, pathname, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--text-primary)]"></div>
      </div>
    );
  }

  // Si estamos en una página de autenticación y no estamos autenticados, o
  // si no estamos en una página de autenticación y estamos autenticados,
  // mostramos el contenido
  if (
    (pathname.startsWith('/auth') && status === "unauthenticated") ||
    (!pathname.startsWith('/auth') && status === "authenticated")
  ) {
    return <>{children}</>;
  }

  // En cualquier otro caso, mostramos el spinner mientras se realiza la redirección
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--text-primary)]"></div>
    </div>
  );
};