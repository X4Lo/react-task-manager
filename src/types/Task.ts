export interface Task {
    id?: number;
    projectId: number;
    title: string;
    description: string;
    status: 'to_do' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
};