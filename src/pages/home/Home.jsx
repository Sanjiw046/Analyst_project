import React, { useContext, useEffect } from "react";
import Navbar from "../../component/navbar/Navbar";
import style from "./home.module.css";
import Footer from "../../component/footer/Footer";
import { globalVar } from "../../globalContext/GlobalContext";
import { useNavigate, Outlet } from "react-router-dom";

const Home = () => {

  const { user } = useContext(globalVar);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <Navbar />

      <section className={style.section}>
        <article className={style.fronthome}>

          <div className={style.fronthomefirst}>

            {/* LEFT SIDE */}
            <div className={style.firsthalf}>

              <div className={style.homeText}>
                Analytics Platform
              </div>

              {user && (
                <h3 className={style.homeText}>
                  Welcome {user.username}
                </h3>
              )}

              <p>
                This platform provides real-time analytics including
                state-level event tracking, interactive geographic
                visualization, and button activity insights.
              </p>

              {user && (user.role === "admin" || user.role === "analyst") ? (
                <button onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
                </button>
              ) : (
                <button onClick={() => navigate("/dashboard")}>
                  Explore Analytics
                </button>
              )}

            </div>

            {/* RIGHT SIDE */}
            <div className={style.secondhalf}>
              <img src="landingHomeImg.png" alt="Analytics" />
            </div>

          </div>

        </article>
      </section>
      <Outlet />
    </>
  );
};

export default Home;