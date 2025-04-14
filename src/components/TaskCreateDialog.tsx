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
import { useDispatch, useSelector } from 'react-redux';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Task } from '@/types/Task';
import { addTask } from '@/store/slices/taskSlice';
import { RootState } from '@/store/store';

interface TaskFormDialog {
    isOpen: boolean;
    setIsOpen: (status: boolean) => void;
}

const TaskCreateDialog: React.FC<TaskFormDialog> = ({ isOpen, setIsOpen }: TaskFormDialog) => {
    const dispatch = useDispatch();
    const selectedProject = useSelector((state: RootState) => state.project.selectedProject);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: '' as 'low' | 'medium' | 'high' | ''
    });

    const [errors, setErrors] = useState({
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

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            title: '',
            priority: ''
        };

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

    const handleSubmit = () => {
        if (!validateForm()) return;

        if (!selectedProject) return;

        const newTask: Task = {
            id: Date.now(),
            projectId: selectedProject.id,
            title: formData.title,
            description: formData.description,
            status: 'to_do',
            priority: formData.priority as 'low' | 'medium' | 'high',
            createdAt: new Date().toISOString(),
        };

        dispatch(addTask(newTask));

        setFormData({
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
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='w-full'>
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                            value={formData.priority}
                            onValueChange={handlePriorityChange}
                        >
                            <SelectTrigger>
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