import { Project } from "@/types/Project";
import { Task } from "@/types/Task";

const BASE_URL = 'http://localhost:3000';

export const fetchProjects = async (): Promise<Project[]> => {
    const response = await fetch(`${BASE_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
};

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${BASE_URL}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
};