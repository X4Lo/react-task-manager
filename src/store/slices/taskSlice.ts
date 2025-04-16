import { createTask as createTaskApi, deleteTask as deleteTaskApi, updateTask as updateTaskApi } from '@/services/api';
import { Task } from '@/types/Task';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface TasksState {
    tasks: Task[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    status: 'idle',
    error: null
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        updateTaskId: (
            state,
            action: PayloadAction<{ tempId: number; realId: number }>
        ) => {
            const task = state.tasks.find(t => t.id === action.payload.tempId);
            if (task) {
                task.id = action.payload.realId;
            }
        },
        deleteTasksByProject: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(t => t.projectId !== action.payload);
        },
        // Optimistic updates
        addTaskOptimistic: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTaskOptimistic: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTaskOptimistic: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        },
        // Rollbacks
        rollbackAddTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        },
        rollbackUpdateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        rollbackDeleteTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // Add Task cases
            .addCase(createNewTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createNewTask.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(createNewTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string ?? 'Unknown error occurred';
            })

            // Update Task cases
            .addCase(updateExistingTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateExistingTask.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateExistingTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string ?? 'Unknown error occurred';
            })

            // Delete Task cases
            .addCase(deleteExistingTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteExistingTask.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(deleteExistingTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string ?? 'Unknown error occurred';
            });
    }
});

export const createNewTask = createAsyncThunk(
    'tasks/createNewTask',
    async (newTask: Omit<Task, 'id'>, { dispatch, rejectWithValue }) => {
        const tempId = Date.now();
        const taskWithTempId = { ...newTask, id: tempId } as Task;

        try {
            dispatch(tasksSlice.actions.addTaskOptimistic(taskWithTempId));

            const createdTask = await createTaskApi(newTask);

            if (!createdTask.id) {
                throw new Error('Server did not return an ID');
            }

            dispatch(tasksSlice.actions.updateTaskId({
                tempId: tempId,
                realId: createdTask.id
            }));

            return createdTask;
        } catch (error) {
            dispatch(tasksSlice.actions.rollbackAddTask(tempId));
            return rejectWithValue(
                error instanceof Error ? error.message : 'Failed to create task'
            );
        }
    }
);

export const updateExistingTask = createAsyncThunk('tasks/updateTask',
    async (updatedTask: Task, { dispatch, getState, rejectWithValue }) => {
        const rootState = getState() as RootState;
        const originalTask = rootState.task.tasks.find((t: Task) => t.id === updatedTask.id);

        if (!originalTask) {
            return rejectWithValue('Task not found');
        }

        try {
            dispatch(tasksSlice.actions.updateTaskOptimistic(updatedTask));

            const response = await updateTaskApi(updatedTask.id!, updatedTask);
            return response;
        } catch (error) {
            dispatch(tasksSlice.actions.rollbackUpdateTask(originalTask));
            return rejectWithValue(
                error instanceof Error ? error.message : 'Failed to update task'
            );
        }
    }
);

export const deleteExistingTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId: number, { dispatch, getState, rejectWithValue }) => {
        const rootState = getState() as RootState;
        const taskToDelete = rootState.task.tasks.find(t => t.id === taskId);

        if (!taskToDelete) {
            return rejectWithValue('Task not found');
        }

        try {
            dispatch(tasksSlice.actions.deleteTaskOptimistic(taskId));

            await deleteTaskApi(taskId);
            return taskId;
        } catch (error) {
            dispatch(tasksSlice.actions.rollbackDeleteTask(taskToDelete));
            return rejectWithValue(
                error instanceof Error ? error.message : 'Failed to delete task'
            );
        }
    }
);

export const {
    setTasks,
    updateTaskId,
    addTaskOptimistic,
    updateTaskOptimistic,
    deleteTaskOptimistic,
    deleteTasksByProject
} = tasksSlice.actions;

export default tasksSlice.reducer;