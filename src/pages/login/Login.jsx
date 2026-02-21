import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { globalVar } from '../../globalContext/GlobalContext';
import Loading from '../loading/Loading';
import API from '../../services/api.jsx'

const Login = () => {
  const navigate = useNavigate();
  // const {showLoader,setShowLoader} = useContext(globalVar);
  const [loadingSet,setloadingSet] = useState(false);
  const{userLogin,setUserLogin,setUser}= useContext(globalVar);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setloadingSet(true);

    try {
      const response = await API.post("/api/accounts/login/", formData);
      console.log(response);
      if (response.status === 200) {
        const { access, refresh, user } = response.data;

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        localStorage.setItem("user", JSON.stringify(user));
        console.log('user.....',user.role)

        setUserLogin(access);
        setUser(user);

        toast.success("Login successful");

        if (user.role === "admin" || user.role === "analyst") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        } 
      }
      setFormData({
        username: "",
        password: "",
      })
      
      
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    }
    finally{
      setloadingSet(false);
    }
  }
  

 return (
    <div className={styles.container}>
      {loadingSet && <Loading/>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>Login</h2>

        <div className={styles.formGroup}>
          <label>Username</label>
          <input type="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>


        <div className={styles.formGroup}>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>


        <button type="submit" className={styles.submitBtn}>Login</button>

        <p className={styles.loginText}>
          Don't have an account? <Link to="/signup">Signup here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login