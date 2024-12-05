import { useNavigation } from '@/lib/navigation/use-navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const { routes, isActiveRoute } = useNavigation();

  return (
    <nav className="space-y-1">
      {routes.map((route) => {
        const Icon = route.icon ? Icons[route.icon as keyof typeof Icons] : null;

        return (
          <div key={route.path}>
            <Link
              href={route.path}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md',
                isActiveRoute(route.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {Icon && <Icon className="mr-3 h-4 w-4" />}
              {route.label}
            </Link>

            {route.children && isActiveRoute(route.path) && (
              <div className="ml-4 mt-1 space-y-1">
                {route.children.map((child) => (
                  <Link
                    key={child.path}
                    href={child.path}
                    className={cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-md',
                      isActiveRoute(child.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}