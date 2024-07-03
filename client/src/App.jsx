import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Authorization from './pages/Authorization/Authorization';
import { useContext } from 'react';
import { UserContext } from './context/UserContext.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import ShareTask from './components/sharedTask/shareTask.jsx';
function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={<Authorization />} />
        <Route path='/task/:taskId' element= {<ShareTask/>}/>
      </Routes>
    </>
  );
}

export default App;
