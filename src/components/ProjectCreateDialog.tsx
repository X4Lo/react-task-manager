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
import { addProject } from '@/store/slices/projectSlice';
import { Project } from '@/types/Project';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface ProjectFormDialogProps {
    isOpen: boolean;
    setIsOpen: (status: boolean) => void;
}

const ProjectCreateDialog: React.FC<ProjectFormDialogProps> = ({ isOpen, setIsOpen }: ProjectFormDialogProps) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const [errors, setErrors] = useState({
        name: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            name: ''
        };

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const newProject: Project = {
            id: Date.now(),
            name: formData.name,
            description: formData.description,
            createdAt: new Date().toISOString(),
        };

        dispatch(addProject(newProject));

        setFormData({
            name: '',
            description: '',
        });

        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="">
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <Button className="w-full" onClick={handleSubmit}>
                        Create Project
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectCreateDialog;