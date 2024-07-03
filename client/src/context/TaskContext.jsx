import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create TaskContext
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [AnalyticData, setAnalyticData] = useState({
        "To do": 0,
        "Backlog": 0,
        "In Progress": 0,
        "Done": 0,
        "high": 0,
        "low": 0,
        "moderate": 0,
        "due date": 0
    });

    // Function to fetch and update analytics data
    const fetchAnalyticsData = async () => {
        try {
            const response = await axios.get('/api/task/analytics', { withCredentials: true });
            console.log(response.data)
            setAnalyticData(response.data);
        } catch (error) {
            console.error('Error fetching analytics data:', error.message);
        }
    };

    // Function to fetch and organize tasks
    const fetchAndOrganizeTasks = async () => {
        try {
            const response = await axios.get(`/api/task/getTask?filter=${filteredDate}`);
            const tasksData = response.data.manipulatedTaskObj;
            console.log(tasksData)
            setTasks({
                toDoTasks: tasksData["To do"] || [],
                inProgressTasks: tasksData["In progress"] || [],
                backlogTasks: tasksData["Backlog"] || [],
                doneTasks: tasksData["Done"] || [],
            });

            // After setting tasks, fetch analytics data
            fetchAnalyticsData();
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
        }
    };

    const [filteredDate, setFilteredDate] = useState('today');
    const [tasks, setTasks] = useState({
        toDoTasks: [],
        inProgressTasks: [],
        backlogTasks: [],
        doneTasks: [],
    });
    const [refreshTasks, setRefreshTasks] = useState(false); // State to trigger re-fetch

    useEffect(() => {
        fetchAndOrganizeTasks();
    }, [filteredDate, refreshTasks]); // Dependency array includes refreshTasks

    return (
        <TaskContext.Provider value={{ filteredDate, setFilteredDate, tasks, setRefreshTasks, AnalyticData }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
