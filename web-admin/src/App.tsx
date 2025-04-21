import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ProtectedRoute } from 'mfe-web-auth/features';
import { LoginPage } from './pages/auth/Login';
import { NotFoundPage } from './pages/not_found/404';
import { LandingPage } from './pages/landing/Landing';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/' element={<Navigate to='/landing' />} />
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/landing'
            element={
              <ProtectedRoute permissions={['read']}>
                <LandingPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
