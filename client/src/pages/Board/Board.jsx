import React, { useContext,useEffect } from 'react'
import styles from './Board.module.css'

import formatDate from '../../utils/dateAndTime.js'
import Backlog from '../../components/Board/Backlog.jsx'
import Done from '../../components/Board/Done.jsx'
import Inprogress from '../../components/Board/Inprogress.jsx'
import Todo from '../../components/Board/Todo.jsx'
import { TaskContext } from '../../context/TaskContext.jsx'



const Board = () => {
  const {filteredDate, setFilteredDate} = useContext(TaskContext)
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.name}>Welcome ! {JSON.parse(localStorage.getItem('currentUser')).name}</div>
        <div className={styles.date}>{formatDate()}</div>
      </div>

      <div className={styles.subHeading}>
        <div className={styles.board}>Board</div>
        <div className={styles.filter}>
          <select
            name="filter"
            id="filter"
            value={filteredDate}
            className={styles.classFilter}
            onChange={e => setFilteredDate(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className={styles.content}>
        <Backlog />
        <Todo />
        <Inprogress />
        <Done />
      </div>


    </div>
  )
}

export default Board