import React, { useContext } from 'react'

import Sidebar from '../../components/Dashboard/Sidebar.jsx'
import Board from '../Board/Board.jsx'
import Analytics from '../Analytics/Analytics.jsx'
import Settings from '../Settings/Settings.jsx'

import { InterfaceContext } from '../../context/InterfaceContext.jsx'
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  const {sidebarOption} = useContext(InterfaceContext);
  return (
    <div className={styles.container}>
      <Sidebar />
      {sidebarOption === "board" && <Board />}
      {sidebarOption === "analytics" && <Analytics />}
      {sidebarOption === "settings" && <Settings />}
    </div>
  )
}

export default Dashboard