import React, { useEffect, useState } from 'react';
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import superagent from "superagent";
import base64 from "base-64";

const users = {
  Administrator: {
    password: 'admin',
    username: 'Administrator',
  },
  Editor: {
    password: 'editor',
    username: 'Editor',
  },
  Writer: {
    password: 'writer',
    username: 'Writer',
  },
  User: {
    password: 'user',
    username: 'User',
  },
};

export const LoginContext = React.createContext();

function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ capabilities: [] });
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  
  const can = (capability) => {
    return user.capabilities.includes(capability);
  };

  const login = async (username, password) => {
    const data = await superagent
      .post(`https://todo-gyyb.onrender.com/signin`)
      .set(
        "authorization",
        `Basic ${base64.encode(`${username}:${password}`)}`
      );
    if (data.body.token) {
      try {
        validateToken(data.body.token); 
      } catch (e) {
        setLoginState(false, null, {}, e);
        handleLoginError('Invalid username or password');
        console.error(e);
      }
    } else {
      handleLoginError('Invalid username or password'); 
    }
  };

  const handleLoginError = (errorMessage) => {
    setLoggedIn(false);
    setUser({});
    setError(errorMessage);
    console.error(errorMessage);
  };

  const validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      setLoginState(true, token, validUser);
    } catch (e) {
      setLoginState(false, null, {}, e);
      console.log("Token Validation Error", e);
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setUser({});
    setError(null);
  };

  const setLoginState = (loggedIn, token, user, error) => {
    cookie.save("auth", token);
    setLoggedIn(loggedIn);
    setToken(token);
    setUser(user);
    setError(error || null);
  };

  const loginState = {
    loggedIn: loggedIn,
    can: can,
    login: login,
    logout: logout,
    user: user,
    token: token,
    error: error,
    setShowSignup: setShowSignup,
    showSignup: showSignup,
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    validateToken(token);
  }, []);

  return (
    <LoginContext.Provider value={loginState}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default AuthProvider;
