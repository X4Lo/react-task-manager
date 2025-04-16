import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Task } from '@/types/Task';
import { createNewTask } from '@/store/slices/taskSlice';
import { RootState } from '@/store/store';
import { useAppDispatch } from '@/store/hooks/useAppSelector';

interface TaskFormDialog {
    isOpen: boolean;
    setIsOpen: (status: boolean) => void;
}

const TaskCreateDialog: React.FC<TaskFormDialog> = ({ isOpen, setIsOpen }: TaskFormDialog) => {
    const dispatch = useAppDispatch();
    const projects = useSelector((state: RootState) => state.project.projects);

    const [formData, setFormData] = useState({
        project: undefined as string | undefined,
        title: '',
        description: '',
        priority: '' as 'low' | 'medium' | 'high' | ''
    });

    const [errors, setErrors] = useState({
        project: '',
        title: '',
        priority: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handlePriorityChange = (value: 'low' | 'medium' | 'high') => {
        setFormData(prev => ({
            ...prev,
            priority: value
        }));
        if (errors.priority) {
            setErrors(prev => ({
                ...prev,
                priority: ''
            }));
        }
    };

    const handleProjectChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            project: value
        }));
        if (errors.project) {
            setErrors(prev => ({
                ...prev,
                project: ''
            }));
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            project: '',
            title: '',
            priority: ''
        };

        if (!formData.project) {
            newErrors.project = 'Project is required';
            valid = false;
        }

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
            valid = false;
        }

        if (!formData.priority) {
            newErrors.priority = 'Priority is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const projectId = parseInt(formData.project!);

        const newTask: Task = {
            projectId: projectId,
            title: formData.title,
            description: formData.description,
            status: 'to_do',
            priority: formData.priority as 'low' | 'medium' | 'high',
            createdAt: new Date().toISOString(),
        };

        await dispatch(createNewTask(newTask)).unwrap();

        setFormData({
            project: undefined,
            title: '',
            description: '',
            priority: ''
        });

        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                <div className='w-full space-y-2'>
                    <Label htmlFor="project">Project</Label>
                    <Select
                        value={formData.project}
                        onValueChange={handleProjectChange}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                            {projects.map(project => (
                                <SelectItem value={project.id!.toString()}>{project.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.priority && <p className="text-sm text-red-500 mt-1">{errors.priority}</p>}
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='w-full space-y-2'>
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                            value={formData.priority}
                            onValueChange={handlePriorityChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.priority && <p className="text-sm text-red-500 mt-1">{errors.priority}</p>}
                    </div>
                    <Button className="w-full" onClick={handleSubmit}>
                        Create Task
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TaskCreateDialog;