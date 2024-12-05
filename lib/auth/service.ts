import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase/types';
import { AUTH_CONFIG } from './config';

export type AuthError = {
  message: string;
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  confirmPassword: string;
}

export class AuthService {
  private supabase = createClientComponentClient<Database>();

  async login({ email, password }: LoginCredentials) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async signUp({ email, password }: LoginCredentials) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          email_confirmed: !AUTH_CONFIG.requireEmailConfirmation,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  async getSession() {
    const { data: { session }, error } = await this.supabase.auth.getSession();
    if (error) {
      throw new Error(error.message);
    }
    return session;
  }
}

export const authService = new AuthService();