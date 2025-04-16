import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    createProject as createProjectApi,
    fetchProjects as fetchProjectsApi,
    updateProject as updateProjectApi,
    deleteProject as deleteProjectApi
} from '@/services/api';
import { Project } from '@/types/Project';
import { RootState } from '../store';

interface ProjectsState {
    projects: Project[];
    selectedProject: Project | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProjectsState = {
    projects: [],
    selectedProject: null,
    status: 'idle',
    error: null,
};

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
        },
        setSelectedProject: (state, action: PayloadAction<Project>) => {
            state.selectedProject = action.payload;
        },
        updateProjectId: (state, action: PayloadAction<{ tempId: number, realId: number }>) => {
            const project = state.projects.find(p => p.id === action.payload.tempId);
            if (project) {
                project.id = action.payload.realId;
            }
        },
        // Optimistic updates
        addProjectOptimistic: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload);
        },
        updateProjectOptimistic: (state, action: PayloadAction<Project>) => {
            const index = state.projects.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
        },
        deleteProjectOptimistic: (state, action: PayloadAction<number>) => {
            state.projects = state.projects.filter(p => p.id !== action.payload);
        },
        // Rollbacks
        rollbackAddProject: (state, action: PayloadAction<number>) => {
            state.projects = state.projects.filter(p => p.id !== action.payload);
        },
        rollbackUpdateProject: (state, action: PayloadAction<Project>) => {
            const index = state.projects.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
        },
        rollbackDeleteProject: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Projects cases
            .addCase(fetchAllProjects.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllProjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projects = action.payload;
            })
            .addCase(fetchAllProjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string ?? 'Unknown error occurred';
            })

            // Add Project cases
            .addCase(createNewProject.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createNewProject.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(createNewProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string ?? 'Unknown error occurred';
            })

            // Update Project cases
            .addCase(updateExistingProject.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateExistingProject.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateExistingProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string ?? 'Unknown error occurred';
            })

            // Delete Project cases
            .addCase(deleteExistingProject.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteExistingProject.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(deleteExistingProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string ?? 'Unknown error occurred';
            });
    },
});

export const fetchAllProjects = createAsyncThunk(
    'projects/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchProjectsApi();
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Failed to fetch projects'
            );
        }
    }
);

export const createNewProject = createAsyncThunk(
    'projects/create',
    async (newProject: Omit<Project, 'id'>, { dispatch, getState, rejectWithValue }) => {
        const tempId = Date.now();
        const projectWithTempId = { ...newProject, id: tempId } as Project;

        try {
            dispatch(projectsSlice.actions.addProjectOptimistic(projectWithTempId));

            const createdProject = await createProjectApi(newProject);

            if (!createdProject.id) {
                throw new Error('Server did not return an ID');
            }

            dispatch(projectsSlice.actions.updateProjectId({
                tempId: tempId,
                realId: createdProject.id
            }));

            return createdProject;
        } catch (error) {
            dispatch(projectsSlice.actions.rollbackAddProject(tempId));
            return rejectWithValue(
                error instanceof Error ? error.message : 'Failed to create project'
            );
        }
    }
);

export const updateExistingProject = createAsyncThunk(
    'projects/update',
    async (updatedProject: Project, { dispatch, getState, rejectWithValue }) => {
        const rootState = getState() as RootState;
        const originalProject = rootState.project.projects.find(p => p.id === updatedProject.id);

        if (!originalProject) {
            return rejectWithValue('Project not found');
        }

        try {
            dispatch(projectsSlice.actions.updateProjectOptimistic(updatedProject));

            const response = await updateProjectApi(updatedProject.id!, updatedProject);
            return response;
        } catch (error) {
            dispatch(projectsSlice.actions.rollbackUpdateProject(originalProject));
            return rejectWithValue(
                error instanceof Error ? error.message : 'Failed to update project'
            );
        }
    }
);

export const deleteExistingProject = createAsyncThunk(
    'projects/delete',
    async (projectId: number, { dispatch, getState, rejectWithValue }) => {
        const rootState = getState() as RootState;
        const projectToDelete = rootState.project.projects.find(p => p.id === projectId);

        if (!projectToDelete) {
            return rejectWithValue('Project not found');
        }

        try {
            dispatch(projectsSlice.actions.deleteProjectOptimistic(projectId));

            await deleteProjectApi(projectId);
            return projectId;
        } catch (error) {
            dispatch(projectsSlice.actions.rollbackDeleteProject(projectToDelete));
            return rejectWithValue(
                error instanceof Error ? error.message : 'Failed to delete project'
            );
        }
    }
);

export const {
    setProjects,
    setSelectedProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;