import { useRouter, usePathname } from 'next/navigation';
import { useSubscription } from '@/hooks/use-subscription';
import { APP_ROUTES, type AppRoute } from './routes';

export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { subscription } = useSubscription();

  const canAccessRoute = (route: AppRoute): boolean => {
    if (!route.requiredTier) return true;
    if (!subscription) return false;

    const tiers = ['basic', 'pro', 'enterprise'];
    const userTierIndex = tiers.indexOf(subscription.tier);
    const requiredTierIndex = tiers.indexOf(route.requiredTier);

    return userTierIndex >= requiredTierIndex;
  };

  const isActiveRoute = (path: string): boolean => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const getAccessibleRoutes = (): AppRoute[] => {
    return APP_ROUTES.map(route => ({
      ...route,
      children: route.children?.filter(canAccessRoute),
    })).filter(route => !route.requiredTier || canAccessRoute(route));
  };

  const navigate = (path: string) => {
    const route = [...APP_ROUTES, ...APP_ROUTES.flatMap(r => r.children || [])]
      .find(r => r.path === path);

    if (!route || canAccessRoute(route)) {
      router.push(path);
    }
  };

  return {
    routes: getAccessibleRoutes(),
    isActiveRoute,
    navigate,
    canAccessRoute,
  };
}