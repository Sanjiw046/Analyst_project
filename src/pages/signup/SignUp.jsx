import React, { useContext, useState } from "react";
import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { globalVar } from "../../globalContext/GlobalContext";
import Loading from "../loading/Loading";
import API from "../../services/api.jsx";

const Signup = () => {

  const navigate = useNavigate();
  const { showLoader, setShowLoader,setUser,setUserLogin} = useContext(globalVar);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    city: "",
    state: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    try {
      const response = await API.post("/api/accounts/signup/",formData);
      console.log(response)
      if (response.status === 201) {
        const { access, refresh, user } = response.data;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        localStorage.setItem("user", JSON.stringify(user));

        setUserLogin(access);
        setUser(user);

        toast.success("Sign successful");

        if (user.role === "admin" || user.role === "analyst") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        } 
      }


    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Signup failed"
      );
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className={styles.container}>
      {showLoader && <Loading />}

      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>Signup</h2>

        <div className={styles.formGroup}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Sign Up
        </button>

        <p className={styles.loginText}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;