'use client';

import { Button } from '@/components/ui/button';
import { Github, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function SocialAuthButtons() {
  const { toast } = useToast();

  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in with GitHub',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        onClick={handleGithubLogin}
        className="w-full"
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
      <Button
        variant="outline"
        onClick={() => {}}
        className="w-full"
      >
        <Mail className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}