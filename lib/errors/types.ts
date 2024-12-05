export interface AppError extends Error {
  code?: string;
  status?: number;
  data?: unknown;
}

export type ErrorHandler = (error: AppError) => void;

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  onError?: ErrorHandler;
}