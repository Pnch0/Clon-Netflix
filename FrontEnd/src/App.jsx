import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import MainLayout from './Components/Layouts/MainLayout/MainLayout.jsx';
function App() {

  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element = {<MainLayout />}>
        <Route path="/main-page" element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
