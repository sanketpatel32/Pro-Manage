import React, { useContext, useEffect, useState } from 'react'
import styles from "./Card.module.css"
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import axios from 'axios';
import { TaskContext } from '../../context/TaskContext';
import { completedTask } from '../../utils/calculate.js';
import { dueDateExceeded } from '../../utils/calculate.js';
import TodoModal from "./Modal/TodoModal.jsx"
import { InterfaceContext } from '../../context/InterfaceContext.jsx';
import { toast } from 'react-toastify';

const Card = ({ title, priority, checklist, TaskId, TaskStatus, expandAll, dueDate }) => {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [expand, setexpand] = useState(false)
  const { refreshTasks, setRefreshTasks } = useContext(TaskContext);
  const [threeDotToggler, setThreeDotToggler] = useState(false);
  const { taskCreateModal, setTaskCreateModal } = useContext(InterfaceContext);




  const threeDotTogglerHandler = () => {
    setThreeDotToggler(!threeDotToggler);
  }

  const handleDoneChange = async (e, checklistId) => {
    try {
      console.log(dueDate);
      axios.patch(`/api/task/${TaskId}/checklist/${checklistId}`, { done: e.target.checked })
        .then((res) => {
          setRefreshTasks(prev => !prev);
          console.log(res);
        })
        .catch((err) => {
          console.log('Error:', err);
          console.error('Error updating task:', err.message);
        });
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  const getBackgroundColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#cf3636'; // Example color for High priority
      case 'medium':
        return '#18b0ff'; // Example color for Medium priority
      case 'low':
        return '#63c05b'; // Example color for Low priority
      default:
        return 'gray'; // Default color if priority is not recognized
    }
  };

  const expandHandler = (e) => {
    setexpand(!expand);
  }

  const statusChangeHandler = async (newStatus) => {
    try {
      const response = await axios.get(`/api/task/single/${TaskId}`);
      const task = response.data.task;

      // Update the task status
      task.status = newStatus;

      await axios.patch(`/api/task/single/${TaskId}`, { status: newStatus });
      setRefreshTasks(prev => !prev);
    } catch (err) {
      console.error('Error updating task status:', err.message);
    }
  };

  useEffect(() => {
    setexpand(false);
  }, [expandAll]);


  const deleteHandler = () => {

    axios.delete(`/api/task/single/${TaskId}`)
      .then((res) => {
        console.log(res);
        setRefreshTasks(prev => !prev);
      })
      .catch((err) => { console.error('Error deleting task status:') })
  }


  const editHandler = async () => {
    try {
      const response = await axios.get(`/api/task/single/${TaskId}`);
      const task = response.data.task;
      setTaskToEdit(task);
      setTaskCreateModal(true);
    } catch (err) {
      console.error('Error fetching task:', err.message);
    }
  }

  const handleModalClose = () => {
    setThreeDotToggler(false);
  };

  const clipBoard = async () => {
    const stringToCopy = `https://pro-manage-s2cp.onrender.com/task/${TaskId}`;
    try {
      await navigator.clipboard.writeText(stringToCopy);
      setThreeDotToggler(!threeDotToggler);
      toast("Copy to clipboard",{type:"success"});
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.topPart}>
        <div className={styles.priority}>
          <div className={styles.circle} style={{ backgroundColor: getBackgroundColor(priority) }}></div>
          {`${priority.toUpperCase()} PRIORITY`}
        </div>
        <div className={styles.threeDots}>
          <div className={styles.threeDotsIcon} >
            <BsThreeDots size={24} onClick={threeDotTogglerHandler} />
          </div>
          {threeDotToggler &&
            <div className={styles.threeDotModal} style={{ display: threeDotToggler ? 'flex' : 'none', cursor: threeDotToggler ? 'pointer' : 'default' }}>
              <div className={styles.threeDotsOptions} onClick={editHandler}>Edit</div>
              {taskCreateModal && <TodoModal taskToEdit={taskToEdit} onClose={handleModalClose} />}
              <div className={styles.threeDotsOptions} onClick={clipBoard}>Share</div>
              <div className={styles.threeDotsOptions} style={{ color: 'red' }} onClick={deleteHandler}>Delete</div>
            </div>
          }
        </div>
      </div>
      <div className={styles.heading}>{title}</div>
      <div className={styles.checklist}>
        <div className={styles.checklistName}>
          <p className={styles.checkListHeading}>CheckList ({completedTask(checklist)}/ {checklist.length})</p>
          {expand === false && <div onClick={expandHandler} className={styles.arrowSign}><IoIosArrowDown /></div>}
          {expand === true && <div onClick={expandHandler} className={styles.arrowSign}> <IoIosArrowUp /></div>}
        </div>
        {expand && <div>
          {checklist.map(t =>
            <div className={styles.checklistItems}>
              <input type="checkbox" id={t._id} className={styles.checkbox} checked={t.done} onChange={e => handleDoneChange(e, t._id)} />
              <label htmlFor={t._id}> {t.task}</label>
            </div>
          )
          }
        </div>}

      </div>

      <div className={styles.bottomPart}>

        <div className={styles.moverDiv}>
          {TaskStatus.toUpperCase() !== "BACKLOG" && <div className={styles.mover} onClick={() => statusChangeHandler('Backlog')}>BACKLOG</div>}
          {TaskStatus.toUpperCase() !== "TO DO" && <div className={styles.mover} onClick={() => statusChangeHandler('To do')}>TO DO</div>}
          {TaskStatus.toUpperCase() !== "IN PROGRESS" && <div className={styles.mover} onClick={() => statusChangeHandler('In progress')}>IN PROGRESS</div>}
          {TaskStatus.toUpperCase() !== "DONE" && <div className={styles.mover} onClick={() => statusChangeHandler('Done')}>DONE</div>}
        </div>
        {
          dueDate !== null && <div className={styles.mover} style={{
            backgroundColor: TaskStatus.toUpperCase() === "DONE" ? "#63C05B" : !dueDateExceeded(dueDate) ? "#CF3636" : "#EEECEC",
            color: TaskStatus.toUpperCase() === "DONE" ? "white" : !dueDateExceeded(dueDate) ? "white" : "#767575",
          }}>{dueDate}</div>
        }
        {TaskStatus.toUpperCase() === "DONE"}
      </div>
    </div>
  )
}

export default Card