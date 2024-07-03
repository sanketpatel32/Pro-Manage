import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './shareTask.module.css';
import headingImage from '../../assets/SidebarIcons/codesandbox.svg';
import axios from 'axios';

const ShareTask = () => {
    const { taskId } = useParams(); // Extracting taskId from URL params
    const [taskData, setTaskData] = useState(null); // State to hold task data

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const response = await axios.get(`/api/task/single/${taskId}`);
                setTaskData(response.data.task); // Update state with fetched data
                console.log(response.data.task);
            } catch (error) {
                console.error('Error fetching task:', error.message);
                // Handle the error appropriately, e.g., display an error message to the user.
                // For demonstration purposes, let's log the error to the console.
                console.error(error);
            }
        };

        fetchTaskData(); // Call the async function to fetch data
    }, [taskId]); // Run useEffect whenever taskId changes

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

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <img src={headingImage} alt="Art illustration" />
                Pro Manage
            </div>

            {taskData === null ? (
                <p>Loading task data...</p>
            ) : (
                <div className={styles.task}>
                    <div className={styles.priority}>
                        <div className={styles.circle} style={{ backgroundColor: getBackgroundColor(taskData.priority) }}></div>
                        {`${taskData.priority.toUpperCase()} PRIORITY`}
                    </div>
                    <div className={styles.title}>{taskData.title}</div>

                    <div className={styles.checklist}>
                        Checklist ({taskData.checklist.filter(item => item.done).length} / {taskData.checklist.length})
                    </div>

                    <div className={styles.checklistTask}>
                            {taskData.checklist.map(t =>
                                <div className={styles.checklistItems}>
                                    <input type="checkbox" id={t._id} className={styles.checkbox} checked={t.done}/>
                                    <label htmlFor={t._id}> {t.task}</label>
                                </div>
                            )
                            }
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShareTask;
