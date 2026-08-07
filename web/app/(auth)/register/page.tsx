import Link from 'next/link';
import SpotlightCard from '@/components/ui/SpotlightCard';
import RegisterForm from '@/components/forms/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center flex-1 px-4 relative z-10">
      <SpotlightCard className="w-full max-w-lg p-6 md:p-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="section-tag justify-center mb-2 font-mono">
          <span>Begin Your Journey</span>
        </div>
        <h2 className="section-title text-center text-3xl md:text-4xl mb-8 glow-text">
          Create Account
        </h2>

        {/* Client-side Form */}
        <RegisterForm />

        {/* Footer link */}
        <p className="text-center text-sm mt-8 text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-sky-400/30 underline-offset-4">
            Sign in
          </Link>
        </p>
      </SpotlightCard>
    </div>
  );
}
