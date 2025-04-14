// projectsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '@/types/Project';

interface ProjectsState {
    projects: Project[];
    selectedProject: Project | null;
}

const initialState: ProjectsState = {
    projects: [],
    selectedProject: null,
};

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setSelectedProject: (state, action: PayloadAction<Project>) => {
            state.selectedProject = action.payload;
        },
        setProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
        },
        addProject: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload);
        },
        updateProject: (state, action: PayloadAction<Project>) => {
            const index = state.projects.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
        },
        deleteProject: (state, action: PayloadAction<number>) => {
            state.projects = state.projects.filter(p => p.id !== action.payload);
        }
    }
});

export const { setSelectedProject, setProjects, addProject, updateProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;