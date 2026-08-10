'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileUpdateSchema, type ProfileUpdateFormData } from '@/schemas/user';
import { useUserStore } from '@/stores/useUserStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';

interface UserData {
  id: number;
  name: string;
  username: string;
  birthDate?: string | null;
  birthTime?: string | null;
}

export default function ProfileForm({ initialUser }: { initialUser: UserData }) {
  const router = useRouter();
  const updateProfile = useUserStore(state => state.updateProfile);
  const logout = useUserStore(state => state.logout);
  const [message, setMessage] = useState('');

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      name: initialUser.name,
      birthDate: initialUser.birthDate || '',
      birthTime: initialUser.birthTime || ''
    }
  });

  const birthDate = watch('birthDate');

  const handleLogout = () => {
    document.cookie = "bazi-auth-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    logout();
    router.push('/login');
  };

  const onSubmit = async (data: ProfileUpdateFormData) => {
    setMessage('');
    try {
      await updateProfile(data);
      setMessage('Profile updated successfully.');
    } catch (error: any) {
      setMessage(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <>
      {/* Message */}
      {message && (
        <div className="text-cyan-400 text-center mb-6 text-sm bg-cyan-400/10 px-4 py-3 rounded-xl border border-cyan-400/20">
          {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="prof-username" className="text-xs uppercase tracking-widest text-slate-400">Username</Label>
          <Input
            id="prof-username"
            type="text"
            value={initialUser.username}
            disabled
            className="bg-black/20 border-white/10 text-white/50 cursor-not-allowed h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prof-name" className="text-xs uppercase tracking-widest text-slate-400">Full Name</Label>
          <Input
            id="prof-name"
            type="text"
            {...register('name', {
              onChange: (e) => {
                e.target.value = e.target.value.toUpperCase();
              }
            })}
            className="bg-white/5 border-white/10 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 h-12"
          />
          {errors.name && <p className="text-rose-400 text-xs mt-1.5">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-grid-2">
          <div className="space-y-2 flex flex-col">
            <Label htmlFor="prof-birthdate" className="text-xs uppercase tracking-widest text-slate-400">Birth Date</Label>
            <DatePicker
              date={birthDate ? new Date(birthDate) : undefined}
              onSelect={(date) => {
                // Update form value
                setValue('birthDate', date ? format(date, 'yyyy-MM-dd') : '', {
                  shouldValidate: true,
                  shouldDirty: true
                });
              }}
              placeholder="Pick a date"
            />
            <input type="hidden" {...register('birthDate')} />
            {errors.birthDate && <p className="text-rose-400 text-xs mt-1.5">{errors.birthDate.message}</p>}
          </div>

          <div className="space-y-2 flex flex-col">
            <Label htmlFor="prof-birthtime" className="text-xs uppercase tracking-widest text-slate-400">Birth Time</Label>
            <div className="relative">
              <Input
                id="prof-birthtime"
                type="time"
                {...register('birthTime')}
                className="bg-white/5 border-white/10 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 h-12 w-full [color-scheme:dark]"
              />
            </div>
            {errors.birthTime && <p className="text-rose-400 text-xs mt-1.5">{errors.birthTime.message}</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 p-4 h-12 bg-blue-500/20 text-blue-100 hover:bg-blue-500/40 border border-blue-400/30 rounded-full font-semibold uppercase tracking-widest text-xs transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.3)]"
          >
            {isSubmitting ? 'Saving...' : 'Update Profile'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
            className="sm:flex-none p-2 h-12 bg-white/5 border-white/10 text-slate-300 hover:bg-rose-500/10 hover:text-rose-200 hover:border-slate-500/30 rounded-full font-semibold uppercase tracking-widest text-xs transition-all"
          >
            Logout
          </Button>
        </div>
      </form>
    </>
  );
}
