import { lazy, Suspense } from 'react';

const RemoteLoginPage = lazy(() => import('mfe-web-auth/LoginPage'));

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <RemoteLoginPage />
    </Suspense>
  );
}
