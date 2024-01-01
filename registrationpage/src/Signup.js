import React, { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader.js";
import axios from "axios";
import { toast } from "react-toastify";

export default function Signup({ setLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const signupInitialValues = {
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(signupInitialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    realTimeValidateForms(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (Object.values(formData).every((data) => data.length === 0)) {
      toast.error("Please Fill All Detail");
      setLoading(false);
      const validateErrors = validateForm(formData);
      setError(validateErrors);
      return;
    }
    if (Object.values(formData).every((data) => data.length > 0)) {
      try {
        const response = await axios.post(
          "http://localhost:8000/signup",
          formData
        );
        let result = await response?.data;

        if (response.status === 200) {
          setError({});
          setFormData(signupInitialValues);
          setLoading(false);
          toast.success(result.msg);
          setLogin(true);
        }
      } catch (error) {
        setLoading(false);
        setError({});
        toast.error(
          error?.response?.data?.msg ||
            "Please Enter All input field, Try Again"
        );
      }
    } else {
      toast.error("Please Fill All Detail Then Submit");
      const validateErrors = validateForm(formData);
      setError(validateErrors);
      setLoading(false);
    }
  };

  const realTimeValidateForms = (name, value) => {
    let isValidPassword;
    if (name === "password" && value.length > 0) {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
        value
      );
      const isMinimumLength = value.length >= 8;

      isValidPassword =
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar &&
        isMinimumLength;
    }
    let err = "";
    switch (name) {
      case "fname":
        err = value.trim() === "" ? "First Name is required" : "";
        break;
      case "lname":
        err = value.trim() === "" ? "Last Name is required" : "";
        break;
      case "email":
        err =
          (value.trim() === "" ? "Email is required" : "") ||
          (!/\S+@\S+\.\S+/.test(value) ? "Invalid Email" : "");
        break;
      case "username":
        err = value.trim() === "" ? "Username is required" : "";
        break;
      case "password":
        err =
          (value.trim() === "" ? "Password is required" : "") ||
          (!isValidPassword
            ? "Password must be more than 8 char and include special character,upper case,lower case,numeric"
            : "");
        break;
      case "confirmPassword":
        err =
          (value.trim() === "" ? "Confirm Password is required" : "") ||
          (value !== formData.password ? "Password do not match" : "");
        break;
      default:
        break;
    }
    setError({ ...error, [name]: err });
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.fname.trim()) {
      errors.fname = "First Name is required";
    }
    if (!data.lname.trim()) {
      errors.lname = "Last Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address";
    }

    if (!data.username.trim()) {
      errors.username = "Username is required";
    }

    const hasUpperCase = /[A-Z]/.test(data.password);
    const hasLowerCase = /[a-z]/.test(data.password);
    const hasNumber = /\d/.test(data.password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      data.password
    );
    const isMinimumLength = data.password.length >= 8;

    const isValidPassword =
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      isMinimumLength;

    if (!isValidPassword) {
      errors.password =
        "Password must be more than 8 char and include special character,upper case,lower case,numeric";
    }

    if (!data.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Password do not match";
    }

    return errors;
  };

  return (
    <section>
      <div className="box">
        <button className="signInBtn" onClick={() => setLogin(true)}>
          SIGN IN
        </button>
        <div className="header">
          <h1>Explore & Experience</h1>
          <h5>Get onto your most comfortable journey yet. All the way up.</h5>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="nameRow">
            <div>
              <input
                type="name"
                placeholder="First Name"
                name="fname"
                className="name"
                value={formData.fname}
                onChange={handleInputChange}
                required
              />
              <p className="error">{error.fname && error.fname}</p>
            </div>
            <div>
              <input
                type="name"
                placeholder="Last Name"
                name="lname"
                className="name"
                value={formData.lname}
                onChange={handleInputChange}
                required
              />
              <p className="error">{error.lname && error.lname}</p>
            </div>
          </div>
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
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <p className="error">{error.username && error.username}</p>

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <p className="error">{error.password && error.password}</p>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onKeyDown={handleInputChange}
            required
          />
          <p className="error">
            {error.confirmPassword && error.confirmPassword}
          </p>

          <button type="submit" className="submitBtn">
            {loading ? <HashLoader size={25} color="#fff" /> : "GET STARTED"}
          </button>
        </form>
      </div>
    </section>
  );
}
