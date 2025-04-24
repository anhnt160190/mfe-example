import { useParams } from 'react-router';
import { MainLayout } from '../../layouts/Main';

export const UserDetailPage = () => {
  const { userId } = useParams();

  return (
    <MainLayout>
      <div>UserDetailPage: {userId}</div>
    </MainLayout>
  );
};
