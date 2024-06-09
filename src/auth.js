import React from 'react';
import {  useNavigate } from 'react-router-dom';
// useNavigate

const withAuth = (Component) => {
  const Navigate=useNavigate();
  return (props) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        Navigate("/authentication/sign-up")
      return ;
    }
    return <Component {...props} />;
  };
};

export default withAuth;