'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type RegisterFormData } from '@/schemas/user';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { useState, useRef, useEffect } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useUserStore(state => state.setUser);
  const [serverError, setServerError] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema)
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
      spotlight.style.background = `radial-gradient(circle 250px at ${x}px ${y}px, rgba(20,184,166,0.08), transparent 70%)`;
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      spotlight.remove();
    };
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    setServerError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        setUser(result.user);
        router.push('/profile');
      } else {
        setServerError(result.error || 'Failed to register');
      }
    } catch {
      setServerError('An unexpected error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center flex-1 px-4">
      <div ref={cardRef} className="bento-card w-full max-w-lg p-6 md:p-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[rgba(20,184,166,0.1)] flex items-center justify-center border border-[rgba(20,184,166,0.15)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="section-tag justify-center mb-2">
          <span>Begin Your Journey</span>
        </div>
        <h2 className="section-title text-center text-2xl md:text-3xl mb-8">
          Create <em>Account</em>
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
            <label className="form-label" htmlFor="reg-name">Full Name</label>
            <input id="reg-name" type="text" {...register('name')} className="form-input" placeholder="Your full name" />
            {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
          </div>
          <div>
            <label className="form-label" htmlFor="reg-username">Username</label>
            <input id="reg-username" type="text" {...register('username')} className="form-input" placeholder="Choose a username" />
            {errors.username && <p className="text-red-400 text-xs mt-1.5">{errors.username.message}</p>}
          </div>
          <div>
            <label className="form-label" htmlFor="reg-password">Password</label>
            <input id="reg-password" type="password" {...register('password')} className="form-input" placeholder="••••••••" />
            {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-grid-2">
            <div>
              <label className="form-label" htmlFor="reg-birthdate">Birth Date (Optional)</label>
              <input id="reg-birthdate" type="date" {...register('birthDate')} className="form-input" />
              {errors.birthDate && <p className="text-red-400 text-xs mt-1.5">{errors.birthDate.message}</p>}
            </div>
            <div>
              <label className="form-label" htmlFor="reg-birthtime">Birth Time (Optional)</label>
              <input id="reg-birthtime" type="time" {...register('birthTime')} className="form-input" />
              {errors.birthTime && <p className="text-red-400 text-xs mt-1.5">{errors.birthTime.message}</p>}
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-2">
            {isSubmitting ? 'Creating...' : 'Register'}
          </button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm mt-8" style={{ color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <a href="/login" className="text-teal hover:text-accent transition-colors underline decoration-teal/30 underline-offset-4">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
