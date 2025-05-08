import axios from "axios";
import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

const createTaskApi = (task) => {
    axios.post(
        "https://681cdcc7f74de1d219ae0b87.mockapi.io/tasks/Task",
        task
    ).then(
        (response) => {
            console.log("Data synced with server:", response.data);
        }
    ).catch((error) => {
            console.error("Error syncing data with server:", error);
        }
    )
}

const updateTaskApi = (task) => {
    axios.put(
        `https://681cdcc7f74de1d219ae0b87.mockapi.io/tasks/Task/${task.id}`,
        task
    ).then(
        (response) => {
            console.log("Data synced with server:", response.data);
        }
    ).catch((error) => {
            console.error("Error syncing data with server:", error);
        }
    )
}

const deleteTaskApi = (taskId) => {
    axios.delete(
        `https://681cdcc7f74de1d219ae0b87.mockapi.io/tasks/Task/${taskId}`
    ).then(
        (response) => {
            console.log("Data synced with server:", response.data);
        }
    ).catch((error) => {
            console.error("Error syncing data with server:", error);
        }
    )
}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        loadTasks: (state, action) => {
            const tasks = action.payload;
            state = tasks;
            return tasks;
        },
        addTask: (state, action) => {
            const newTask = {
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.description,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                status: action.payload.status || "Pending",
                assignee: action.payload.assignee || "",
                priority: action.payload.priority || "",
            };
            state.push(newTask);
            createTaskApi(newTask);
        },
        removeTask: (state, action) => {
            const taskIndex = state.findIndex((task) => task.id === action.payload);
            state.splice(taskIndex, 1);
            deleteTaskApi(action.payload);
        },
        toggleTaskCompleted: (state, action) => {
            const task = state.find((task) => task.id === action.payload);
            if (task) {
                if (task.status.toLowerCase() !== "completed") {
                    task.status = "Completed";
                    task.endDate = new Date().toISOString();
                } else {
                    task.status = "Pending";
                    task.endDate = null;
                }
                updateTaskApi(task);
            }
        },
        updateTask: (state, action) => {
            const {id, ...updatedTaskFields} = action.payload;
            const taskIndex = state.findIndex((task) => task.id === id);
            if (taskIndex !== -1) {
                state[taskIndex] = {...state[taskIndex], ...updatedTaskFields};
                updateTaskApi(state[taskIndex]);
            }
        },
    },
});

export const {addTask, removeTask, toggleTaskCompleted, updateTask, loadTasks} =
    taskSlice.actions;
export default taskSlice.reducer;

export const selectAllTasks = (state) => state.tasks;


