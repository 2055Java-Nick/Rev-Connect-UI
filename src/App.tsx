import { UserProvider } from './components/Context/UserContext';
import{ BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from "./components/Login/Login";
import ForgotPassword from './components/Login/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword/ResetPassword';

function App() {



  return (
    <>
    {/* <Login/> */}
      <UserProvider >
        
        <BrowserRouter >
        <Routes >
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        </BrowserRouter>
      </UserProvider>

        

    </>
  )
}
export default App;

