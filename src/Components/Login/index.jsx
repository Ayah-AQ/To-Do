import React, { useState, useContext } from 'react';
import { LoginContext } from '../Context/Auth';

function Login() {
  const loginContext = useContext(LoginContext);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Attempting login with username:', formData.username);
    // console.log('Password:', formData.password);
    try {
      await loginContext.login(formData.username, formData.password);
      setLoginError(null);
    } catch (error) {
      setLoginError(error.message);
    }
  };
  
  return (
    <>
      {loginContext.loggedIn ? (
        <button onClick={loginContext.logout}>Log Out</button>
      ) : (
        <form onSubmit={handleSubmit}>
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          <input
            placeholder="UserName"
            name="username"
            onChange={handleChange}
          />
          <input
            placeholder="password"
            name="password"
            onChange={handleChange}
            type="password"
          />
          <button>Login</button>
        </form>
      )}
    </>
  );
}

export default Login;
