import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import MainLayout from './Components/Layouts/MainLayout/MainLayout.jsx';
import MainPage from './Pages/MainPage/MainPage.jsx';


function App() {

  return(
    <Router>
      <Routes>
        <Route path="/" element />
        <Route element = {<MainLayout />}>
        <Route path="/main-page" element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
