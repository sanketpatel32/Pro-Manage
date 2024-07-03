import React, { useState } from 'react';
import styles from './Register.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const displayToast = (message, type = 'success') => {
    toast(message);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      displayToast('Passwords do not match!', 'error');
      return;
    }
    axios.post('/api/auth/register', formData, { withCredentials: true })
      .then((res) => {
        displayToast('Registered successfully!');
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        navigate('/');
      })
      .catch((error) => {
        console.log('Error', error.message);
        displayToast('Registration failed!', 'error');
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        Register
      </div>
      <form className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <div type="submit" className={styles.submitButton} onClick={handleSubmit}>Register</div>
      </form>
      <div className={styles.bottomDiv}>Have an account?</div>
    </div>
  );
};

export default Register;
