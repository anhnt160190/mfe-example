import { BrowserRouter, Routes, Route } from 'react-router';

import { LoginPage } from './pages/auth/Login';
import { NotFoundPage } from './pages/not_found/404';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
