

import{ BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from "./components/Login/Login";
import ForgotPassword from './components/Login/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword/ResetPassword';

function App() {

  const handleLoginSubmit = (username: string, password: string) => {
    console.log('Username:', username);
    console.log('Password:', password);
    
};


  return (
    <>
    {/* <Login/> */}
      
      <BrowserRouter >
      <Routes >
      <Route path="/login" element={<Login onSubmit={handleLoginSubmit} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      </BrowserRouter>

        

    </>
  )
}

export default App;
