import React, { useContext } from 'react'
import style from './navbar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { globalVar } from '../../globalContext/GlobalContext'

const Navbar = () => {

  const { userLogin, setUserLogin } = useContext(globalVar);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <section className={style["navsection"]}>

        <div className={style["logodiv"]}>
            
        </div>

        <div className={style["itemdiv"]}>
            <ul className={style.ulItem}>

                <NavLink to='/home' className={style.nolink}>
                  <li className={style.navtext}>Home</li>
                </NavLink>

                {userLogin && (user?.role === "admin" || user?.role === "analyst") && (
                  <NavLink to='/dashboard' className={style.nolink}>
                    <li className={style.navtext}>Dashboard</li>
                  </NavLink>
                )}

                <li className={style.navtext}>Contact us</li>

            </ul>
        </div>

        <div className={style.btngroup}>

          {userLogin ? (
            <div className={style.btngroup}>
              <button className={style.loginbtn} onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to='/login' className={style.nolink}>
                <button className={style.loginbtn}>Login</button>
            </NavLink>
          )}

        </div>

    </section>
  )
}

export default Navbar