import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader.js";

export default function Login({ setLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const signupInitialValues = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(signupInitialValues);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData, "Successfully Login");
      setLoading(false);
    } else {
      setError(validationErrors);
      setLoading(false);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address";
    }

    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  return (
    <section>
      <div className="box">
        <button className="signInBtn" onClick={() => setLogin(false)}>
          SIGN UP
        </button>
        <div className="header login">
          <h1>Explore & Experience</h1>
          <h5>Get onto your most comfortable journey yet. All the way up.</h5>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <p className="error">{error.email && error.email}</p>

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <p className="error">{error.password && error.password}</p>

          <button type="submit" className="submitBtn">
            {loading ? <HashLoader size={25} color="#fff" /> : "LOGIN"}
          </button>
        </form>
      </div>
    </section>
  );
}
