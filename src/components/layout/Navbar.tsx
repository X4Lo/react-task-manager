import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [currentPage] = useState<'dashboard' | 'projects' | 'tasks'>('projects');

    return (
        <main className="lg:pl-64">
            <nav className="flex gap-4 border-b p-4">
                <button
                    className={`px-4 py-2 ${currentPage === 'dashboard' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                >
                    <Link to="dashboard">
                        Dashboard
                    </Link>
                </button>
                <button
                    className={`px-4 py-2 ${currentPage === 'projects' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                >
                    <Link to="projects">
                        Projects
                    </Link>
                </button>
                <button
                    className={`px-4 py-2 ${currentPage === 'tasks' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                >
                    <Link to="tasks">
                        Tasks
                    </Link>
                </button>
            </nav>
        </main>
    );
};

export default Navbar;