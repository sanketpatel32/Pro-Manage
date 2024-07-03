import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import styles from './Sidebar.module.css'
import SidebarOptions from './SidebarOptions.jsx'
import headingImage from "../../assets/SidebarIcons/codesandbox.svg"
import logoutImage from "../../assets/SidebarIcons/Logout.svg"
import LogoutModal from './LogoutModal.jsx';
import lightBoard from "../../assets/SidebarIcons/board.svg"
import darkBoard from "../../assets/SidebarIcons/boardDark.svg"
import database from "../../assets/SidebarIcons/database.svg"
import databaseDark from "../../assets/SidebarIcons/databaseDark.svg"
import settings from "../../assets/SidebarIcons/settings.svg"
import settingsDark from "../../assets/SidebarIcons/settingsDark.svg"
import { useNavigate } from 'react-router-dom';
import { InterfaceContext } from '../../context/InterfaceContext.jsx';


const Sidebar = () => {
  const { LogOutModalContext, setLogOutModal } = useContext(InterfaceContext);

  const handleLogout = (e) => {
    e.preventDefault();
    setLogOutModal(true);

  }
  return (
    <div className={styles.container}>
      <div className={styles.topDiv}>

        <div className={styles.heading}>
          <img src={headingImage} alt="Art illustration" />
          Pro Manage
        </div>
        <SidebarOptions name="Board" id="board" lightPic={lightBoard} darkPic={darkBoard} />
        <SidebarOptions name="Analytics" id="analytics" lightPic={database} darkPic={databaseDark} />
        <SidebarOptions name="Settings" id="settings" lightPic={settings} darkPic={settingsDark} />
      </div>

      <div className={styles.logout} onClick={handleLogout}>
        <img src={logoutImage} alt="" />
        Log Out
        {LogOutModalContext === true && <LogoutModal />}
      </div>
    </div>
  )
}

export default Sidebar