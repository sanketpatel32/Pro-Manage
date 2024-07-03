import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

// Create TaskContext
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const { isLoggedIn } = useContext(UserContext);

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
            setAnalyticData(response.data);
        } catch (error) {
            console.error('Error fetching analytics data:', error.message);
            // Handle error (e.g., set default analytic data or show error message)
        }
    };

    // Function to fetch and organize tasks
    const fetchAndOrganizeTasks = async () => {
        try {
            const response = await axios.get(`/api/task/getTask?filter=${filteredDate}`);

            if (response.status !== 200) {
                throw new Error(`Failed to fetch tasks (HTTP ${response.status})`);
            }

            const tasksData = response.data.manipulatedTaskObj;

            if (!tasksData) {
                throw new Error('Tasks data not found or invalid format');
            }

            const organizedTasks = {
                toDoTasks: tasksData["To do"] || [],
                inProgressTasks: tasksData["In progress"] || [],
                backlogTasks: tasksData["Backlog"] || [],
                doneTasks: tasksData["Done"] || [],
            };

            setTasks(organizedTasks);
            fetchAnalyticsData();
        } catch (error) {
            console.error('Error fetching and organizing tasks:', error.message);
            // Handle error (e.g., set tasks to default state or show error message)
            setTasks({
                toDoTasks: [],
                inProgressTasks: [],
                backlogTasks: [],
                doneTasks: [],
            });
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
        if (isLoggedIn) {
            fetchAndOrganizeTasks();
        }
    }, [isLoggedIn, filteredDate, refreshTasks]); // Dependency array includes isLoggedIn, filteredDate, and refreshTasks

    return (
        <TaskContext.Provider value={{ filteredDate, setFilteredDate, tasks, setRefreshTasks, AnalyticData }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
