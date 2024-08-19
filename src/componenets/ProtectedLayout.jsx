import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedLayout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href='/login'
    }
  }, [navigate]);

  return token ? children : null;
};

export default ProtectedLayout;