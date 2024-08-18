import { UserProvider } from './components/Context/UserContext';
import{ BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from "./components/Login/Login";

function App() {



  return (
    <>
    {/* <Login/> */}
      <UserProvider >
        
        <BrowserRouter >
        <Routes >
        <Route path="/login" element={<Login />} />
          {/* < Route path="/login" element={<login />} /> */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        </BrowserRouter>
      </UserProvider>

        

    </>
  )
}

export default App;
