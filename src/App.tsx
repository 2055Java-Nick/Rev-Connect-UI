import './App.css'
import Register from './Registration/Register'
import RevconnectLogo from './assets/Revconnect.png'

const App: React.FC = () => {
  return (
    <div>
      <img src={RevconnectLogo} alt="RevConnect Logo" width={700} height={300}/>
      <h1>Welcome to RevConnect!</h1>
      <h1>Register Here!</h1>
      <Register />
    </div>
  );
};

export default App
