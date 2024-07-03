
import React, { useContext, useState, useRef } from 'react'
import styles from "./TodoModal.module.css"
import { InterfaceContext } from '../../../context/InterfaceContext'
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import { completedTask, formatedDate } from '../../../utils/calculate.js'
import ChecklistTaskBox from './CheckListTaskBox.jsx';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { TaskContext } from '../../../context/TaskContext.jsx';
const TodoModal = ({ taskToEdit ,onClose}) => {

  const { taskCreateModal, setTaskCreateModal } = useContext(InterfaceContext);
  const { refreshTasks, setRefreshTasks } = useContext(TaskContext);

  const closeHandler = (e) => {
    e.preventDefault();
    console.log("Closed");
    setTaskCreateModal(false);
  }

  //----------------------------------------------------------------
  const initialErrorState = {
    title: "",
    priority: "",
    checklistArr: "",
    checklistEmpty: "",
  };

  const [title, setTitle] = useState(() => {
    return taskToEdit ? taskToEdit.title : "";
  });
  const [taskPriority, setTaskPriority] = useState(() => {
    return taskToEdit ? taskToEdit.priority : "";
  });
  const [checkLists, setCheckLists] = useState(() => {
    return taskToEdit ? taskToEdit.checklist : [];
  });
  const [dueDate, setDueDate] = useState(() => {
    return taskToEdit && taskToEdit["due date"]
      ? formatedDate(taskToEdit["due date"], "MM-DD-YYYY")
      : null;
  });

  const [error, setError] = useState(initialErrorState);
  const [showCalendar, setShowCalendar] = useState(false);
  const addTaskContainerRef = useRef(null);
  const totalChecklist = checkLists.length;
  const completedChecklist = completedTask(checkLists);
  // const [editTask] = useEditTaskMutation();
  // const [createTask] = useCreateTaskMutation();

  const toggleCalendarVisibility = () => {
    setShowCalendar(!showCalendar);
  };

  const pickDate = (e) => {
    setDueDate(e);
    setShowCalendar(false);
  };

  const handleDeleteCheckList = (id) => {
    setCheckLists((prev) => prev.filter((checklist) => checklist._id !== id));
  };

  const handleDoneChange = (id, e) => {
    const newArray = checkLists.map((checkList) =>
      checkList._id === id
        ? { ...checkList, done: e.target.checked }
        : checkList
    );
    setCheckLists(newArray);
  };

  const handleTaskChange = (e, id) => {
    setCheckLists((prev) =>
      prev.map((checklist) => {
        if (checklist._id === id) {
          return {
            ...checklist,
            task: e.target.value,
          };
        }
        return checklist;
      })
    );
  };

  const handleAddChecklist = () => {
    const newChecklist = {
      _id: Math.ceil(Math.random() * 100000000000000 + 1),
      task: "",
      done: false,
    };
    setCheckLists([...checkLists, newChecklist]);
    setTimeout(() => {
      if (addTaskContainerRef.current) {
        const lastChecklistItem = addTaskContainerRef.current.lastChild;
        lastChecklistItem.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 0);
  };

  const onCreateEdit = async () => {
    // ----------------------------------------------------------------
    if (!title) {
      setError({ ...initialErrorState, title: "Title is required" });
      return toast.error("Title is required");
    } else {
      setError(initialErrorState);
    }
    // ------------------------------------------------------------------
    if (!taskPriority) {
      setError({ ...initialErrorState, priority: "Priority is required" });
      return toast.error("Priority is required");
    } else {
      setError(initialErrorState);
    }
    // -------------------------------------------------------------------
    if (checkLists.length === 0) {
      setError({
        ...initialErrorState,
        checklistArr: "Create atleast one subtask",
      });
      return toast.error("To create task at least one sub task is required");
    } else {
      setError(initialErrorState);
    }
    // -------------------------------------------------------------------
    if (checkLists.some((checklist) => checklist.task === "")) {
      setError({
        ...initialErrorState,
        checklistEmpty: "Checklist task cannot be empty",
      });
      return toast.error("Checklist cannot be empty");
    } else {
      setError(initialErrorState);
    }
    let Task = {
      title,
      priority: taskPriority,
      checklist: checkLists.map((ele) => {
        const { _id, ...rest } = ele;
        return { ...rest };
      }),
    };
    if (dueDate) {
      Task["due date"] = formatedDate(dueDate, "MM-DD-YYYY");
    }
    if (taskToEdit) {
      const taskId = taskToEdit._id;
      const fieldsToUpdate = Task;
      try {
        axios.patch(`/api/task/single/${taskId}`, fieldsToUpdate, { withCredentials: true })
          .then((res) => {
            console.log("Updated Field")
            setRefreshTasks(prev => !prev);
            toast.success("Task edited");
            onClose();
            setTaskCreateModal(false);
          })
          .catch((err) => {toast.error("Error")});
      } catch (error) {
        toast.error(error?.data?.message);
      }
    } else {
      try {
        console.log(Task);
        axios.post('/api/task/createTask', Task, { withCredentials: true })
          .then((res) => {
            setRefreshTasks(prev => !prev)
            setTaskCreateModal(false);
          })
        toast.success("New task created");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  }

  //----------------------------------------------------------------

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.container}>

          <div className={styles.heading}> Title <div style={{ color: "red", fontSize: "1rem" }}>*</div> </div>

          <input
            type="text"
            className={styles.inputTitle}
            placeholder='Enter Task Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className={styles.priorityDiv}>
            <div className={styles.priorityTitle}>
              Select Priority
              <div style={{ color: "red", fontSize: "1rem" }}>*</div>
            </div>
            <div className={styles.priorityBox} style={{ backgroundColor: taskPriority === 'High' ? "#e2e2e2" : "" }} onClick={(e) => { setTaskPriority('High'); }}>
              <div className={styles.circle} style={{ backgroundColor: "#FF2473" }} ></div>
              <div className={styles.priority}>HIGH PRIORITY</div>
            </div>
            <div className={styles.priorityBox} style={{ backgroundColor: taskPriority === 'Medium' ? "#e2e2e2" : "" }} onClick={(e) => { setTaskPriority('Medium'); }}>
              <div className={styles.circle} style={{ backgroundColor: "#18B0FF" }} onClick={() => { setTaskPriority('Medium') }}></div>
              <div className={styles.priority}>MODERATE PRIORITY</div>
            </div>
            <div className={styles.priorityBox} style={{ backgroundColor: taskPriority === 'Low' ? "#e2e2e2" : "" }} onClick={(e) => { setTaskPriority('Low'); }}>
              <div className={styles.circle} style={{ backgroundColor: "#63C05B" }} onClick={() => { setTaskPriority('Low') }}></div>
              <div className={styles.priority}>LOW PRIORITY</div>
            </div>

          </div>

          <div className={styles.checklistDiv}>
            <div className={styles.checklistDivTitle}>
              <p>
                Checklist (<span>{completedChecklist}</span>/
                <span>{totalChecklist}</span>)<span>*</span>
              </p>
            </div>
            {/* //------------------ */}
            {totalChecklist > 0 && (
              <div className={styles.checkList} ref={addTaskContainerRef}>
                {checkLists.map((checkList) => (
                  <ChecklistTaskBox
                    checklist={checkList}
                    createEdit
                    key={checkList._id || checkList.id}
                    deleteCheckList={handleDeleteCheckList}
                    changeCheckList={handleDoneChange}
                    changeTask={handleTaskChange}
                  />
                ))}
              </div>
            )}
            <button onClick={handleAddChecklist}>+ ADD</button>

          </div>

        </div>

        <div type="submit" className={styles.bottomDiv}>
          <div className={styles.leftSide}>
            <div className={styles.calendar}>
              {showCalendar && (
                <DatePicker selected={dueDate} onChange={pickDate} inline />
              )}
            </div>
            <div className={styles.bottomOptions} onClick={toggleCalendarVisibility}>
              {dueDate ? formatedDate(dueDate, "MM-DD-YYYY") : "Select Due Date"}
            </div>

          </div>

          <div className={styles.bottomDivRightSide}>
            <div onClick={closeHandler} className={styles.bottomOptions} style={{ color: "#CF3636", borderColor: "#CF3636" }}>Cancel</div>
            <div className={styles.bottomOptions} style={{ color: 'white', borderColor: "#17A2B8", backgroundColor: "#17A2B8" }} onClick={onCreateEdit}>Save</div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TodoModal