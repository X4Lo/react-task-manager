import React, { useState } from 'react';

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

interface TssksPageProps {
    tasks: Task[];
}

const TasksPage: React.FC<TssksPageProps> = ({ tasks }: TssksPageProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="container p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Task Management</h2>
                <div className="flex gap-2">
                    <Select defaultValue="all" >
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Filter Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="to_do">To Do</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                    <TaskCreateDialog isOpen={isOpen} setIsOpen={(status) => setIsOpen(status)} />
                </div>
            </div>

            <div className="space-y-4">
                {tasks.map(task => (
                    <TaskCard task={task} key={task.id} />
                ))}
            </div>
        </div>
    );
};

export default TasksPage;