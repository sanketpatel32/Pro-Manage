import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './Settings.module.css'
import { MdPersonOutline } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";

const Settings = () => {
  const userIdLocal = JSON.parse(localStorage.getItem('currentUser'))._id;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userId: userIdLocal, name: '', email: '', oldPassword: '', newPassword: '' });


  const displayToast = (message, type = 'success') => {
    toast(message, {
      type,
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch('/api/auth/update', formData, { withCredentials: true })
      .then((res) => {
        displayToast("passwords updated successfully");
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        navigate('/');
      })
      .catch((error) => {
        console.log('Error', error.message);
        displayToast('Registration failed!', 'error');
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}> Settings</div>

      <form className={styles.form}>
        <div className={styles.formBox}>
          <label><MdPersonOutline size={30} color='#D0D0D0' /></label>
          <input
            type="text"
            name="name"
            placeholder='Email'
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formBox}>
          <label><MdOutlineMailOutline size={30} color='#D0D0D0' /></label>
          <input
            type="email"
            name="email"
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formBox}>
          <label><CiLock size={30} color='#D0D0D0' /></label>
          <input
            type="password"
            name="oldPassword"
            placeholder='Old Password'
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formBox}>
          <label><CiLock size={30} color='#D0D0D0' /></label>
          <input
            type="password"
            name="newPassword"
            placeholder='New Password'
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <div type="submit" className={styles.submitButton} onClick={handleSubmit}>Register</div>
      </form>

    </div>
  )
}

export default Settings