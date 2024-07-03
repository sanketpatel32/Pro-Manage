import React, { useContext, useEffect,useState } from 'react'
import { VscCollapseAll } from "react-icons/vsc";
import styles from './BoardComponent.module.css'
import TodoModal from './Modal/TodoModal.jsx'
import { InterfaceContext } from '../../context/InterfaceContext.jsx'
import Card from './Card.jsx'
import { TaskContext } from '../../context/TaskContext.jsx';


const Todo = () => {
  const { tasks, refreshTasks, setRefreshTasks } = useContext(TaskContext);
  const { taskCreateModal, setTaskCreateModal } = useContext(InterfaceContext);
  const [expandAll, setExpandAll] = useState(true);
  const handleExpandAllToggle = () => {
    setExpandAll(prev => !prev);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setTaskCreateModal(true);
  }
  return (
    <div className={styles.container}>

      <div className={styles.heading}>
        <div>To Do</div>
        <div className={styles.collapse}>
          <div onClick={handleClick} className={styles.addButton}>+</div>
          <div className={styles.allCollapse} onClick={handleExpandAllToggle} ><VscCollapseAll /></div>
        </div>
        {taskCreateModal && <TodoModal />}
      </div>

      <div className={styles.mainContent}>
        {tasks.toDoTasks.map(task => (
          <Card
            priority={task.priority}
            key={task.id}
            title={task.title}  // Note: "title" should be accessed as "task.title"
            checklist={task.checklist}
            TaskId={task.id}
            TaskStatus={task.status}
            expandAll={expandAll}
            dueDate={task["due date"]}
          />
        ))}
      </div>
    </div>
  )
}

export default Todo;