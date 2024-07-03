import styles from './Analytics.module.css';
import axios from 'axios';
import React,{useState,useEffect, useContext} from 'react'
import { TaskContext } from '../../context/TaskContext';
const Analytics = () => {

const {AnalyticData} =  useContext(TaskContext);

  return (
    <div className={styles.container}>
      <div className={styles.heading}> Analytics</div>
      <div className={styles.valueboard}>

        <div className={styles.group}>
          <div className={styles.option}><div className={styles.name}><div className={styles.circle}></div>Backlog Tasks     </div><div className={styles.value}>
            {AnalyticData["Backlog"]}
          </div></div>
          <div className={styles.option}><div className={styles.name}><div className={styles.circle}></div>To-do Tasks       </div><div className={styles.value}>
            {AnalyticData["To do"]}
          </div></div>
          <div className={styles.option}><div className={styles.name}><div className={styles.circle}></div>In-Progress Tasks </div><div className={styles.value}>
            {AnalyticData["In Progress"]}
          </div></div>
          <div className={styles.option}><div className={styles.name}><div className={styles.circle}></div>Completed Tasks   </div><div className={styles.value}>
            {AnalyticData["Done"]}
          </div></div>
        </div>
        <div className={styles.group}>
          <div className={styles.option}><div className={styles.name}><div className={styles.circle}></div>Low Priority      </div><div className={styles.value}>
            {AnalyticData["Low"]}
          </div></div>
          <div className={styles.option}><div className={styles.name}><div className={styles.circle}></div>Moderate Priority </div><div className={styles.value}>
            {AnalyticData["Medium"]}
          </div></div>
          <div className={styles.option}><div className={styles.name}><div className={styles.circle}></div>High Priority     </div><div className={styles.value}>
            {AnalyticData["High"]}
          </div></div>
          <div className={styles.option}><div className={styles.name}><div className={styles.circle}></div>Due Date Tasks    </div><div className={styles.value}>
            {AnalyticData["due date"]}
          </div></div>
        </div>
      </div>
    </div>
  )
}

export default Analytics; 
