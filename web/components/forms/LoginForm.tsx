'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginFormData } from '@/schemas/user';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function LoginForm() {
  const router = useRouter();
  const setUser = useUserStore(state => state.setUser);
  const login = useUserStore(state => state.login);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError('');
    try {
      await login(data);
      router.push('/profile');
      router.refresh();
    } catch (error: any) {
      setServerError(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <>
      {/* Error */}
      {serverError && (
        <div className="text-red-400 text-center mb-6 text-sm bg-red-400/10 px-4 py-3 rounded-xl border border-red-400/20">
          {serverError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="login-username" className="text-xs uppercase tracking-widest text-slate-400">Username</Label>
          <Input
            id="login-username"
            type="text"
            {...register('username')}
            className="bg-white/5 border-white/10 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 h-12"
            placeholder="Enter username"
          />
          {errors.username && <p className="text-rose-400 text-xs mt-1.5">{errors.username.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password" className="text-xs uppercase tracking-widest text-slate-400">Password</Label>
          <Input
            id="login-password"
            type="password"
            {...register('password')}
            className="bg-white/5 border-white/10 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 h-12"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-rose-400 text-xs mt-1.5">{errors.password.message}</p>}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 h-12 bg-blue-500/20 text-blue-100 hover:bg-blue-500/40 border border-blue-400/30 rounded-full font-semibold uppercase tracking-widest text-xs transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.3)]"
        >
          {isSubmitting ? 'Authenticating...' : 'Enter Celestial Engine'}
        </Button>
      </form>
    </>
  );
}
