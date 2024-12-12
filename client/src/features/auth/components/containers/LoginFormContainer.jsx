import { useLogin } from '@/features/auth/hooks/useLogin';
import { LoginFormDisplay } from '@/features/auth/components/forms/LoginFormDisplay';

export function LoginFormContainer() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    error,
    message,
    messageType,
    handleSubmit
  } = useLogin();

  return (
    <LoginFormDisplay
      email={email}
      onEmailChange={setEmail}
      password={password}
      onPasswordChange={setPassword}
      rememberMe={rememberMe}
      onRememberMeChange={setRememberMe}
      error={error}
      message={message}
      messageType={messageType}
      onSubmit={handleSubmit}
    />
  );
} 