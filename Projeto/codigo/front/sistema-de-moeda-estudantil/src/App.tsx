import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import TestPage from './pages/Test/TestPage';
import ProfileEditPage from './pages/ProfileEditPage/ProfileEditPage';  
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';  
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Rotas protegidas*/}
          <Route path="/test" element={<ProtectedRoute element={TestPage} />} />
          <Route path="/edit" element={<ProtectedRoute element={ProfileEditPage} />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
