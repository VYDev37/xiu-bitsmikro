'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type RegisterFormData } from '@/schemas/user';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';

export default function RegisterForm() {
  const router = useRouter();
  const registerUser = useUserStore(state => state.register);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema)
  });

  const birthDate = watch('birthDate');

  const onSubmit = async (data: RegisterFormData) => {
    setServerError('');
    try {
      await registerUser(data);
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
          <Label htmlFor="reg-name" className="text-xs uppercase tracking-widest text-slate-400">Full Name</Label>
          <Input
            id="reg-name"
            type="text"
            {...register('name', {
              onChange: (e) => {
                e.target.value = e.target.value.toUpperCase();
              }
            })}
            className="bg-white/5 border-white/10 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 h-12"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-rose-400 text-xs mt-1.5">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-username" className="text-xs uppercase tracking-widest text-slate-400">Username</Label>
          <Input
            id="reg-username"
            type="text"
            {...register('username')}
            className="bg-white/5 border-white/10 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 h-12"
            placeholder="Choose a username"
          />
          {errors.username && <p className="text-rose-400 text-xs mt-1.5">{errors.username.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-password" className="text-xs uppercase tracking-widest text-slate-400">Password</Label>
          <Input
            id="reg-password"
            type="password"
            {...register('password')}
            className="bg-white/5 border-white/10 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 h-12"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-rose-400 text-xs mt-1.5">{errors.password.message}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-grid-2">
          <div className="space-y-2 flex flex-col">
            <Label htmlFor="reg-birthdate" className="text-xs uppercase tracking-widest text-slate-400">Birth Date (Optional)</Label>
            <DatePicker
              date={birthDate ? new Date(birthDate) : undefined}
              onSelect={(date) => {
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
            <Label htmlFor="reg-birthtime" className="text-xs uppercase tracking-widest text-slate-400">Birth Time (Optional)</Label>
            <Input
              id="reg-birthtime"
              type="time"
              {...register('birthTime')}
              className="bg-white/5 border-white/10 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 h-12 w-full [color-scheme:dark]"
            />
            {errors.birthTime && <p className="text-rose-400 text-xs mt-1.5">{errors.birthTime.message}</p>}
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 h-12 bg-blue-500/20 text-blue-100 hover:bg-blue-500/40 border border-blue-400/30 rounded-full font-semibold uppercase tracking-widest text-xs transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.3)]"
        >
          {isSubmitting ? 'Creating...' : 'Register'}
        </Button>
      </form>
    </>
  );
}
