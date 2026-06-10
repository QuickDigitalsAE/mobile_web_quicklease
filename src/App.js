
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LogInPage from './Authentication/LogInPage';
import config from "./services/config.json"
import Dashboard from './Dashboard';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <Routes>
      <Route path={`/${config.demo}login`} element={<LogInPage />} />
      <Route path={`/${config.demo}*`} element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
