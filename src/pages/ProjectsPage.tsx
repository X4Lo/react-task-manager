import { Project } from '@/types/Project';
import ProjectCard from '@/components/ProjectCard';
import { useState } from 'react';
import ProjectCreateDialog from '@/components/ProjectCreateDialog';

interface ProjectsPageProps {
    projects: Project[];
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects }: ProjectsPageProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="container p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Projects Management</h2>
                <ProjectCreateDialog isOpen={isOpen} setIsOpen={(status) => setIsOpen(status)} />
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