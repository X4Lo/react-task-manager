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

const ProjectFormDialogProps = {

}

interface ProjectFormDialogProps {
    isOpen: boolean;
    setIsOpen: (status: boolean) => void;
}

const ProjectFormDialog: React.FC<ProjectFormDialogProps> = ({ isOpen, setIsOpen }: ProjectFormDialogProps) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleAddProject = () => {
        const newProject: Project = {
            id: Date.now(),
            name: formData.name,
            description: formData.description,
            createdAt: new Date().toISOString(),
        };
        dispatch(addProject(newProject));
        formData.name = "";
        formData.description = "";
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
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <Button className="w-full" onClick={handleAddProject}>
                        Create Project
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectFormDialog;