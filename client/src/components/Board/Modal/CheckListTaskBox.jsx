import styles from './CheckListTaskBox.module.css';

import { AiFillDelete } from "react-icons/ai";
const ChecklistTaskBox = ({
    checklist,
    createEdit,
    deleteCheckList,
    changeCheckList,
    changeTask,
    disabled = false,
}) => {
    return (
        <div className={styles.container}>
            <input
                type="checkbox"
                checked={checklist.done}
                className={styles.checkbox}
                onChange={(e) => changeCheckList(checklist._id, e)}
                disabled={disabled}
            />
            {createEdit ? (
                <input
                    placeholder="Add a task"
                    type="text"
                    value={checklist.task}
                    className={styles.taskInput}
                    onChange={(e) => changeTask(e, checklist._id)}
                    disabled={disabled}
                />
            ) : (
                //
                <p className="task">{checklist.task}</p>
            )}

            {createEdit && (
                <AiFillDelete
                    className="delete"
                    onClick={() => deleteCheckList(checklist._id)}
                />
            )}
        </div>
    );
};

export default ChecklistTaskBox;
