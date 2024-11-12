import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import ProfileEditPage from './pages/ProfileEditPage/ProfileEditPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './pages/NotFound/NotFound';
import Extract from './pages/Extract/Extract';
import { UserProvider } from './contexts/UserContext';
import './App.css';
import StudentPage from './pages/StudentPage/StudentPage';
import EnterprisePage from './pages/EnterprisePage/EnterprisePage';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Rotas protegidas*/}
            <Route path="/student" element={<ProtectedRoute element={StudentPage} />} />
            <Route path="/enterprise" element={<ProtectedRoute element={EnterprisePage} />} />
            <Route path="/settings" element={<ProtectedRoute element={ProfileEditPage} />} />
            <Route path="/extract" element={<ProtectedRoute element={Extract} />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
