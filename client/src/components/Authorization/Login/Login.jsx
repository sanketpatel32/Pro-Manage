import { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [warning, setWarning] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const extractJwtFromCookie = () => {
    //     const cookieValue = document.cookie
    //         .split('; ')
    //         .find(cookie => cookie.startsWith('__clerk_db_jwt='));

    //     if (cookieValue) {
    //         return cookieValue.split('=')[1];
    //     } else {
    //         console.error('Failed to extract JWT token from the cookie.');
    //         return null;
    //     }
    // };

    // const saveTokenToLocalStorage = (token) => {
    //     localStorage.setItem('jwt', token);
    //     console.log('JWT token saved successfully:', token);
    // };

    const displayToast = (message, type = 'success') => {
        toast(message,{type: type});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/auth/login', formData, { withCredentials: true })
            .then((res) => {
                const { token } = res.data;
                localStorage.setItem('currentUser', JSON.stringify(res.data));
                displayToast('Login successful!');
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                setWarning(true);
                displayToast('Invalid credentials','error');
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                Login
            </div>
            <form className={styles.form}>
                <input
                    type="text"
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
                <div type="submit" className={styles.submitButton} onClick={handleSubmit}>Log in</div>
            </form>
            <div className={styles.bottomDiv}>Don't have an account yet?</div>
        </div>
    );
};

export default Login;
