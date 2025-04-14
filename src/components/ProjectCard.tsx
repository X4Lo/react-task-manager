import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '@/types/Project';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                </p>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;