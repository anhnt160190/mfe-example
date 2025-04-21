import { lazy, Suspense } from 'react';

const RemoteLoginPage = lazy(() =>
  import('mfe-web-auth/pages').then(({ default: module }) => ({
    default: module.LoginPage,
  }))
);

export const LoginPage = () => {
  return (
    <Suspense fallback={null}>
      <RemoteLoginPage />
    </Suspense>
  );
};
