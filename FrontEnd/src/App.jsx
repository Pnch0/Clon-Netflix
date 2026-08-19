import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { Toaster } from 'sonner';
import { ProtectedRoute, PublicRoute } from './Components/Routes/ProtectedRoute.jsx';
import MainLayout from './Components/Layouts/MainLayout/MainLayout.jsx';
import MainPage from './Pages/MainPage/MainPage.jsx';
import LoginPage from './Pages/LoginPage/Login.jsx';
import RegisterPage from './Pages/RegisterPage/Register.jsx';

function App() {
  return (
    <>
      <Toaster 
        position="top-right" 
        richColors 
        theme="dark" 
        closeButton 
      />

      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register-page" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/main-page" element={<MainPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;