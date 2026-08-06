'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginFormData } from '@/schemas/user';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { useState, useRef, useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useUserStore(state => state.setUser);
  const [serverError, setServerError] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema)
  });

  // Mouse-follow spotlight
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const spotlight = document.createElement('div');
    spotlight.classList.add('bento-card-spotlight');
    card.appendChild(spotlight);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.background = `radial-gradient(circle 250px at ${x}px ${y}px, rgba(14,165,233,0.08), transparent 70%)`;
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      spotlight.remove();
    };
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setServerError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        setUser(result.user);
        router.push('/profile');
      } else {
        setServerError(result.error || 'Failed to login');
      }
    } catch {
      setServerError('An unexpected error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center flex-1 px-4">
      <div ref={cardRef} className="bento-card w-full max-w-md p-6 md:p-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[rgba(14,165,233,0.1)] flex items-center justify-center border border-[rgba(14,165,233,0.15)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="section-tag justify-center mb-2">
          <span>Welcome Back</span>
        </div>
        <h2 className="section-title text-center text-2xl md:text-3xl mb-8">
          Sign <em>In</em>
        </h2>

        {/* Error */}
        {serverError && (
          <div className="text-red-400 text-center mb-6 text-sm bg-red-400/10 px-4 py-3 rounded-xl border border-red-400/20">
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="form-label" htmlFor="login-username">Username</label>
            <input id="login-username" type="text" {...register('username')} className="form-input" placeholder="Enter username" />
            {errors.username && <p className="text-red-400 text-xs mt-1.5">{errors.username.message}</p>}
          </div>
          <div>
            <label className="form-label" htmlFor="login-password">Password</label>
            <input id="login-password" type="password" {...register('password')} className="form-input" placeholder="••••••••" />
            {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-2">
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm mt-8" style={{ color: 'var(--text-muted)' }}>
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-accent hover:text-teal transition-colors underline decoration-accent/30 underline-offset-4">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
