import React from 'react';
import style from './footer.module.css';
import { FaYoutube, FaFacebook, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <ul>
        <li><FaYoutube size={20} color="white" /></li>
        <li><FaFacebook size={20} color="white" /></li>
        <li><FaLinkedin size={20} color="white" /></li>
        <li><FaInstagram size={20} color="white" /></li>
        <li><FaWhatsapp size={20} color="white" /></li>
        <li><FaXTwitter size={20} color="white" /></li>
      </ul>
      <div className={style.copyright}>
        <p>© 2025 My Website</p>
      </div>
    </footer>
  );
};

export default Footer;
