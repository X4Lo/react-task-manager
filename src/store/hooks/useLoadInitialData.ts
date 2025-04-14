import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProjects, fetchTasks } from '@/services/api';
import { setProjects } from '../slices/projectSlice';
import { setTasks } from '../slices/taskSlice';

export const useLoadInitialData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      const [projects, tasks] = await Promise.all([
        fetchProjects(),
        fetchTasks()
      ]);
      dispatch(setProjects(projects));
      dispatch(setTasks(tasks));
    };
    loadData();
  }, [dispatch]);
};