import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import MainLayout from './Components/Layouts/MainLayout/MainLayout.jsx';
import MainPage from './Pages/MainPage/MainPage.jsx';
import LoginPage from './Pages/LoginPage/Login.jsx';
import RegisterPage from './Pages/RegisterPage/Register.jsx';


function App() {

  return(
    <Router>
      <Routes>
        <Route path="/" element = {<LoginPage />} />
        <Route path="/register-page" element = {<RegisterPage />} />

        <Route element = {<MainLayout />}>
        <Route path="/main-page" element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
