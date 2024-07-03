import React from 'react'
import styles from './Card.module.css'
const CheckListTaskBox = ({TaskId ,checklist}) => {
    return (
        <div className={styles.checklistItems}>
            <input type="checkbox"
                id={checklist._id}
                className={styles.checkbox}
                checked={checklist.done}
                onChange={e => handleDoneChange(e, checklist._id)} />
            <label htmlFor="checkbox1"> {t.task}</label>
        </div>
    )
}

export default CheckListTaskBox