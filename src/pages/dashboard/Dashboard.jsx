import React, { useEffect, useState } from "react";
import API from "../../services/api.jsx";
import MapComponent from "../../component/map/MapComponent.jsx";
import styles from "./dashboard.module.css";
import Navbar from "../../component/navbar/Navbar.jsx";

const Dashboard = () => {

  const [summary, setSummary] = useState(null);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchButtons();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await API.get("/api/analytics/summary/");
      setSummary(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchButtons = async () => {
    try {
      const res = await API.get("/api/analytics/buttons/");
      setButtons(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
        <Navbar/>
        <div className={styles.dashboardContainer}>

        <h1 className={styles.heading}>Analytics Dashboard</h1>

        {summary && (
            <div className={styles.cardContainer}>
            <div className={styles.card}>
                <h3>Total Events</h3>
                <p>{summary.total_events}</p>
            </div>

            <div className={styles.card}>
                <h3>Total Signups</h3>
                <p>{summary.total_signups}</p>
            </div>

            <div className={styles.card}>
                <h3>Total Logins</h3>
                <p>{summary.total_logins}</p>
            </div>

            <div className={styles.card}>
                <h3>Total Button Clicks</h3>
                <p>{summary.total_button_clicks}</p>
            </div>
            </div>
        )}

        <div className={styles.mapSection}>
            <MapComponent />
        </div>

        <div className={styles.buttonSection}>
            <h2>Button Analytics</h2>

            <div className={styles.buttonGrid}>
            {buttons.map((btn, index) => (
                <div key={index} className={styles.buttonCard}>
                <h4>{btn.button_name}</h4>
                <p>{btn.total_clicks} clicks</p>
                </div>
            ))}
            </div>
        </div>

        </div>
    </>
  );
};

export default Dashboard;