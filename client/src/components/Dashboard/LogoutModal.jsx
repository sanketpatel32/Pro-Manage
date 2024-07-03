import React, { useContext, useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { InterfaceContext } from '../../context/InterfaceContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
 
const LogoutModal = () => {
    const { LogOutModalContext, setLogOutModal } = useContext(InterfaceContext);
    const [modal, setModal] = useState(LogOutModalContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (modal === false) {
            console.log('Condition meet');
            setLogOutModal(false);
        }
    }, [modal]);

    const cancelHandler = () => {
        setModal(false);
    };

    const logoutHandler = (e) => {
        e.preventDefault();
        axios.post('/api/auth/logout')
            .then((res) => {
                toast.success('Logout successful!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                localStorage.removeItem('currentUser');
                setLogOutModal(false);
                navigate('/auth');
            })
            .catch((err) => {
                console.error(err);
                toast.error('Logout failed. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <p>Are you sure you want to Logout?</p>
                <div className={styles.logoutButton} onClick={logoutHandler}>Yes, Logout</div>
                <div className={styles.cancelButton} onClick={cancelHandler}>Cancel</div>
            </div>
        </div>
    );
}

export default LogoutModal;
