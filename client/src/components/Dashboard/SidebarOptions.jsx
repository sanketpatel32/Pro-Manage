import React, { useContext, useState } from 'react';
import styles from './Sidebar.module.css';
import { InterfaceContext } from '../../context/InterfaceContext';

const SidebarOptions = ({ name, id, lightPic, darkPic }) => {
    const { sidebarOption, setSidebarOption } = useContext(InterfaceContext);
    const [isHovered, setIsHovered] = useState(false);
    const clickHandler = () => {
        setSidebarOption(id);
    };

    return (
        <div
            className={`${styles.options} ${sidebarOption === id ? styles.dark : styles.light}`}
            onClick={clickHandler}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={isHovered || sidebarOption === id  ? darkPic : lightPic}
                alt={name}
                className={styles.image}
            />
            {name}
        </div>
    );
};

export default SidebarOptions;
