import { useEmailVerification } from '@/features/auth/hooks/useEmailVerification';
import { EmailVerificationPendingDisplay } from '@/features/auth/components/verification/EmailVerificationPendingDisplay';

export function EmailVerificationPendingContainer() {
  const { email, resendStatus, handleResendVerification } = useEmailVerification();

  if (!email) return null;

  return (
    <EmailVerificationPendingDisplay
      email={email}
      resendStatus={resendStatus}
      onResendVerification={handleResendVerification}
    />
  );
} 