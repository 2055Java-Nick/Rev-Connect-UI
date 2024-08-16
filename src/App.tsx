import './App.css'
import Home from './components/Home';
import Profile from './components/Profile'
import { Link, BrowserRouter, Route, Router, Routes } from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
        <div>
          <nav>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </nav>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App
