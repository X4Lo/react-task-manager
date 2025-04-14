import React from "react";
import Navbar from "./components/layout/Navbar";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import { Project } from "./types/Project";
import { useLoadInitialData } from "./store/hooks/useLoadInitialData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { setSelectedProject } from "./store/slices/projectSlice";

const App: React.FC = () => {
  useLoadInitialData();

  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.project.projects);
  const selectedProject = useSelector((state: RootState) => state.project.selectedProject);
  const tasks = useSelector((state: RootState) => state.task.tasks);

  const handleSelectProject = (project: Project) => {
    dispatch(
      setSelectedProject(project)
    );
  };

  return (
    <>
      <Navbar />
      <Sidebar projects={projects} selectedProject={selectedProject} onSelectProject={handleSelectProject} />
      <main className="lg:pl-64">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsPage projects={projects} />} />
          <Route path="/tasks" element={<TasksPage tasks={tasks} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
