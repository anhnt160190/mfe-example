import { lazy, Suspense } from 'react';
import { MainLayout } from '../../layouts/Main';

const RemoteListUsersPage = lazy(() =>
  import('mfe-web-users/pages').then(({ default: module }) => ({
    default: module.ListUsersPage,
  }))
);

export const ListUsersPage = () => {
  return (
    <MainLayout>
      <Suspense fallback={null}>
        <RemoteListUsersPage />
      </Suspense>
    </MainLayout>
  );
};
