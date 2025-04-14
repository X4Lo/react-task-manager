import { LayoutDashboard, Plus } from 'lucide-react';
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

interface SidebarProps {
    projects: Project[];
    selectedProject: Project | null;
    onSelectProject: (project: Project) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ projects, selectedProject, onSelectProject }) => {
    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card lg:block">
            <div className="flex h-16 items-center border-b px-6">
                <LayoutDashboard className="mr-2 h-6 w-6" />
                <h1 className="text-lg font-semibold">Project Dashboard</h1>
            </div>
            <nav className="space-y-2 p-4">
                {projects.map(project => (
                    <button
                        key={project.id}
                        onClick={() => onSelectProject(project)}
                        className={`w-full rounded-lg px-4 py-2 text-left hover:bg-accent ${selectedProject?.id === project.id ? 'bg-accent' : ''
                            }`}
                    >
                        {project.name}
                    </button>
                ))}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full">
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
            </nav>
        </aside>
    );
};

export default Sidebar;