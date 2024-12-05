import { ReactNode } from 'react';

interface AuthFormWrapperProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthFormWrapper({ children, title, subtitle }: AuthFormWrapperProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}