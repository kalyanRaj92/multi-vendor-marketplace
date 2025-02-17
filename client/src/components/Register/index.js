import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

import "./index.css";

const Register = () => {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
    setError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (signUpData.password.length < 5) {
      setError("Password must be 5 digits.");
      return;
    }

    //console.log(signUpData);

    try {
      const res = await axios.post("http://localhost:5003/api/users/register", signUpData);
      console.log(res);
      if (res.status === 201) {
        navigate("/login");
      } 
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signUp-form" onSubmit={handleFormSubmit}>
        <div>
          <h1 className="signUp-title">Signup :)</h1>
        </div>

        <div className="signUp-input-group">
          <label className="signUp-label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={signUpData.name}
            placeholder="Enter your Name"
            className="signUp-input"
            onChange={handleChangeInput}
            required
          />
        </div>

        <div className="signUp-input-group">
          <label className="signUp-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={signUpData.email}
            placeholder="Enter your Email"
            className="signUp-input"
            onChange={handleChangeInput}
            required
          />
        </div>

        <div className="signUp-input-group">
          <label className="signUp-label" htmlFor="mobileNum">
            Mobile No
          </label>
          <input
            id="mobileNum"
            type="text"
            name="mobileNumber"
            value={signUpData.mobileNumber}
            placeholder="Enter your Number"
            className="signUp-input"
            onChange={handleChangeInput}
            required
          />
        </div>

        <div className="signUp-input-group">
          <label className="signUp-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={signUpData.password}
            placeholder="Create Password"
            className="signUp-input"
            onChange={handleChangeInput}
            required
          />
        </div>
        {error && <p className="signup-err-message">{error}</p>}
        <div className="signUp-button-group">
          <button type="submit" className="signUp-button">
            Signup
          </button>
        </div>
        <div className="signIn-prompt">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
