import React, { useState, useContext } from 'react';
import { LoginContext } from '../Context/Auth';
import { Link } from 'react-router-dom';
import { When } from "react-if";


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
      console.log(loginContext.isLoggedIn)
    } catch (error) {
      setLoginError(error.message);
    }
  };
  
  return (
    <>
     {(!loginContext.loggedIn && !loginContext.showSignup) && (
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
          <span>
                If you dont have an account you can sign up
                <Link to={"/signup"}>here</Link>
              </span>
        </form>
      )}
      {/* {loginContext.showSignup && <SignUp />} */}
    <When condition={loginContext.loggedIn}>
    <button onClick={loginContext.logout}>Log Out</button>
   </When>
     </>
  );
}

export default Login;
