import { LayoutDashboard } from 'lucide-react';
import { Project } from '@/types/Project';
import { useState } from 'react';
import ProjectCreateDialog from '../ProjectCreateDialog';

interface SidebarProps {
    projects: Project[];
    selectedProject: Project | null;
    onSelectProject: (project: Project) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ projects, selectedProject, onSelectProject }) => {
    const [isOpen, setIsOpen] = useState(false);

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
                <div className="w-full">
                    <ProjectCreateDialog isOpen={isOpen} setIsOpen={(status) => setIsOpen(status)} />
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;