import { AlertCircle, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/Task';

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
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
                                <AlertCircle className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                Set To Do
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Set In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Set Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
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