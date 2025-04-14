import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import { Project } from "./types/Project";

const App: React.FC = () => {
  const projects = [
    {
      "id": 1,
      "name": "Website Redesign",
      "description": "Redesign the company website with modern UI",
      "createdAt": "2023-05-15T10:00:00Z"
    },
    {
      "id": 2,
      "name": "Mobile App Development",
      "description": "Develop a mobile app for iOS and Android",
      "createdAt": "2023-06-01T09:15:00Z"
    },
    {
      "id": 3,
      "name": "Marketing Campaign",
      "description": "Q3 Marketing campaign planning and execution",
      "createdAt": "2023-06-20T08:00:00Z"
    }
  ] as Project[];

  const [selectedProject, setSelectProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectProject(project);
  };

  return (
    <>
      <Navbar />
      <Sidebar projects={projects} selectedProject={selectedProject} onSelectProject={handleSelectProject} />
      <main className="lg:pl-64">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsPage projects={projects} />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
