import { useState, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../Context/Auth";

const SignUp = () => {
  const loginContext = useContext(LoginContext);

  const [signUpInfo, setSignUpInfo] = useState({
    username: "",
    password: "",
    role: "User",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await axios
      .post(`https://todo-gyyb.onrender.com/signup`, signUpInfo)
      .then(loginContext.setShowSignup(false));
      window.location.href = "/"; 
    console.log(data.data);
  }
  function handleChange(e) {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  }

  return (
    <div className="logContain">
      <form onSubmit={handleSubmit} className="loginForm">
        <label className="input_box">
          <span>Username</span>
          <input
            placeholder="UserName"
            name="username"
            onChange={handleChange}
          />        </label>
        <label className="input_box">
          <span>Password</span>
          <input
            placeholder="password"
            name="password"
            onChange={handleChange}
            type="password"
          />        </label>
        <label className="input_box">
          <select name="role" required={true} onChange={handleChange}>
            <option value="User">User</option>
            <option value="Editor">Editor</option>
            <option value="Writer">Writer</option>
            <option value="Administrator">Administrator</option>
          </select>
        </label>
        <button className="loginBtn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;