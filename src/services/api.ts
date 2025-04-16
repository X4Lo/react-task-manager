import { Project } from "@/types/Project";
import { Task } from "@/types/Task";

const BASE_URL = 'http://localhost:3000';

export const fetchProjects = async (): Promise<Project[]> => {
    const response = await fetch(`${BASE_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
};

export const fetchProjectById = async (id: number): Promise<Project> => {
    const response = await fetch(`${BASE_URL}/projects/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
};

export const createProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
    const response = await fetch(`${BASE_URL}/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
};

export const updateProject = async (id: number, project: Partial<Project>): Promise<Project> => {
    const response = await fetch(`${BASE_URL}/projects/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
};

export const deleteProject = async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/projects/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete project');
};

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${BASE_URL}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
};

export const fetchTaskById = async (id: number): Promise<Task> => {
    const response = await fetch(`${BASE_URL}/tasks/${id}`);
    if (!response.ok) throw new Error('Failed to fetch task');
    return response.json();
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
};