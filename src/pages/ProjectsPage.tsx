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
import { Project } from '@/types/Project';
import ProjectCard from '@/components/ProjectCard';

interface ProjectsPageProps {
    projects: Project[];
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects }: ProjectsPageProps) => {
    return (
        <div className="container p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Projects Management</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
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
                                <Input id="name" />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" />
                            </div>
                            <Button className="w-full">Create Project</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map(project => (
                    <ProjectCard project={project} key={project.id} />
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;