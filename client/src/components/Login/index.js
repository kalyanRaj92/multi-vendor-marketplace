import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import "./index.css";

function Login() {
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
    setError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5003/api/users/login", signInData);
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/welcome");
      } 
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="signIn-container">
      <form className="signIn-form" onSubmit={handleFormSubmit}>
        <div>
          <h1 className="signIn-title">Login :)</h1>
        </div>

        <div className="signIn-input-group">
          <label className="signIn-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={signInData.email}
            placeholder="Email"
            className="signIn-input"
            onChange={handleChangeInput}
            required
          />
        </div>

        <div className="signIn-input-group">
          <label className="signIn-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={signInData.password}
            placeholder="Password"
            className="signIn-input"
            onChange={handleChangeInput}
            required
          />
        </div>
        {error && <p className="signin-err-message">{error}</p>}
        <div className="signIn-button-group">
          <button type="submit" className="signIn-button">
            Login
          </button>
          <div className="signUp-prompt">
            <p>
              Don't have an account? <Link to="/register">Signup</Link>.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
