'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileUpdateSchema, type ProfileUpdateFormData } from '@/schemas/user';
import { useUserStore } from '@/stores/useUserStore';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, setUser, isLoading, setLoading, logout } = useUserStore();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(ProfileUpdateSchema)
  });

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/user');
        if (res.ok) {
          const result = await res.json();
          setUser(result.user);
          reset({
            name: result.user.name,
            birthDate: result.user.birthDate || '',
            birthTime: result.user.birthTime || ''
          });
        } else {
          router.push('/login');
        }
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser, setLoading, router, reset]);

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
      spotlight.style.background = `radial-gradient(circle 250px at ${x}px ${y}px, rgba(14,165,233,0.06), transparent 70%)`;
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      spotlight.remove();
    };
  }, []);

  const handleLogout = () => {
    document.cookie = "bazi-auth-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    logout();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1 px-4">
        <div className="bento-card w-full max-w-lg p-6 md:p-10 animate-pulse">
          {/* Skeleton loader matching form shape */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[rgba(14,165,233,0.05)]" />
          </div>
          <div className="h-4 w-32 mx-auto bg-[rgba(138,180,200,0.1)] rounded mb-4" />
          <div className="h-8 w-48 mx-auto bg-[rgba(138,180,200,0.1)] rounded mb-10" />
          <div className="space-y-5">
            <div>
              <div className="h-3 w-20 bg-[rgba(138,180,200,0.1)] rounded mb-2" />
              <div className="h-11 bg-[rgba(6,14,26,0.4)] rounded-xl border border-[rgba(100,200,255,0.08)]" />
            </div>
            <div>
              <div className="h-3 w-24 bg-[rgba(138,180,200,0.1)] rounded mb-2" />
              <div className="h-11 bg-[rgba(6,14,26,0.4)] rounded-xl border border-[rgba(100,200,255,0.08)]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="h-3 w-20 bg-[rgba(138,180,200,0.1)] rounded mb-2" />
                <div className="h-11 bg-[rgba(6,14,26,0.4)] rounded-xl border border-[rgba(100,200,255,0.08)]" />
              </div>
              <div>
                <div className="h-3 w-20 bg-[rgba(138,180,200,0.1)] rounded mb-2" />
                <div className="h-11 bg-[rgba(6,14,26,0.4)] rounded-xl border border-[rgba(100,200,255,0.08)]" />
              </div>
            </div>
            <div className="h-11 bg-[rgba(100,200,255,0.06)] rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-1 px-4">
      <div ref={cardRef} className="bento-card w-full max-w-lg p-6 md:p-10">
        {/* Heading */}
        <div className="section-tag justify-center mb-2">
          <span>Your Destiny Data</span>
        </div>
        <h2 className="section-title text-center text-2xl md:text-3xl mb-2">
          Your <em>Profile</em>
        </h2>
        <p className="text-center text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          Update your BaZi data to calculate your destiny accurately.
        </p>

        {/* Message */}
        {message && (
          <div className="text-teal text-center mb-6 text-sm bg-teal/10 px-4 py-3 rounded-xl border border-teal/20">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(async (data) => {
          setMessage('');
          try {
            const res = await fetch('/api/user', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            const result = await res.json();
            if (res.ok) {
              setUser(result.user);
              setMessage('Profile updated successfully.');
            } else {
              setMessage(result.error || 'Failed to update profile.');
            }
          } catch {
            setMessage('An unexpected error occurred.');
          }
        })} className="space-y-5">
          <div>
            <label className="form-label">Username</label>
            <input type="text" value={user?.username || ''} disabled className="form-input opacity-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="form-label" htmlFor="prof-name">Full Name</label>
            <input id="prof-name" type="text" {...register('name')} className="form-input" />
            {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-grid-2">
            <div>
              <label className="form-label" htmlFor="prof-birthdate">Birth Date</label>
              <input id="prof-birthdate" type="date" {...register('birthDate')} className="form-input" />
              {errors.birthDate && <p className="text-red-400 text-xs mt-1.5">{errors.birthDate.message}</p>}
            </div>
            <div>
              <label className="form-label" htmlFor="prof-birthtime">Birth Time</label>
              <input id="prof-birthtime" type="time" {...register('birthTime')} className="form-input" />
              {errors.birthTime && <p className="text-red-400 text-xs mt-1.5">{errors.birthTime.message}</p>}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
              {isSubmitting ? 'Saving...' : 'Update Profile'}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="btn-primary sm:flex-none sm:px-6"
              style={{ borderColor: 'rgba(239,68,68,0.3)', color: 'rgba(248,113,113,1)' }}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
