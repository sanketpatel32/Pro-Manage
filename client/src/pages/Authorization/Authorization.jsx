import React from 'react';
import styles from './Authorization.module.css';
import image from '../../assets/Art.png';
import { useState } from 'react';
import Login from '../../components/Authorization/Login/Login';
import Register from '../../components/Authorization/Register/Register';



const Authorization = () => {

  const [AuthorizationState, setAuthorizationState] = useState("login");

  const changeHandler = () => {
    if (AuthorizationState === 'login') { setAuthorizationState('Register') }
    else { setAuthorizationState('login') }
  }

  return (
    <div className={styles.container}>

      <div className={styles.left}>
        <img src={image} alt="Art illustration" />
        <div className={styles.msg1}>Welcome aboard my friend</div>
        <div className={styles.msg2}>just a couple of clicks and we start</div>
      </div>


      <div className={styles.right}>
        {
          AuthorizationState === "login" ? <Login /> : <Register />
        }
        <div className={styles.AuthorizationChanger} onClick={changeHandler}>
          {
            AuthorizationState !== "login" ? "Login" : "Register"
          }
        </div>
      </div>
    </div>
  );
};

export default Authorization;
