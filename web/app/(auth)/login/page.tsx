import Link from 'next/link';
import SpotlightCard from '@/components/ui/SpotlightCard';
import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center flex-1 px-4 relative z-10">
      <SpotlightCard className="w-full max-w-md p-6 md:p-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="section-tag justify-center mb-2 font-mono">
          <span>Welcome Back</span>
        </div>
        <h2 className="section-title text-center text-3xl md:text-4xl mb-8 glow-text">
          Sign In
        </h2>

        {/* Client-side Form */}
        <LoginForm />

        {/* Footer link */}
        <p className="text-center text-sm mt-8 text-slate-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-sky-400/30 underline-offset-4">
            Register
          </Link>
        </p>
      </SpotlightCard>
    </div>
  );
}
