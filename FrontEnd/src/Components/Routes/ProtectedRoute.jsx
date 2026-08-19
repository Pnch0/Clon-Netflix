import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const token = localStorage.getItem('token');


  return token ? <Outlet /> : <Navigate to="/" replace />;
};


export const PublicRoute = () => {
  const token = localStorage.getItem('token');

  
  return !token ? <Outlet /> : <Navigate to="/main-page" replace />;
};