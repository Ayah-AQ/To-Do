import React, { useState } from 'react';

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

  const can = (capability) => {
    return user.capabilities.includes(capability);
  };

  const login = (username, password) => {
    const auth = users[username];

    if (auth && auth.password === password) {
      // Simulate token creation (not secure for production)
      const token = btoa(username + ':' + password);
      setLoggedIn(true);
      setUser({ ...auth, token });
      setError(null);
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

  const logout = () => {
    setLoggedIn(false);
    setUser({});
    setError(null);
  };

  return (
    <LoginContext.Provider value={{ loggedIn, can, login, logout, user, error }}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default AuthProvider;
