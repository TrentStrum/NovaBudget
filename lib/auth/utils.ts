export function checkAuthRoute(pathname: string): boolean {
  return pathname.startsWith('/auth');
}