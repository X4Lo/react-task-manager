// tasksSlice.ts
import { Task } from '@/types/Task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: []
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTaskStatus: (
            state,
            action: PayloadAction<{ id: number; status: 'to_do' | 'in_progress' | 'completed' }>
        ) => {
            const task = state.tasks.find(t => t.id === action.payload.id);
            if (task) {
                task.status = action.payload.status;
            }
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        },
        deleteTasksByProject: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(t => t.projectId !== action.payload);
        }
    }
});

export const {
    setTasks,
    addTask,
    updateTaskStatus,
    updateTask,
    deleteTask,
    deleteTasksByProject
} = tasksSlice.actions;
export default tasksSlice.reducer;