import React, { useCallback, useEffect, useState } from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import TaskCard from '@/components/TaskCard';
import TaskCreateDialog from '@/components/TaskCreateDialog';
import { Task } from '@/types/Task';
import { deleteExistingTask, updateExistingTask } from '@/store/slices/taskSlice';
import { useAppDispatch } from '@/store/hooks/useAppSelector';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import ConfirmationDialog from '@/components/ConfirmationDialog';

interface TssksPageProps {
    tasks: Task[];
}

const TasksPage: React.FC<TssksPageProps> = ({ tasks }: TssksPageProps) => {
    const dispatch = useAppDispatch();

    const projects = useSelector((state: RootState) => state.project.projects);

    const [isOpen, setIsOpen] = useState(false);

    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [projectFilter, setProjectFilter] = useState<string>("all");
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

    const handleProjectFilterChange = (value: string) => {
        setProjectFilter(value);
    }

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value);
    };

    const handleTaskStatusChange = (task: Task, status: string) => {
        dispatch(updateExistingTask({ ...task, status: status as 'to_do' | 'in_progress' | 'completed' }))
    }

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

    const handleTaskDelete = (task: Task) => {
        setTaskToDelete(task);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (taskToDelete) {
            dispatch(deleteExistingTask(taskToDelete.id!));
            setTaskToDelete(null);
        }
        setDeleteDialogOpen(false);
    };

    const filterTasks = useCallback(() => {
        let filtered = tasks;

        if (statusFilter != "all") {
            filtered = filtered.filter(task => task.status === statusFilter)
        }

        if (projectFilter != "all") {
            filtered = filtered.filter(task => task.projectId.toString() === projectFilter)
        }

        return filtered;
    }, [tasks, projectFilter, statusFilter]);

    useEffect(() => {
        setFilteredTasks(filterTasks());
    }, [tasks, statusFilter, filterTasks]);

    return (
        <div className="container p-6 w-full">
            <div className="mb-6 flex flex-col sm:flex-row items-center sm:justify-between">
                <h2 className="text-2xl font-bold mb-3 sm:mb-0">Task Management</h2>
                <div className="flex gap-2 w-[480px]:flex-row flex-col w-full xs:w-auto sm:w-auto xs:bg-red-200" >
                    <Select
                        defaultValue="all"
                        onValueChange={handleProjectFilterChange}
                    >
                        <SelectTrigger className='w-full sm:w-60'>
                            <SelectValue placeholder="Filter project" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Projects: All</SelectItem>
                            {projects.map(project => (
                                <SelectItem value={project.id!.toString()}>{project.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all"
                        onValueChange={handleStatusFilterChange}
                    >
                        <SelectTrigger className="w-full sm:w-32">
                            <SelectValue placeholder="Filter Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Status: All</SelectItem>
                            <SelectItem value="to_do">To Do</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                    <TaskCreateDialog isOpen={isOpen} setIsOpen={(status) => setIsOpen(status)} />
                </div>
            </div>

            <ConfirmationDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Confirm Deletion"
                message={`Are you sure you want to delete "${taskToDelete?.title}"?`}
                onConfirm={confirmDelete}
                confirmButtonText="Delete Task"
            />

            <div className="space-y-4">
                {filteredTasks.map(task => (
                    <TaskCard task={task} key={task.id} onStatusChange={handleTaskStatusChange} onTaskDelete={handleTaskDelete} />
                ))}
            </div>
        </div>
    );
};

export default TasksPage;