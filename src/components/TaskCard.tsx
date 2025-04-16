import { Check, Circle, Loader2, Settings, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/Task';

interface TaskCardProps {
    task: Task;
    onStatusChange: (task: Task, status: string) => void;
    onTaskDelete: (task: Task) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onTaskDelete }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <CardTitle className="text-base">{task.title}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {task.description}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className={`rounded px-2 py-1 text-xs font-medium ${task.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : task.status === 'in_progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                    >
                        {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>

                    <div
                        className={`rounded px-2 py-1 text-xs ${task.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : task.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                    >
                        {task.priority}
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => onStatusChange(task, 'to_do')}
                                className={task.status === 'to_do' ? 'bg-accent' : ''}
                            >
                                <Circle className="mr-2 h-4 w-4 text-gray-500" />
                                Set To Do
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onStatusChange(task, 'in_progress')}
                                className={task.status === 'in_progress' ? 'bg-accent' : ''}
                            >
                                <Loader2 className="mr-2 h-4 w-4 text-blue-500" />
                                Set In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onStatusChange(task, 'completed')}
                                className={task.status === 'completed' ? 'bg-accent' : ''}
                            >
                                <Check className="mr-2 h-4 w-4 text-green-500" />
                                Set Completed
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => onTaskDelete(task)}
                                className="text-destructive focus:text-destructive"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
        </Card>
    );
};

export default TaskCard;