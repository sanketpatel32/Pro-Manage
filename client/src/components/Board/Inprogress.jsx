import React, { useContext, useEffect, useState } from 'react';
import { VscCollapseAll } from "react-icons/vsc";
import styles from './BoardComponent.module.css';
import Card from './Card.jsx';
import { TaskContext } from '../../context/TaskContext.jsx';

const Inprogress = () => {
  const { tasks } = useContext(TaskContext);

  const [expandAll, setExpandAll] = useState(true);
  const handleExpandAllToggle = () => {
    setExpandAll(prev => !prev);
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div>In Progress</div>
        <div className={styles.collapse}>
          <div className={styles.allCollapse} onClick={handleExpandAllToggle}>
            <VscCollapseAll />
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        {tasks.inProgressTasks.map(task => (
          <Card
            priority={task.priority}
            key={task.id}
            title={task.title}
            checklist={task.checklist}
            TaskId={task.id}
            TaskStatus={task.status}
            expandAll={expandAll}
            dueDate={task["due date"]}
          />
        ))}
      </div>
    </div>
  );
}

export default Inprogress;
