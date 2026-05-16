import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthWrapper({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

  


   
     
        navigate('/');
      
    
  }, [navigate, location]);

  return children;
}

export default AuthWrapper;
