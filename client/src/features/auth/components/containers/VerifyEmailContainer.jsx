import { useVerifyEmail } from '@/features/auth/hooks/useVerifyEmail';
import { VerifyEmailDisplay } from '@/features/auth/components/verification/VerifyEmailDisplay';

export function VerifyEmailContainer() {
  const { status, handleBackToLogin } = useVerifyEmail();

  return (
    <VerifyEmailDisplay 
      status={status}
      onBackToLogin={handleBackToLogin}
    />
  );
} 