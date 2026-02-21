import React from 'react';
import style from './loading.module.css'
const Loading = () => {
  return (
    <div className={style.loadingoverlay}>
      <div className={style.spinner}></div>
      <p className={style.loadingtext}>Loading...</p>
    </div>
  );
};

export default Loading;
