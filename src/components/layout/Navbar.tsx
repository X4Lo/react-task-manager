import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <main className="lg:pl-64">
            <nav className="flex gap-4 border-b p-3">
                <button
                    className={`px-4 py-2 ${isActive("/") ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                >
                    <Link to="">
                        Dashboard
                    </Link>
                </button>
                <button
                    className={`px-4 py-2 ${isActive("/projects") ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                >
                    <Link to="projects">
                        Projects
                    </Link>
                </button>
                <button
                    className={`px-4 py-2 ${isActive("/tasks") ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
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