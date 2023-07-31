import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  loginUser,
  fetchNotifications,
  fetchDashboardCards,
  fetchCpuReport,
  fetchCommitsReport,
  fetchProjects,
  createProject,
  deleteProject,
  updateProject,
} from './api';
import {
  CommitReport,
  CpuReport,
  DashboardCards,
  LoginUser,
  Notification,
  Project,
} from './types';

export const loginAsync = createAsyncThunk(
  'login/fetchUser',
  async ({
    user,
    password,
  }: {
    user: string;
    password: string;
  }): Promise<LoginUser[]> => {
    const response = await loginUser(user, password);

    if (response.length === 0) {
      throw new Error('Invalid username or password');
    }

    return response;
  },
);

export const fetchNotificationsAsync = createAsyncThunk(
  'notification/fetchNotifications',
  async (): Promise<Notification[]> => {
    return await fetchNotifications();
  },
);

export const fetchDashboardCardsAsync = createAsyncThunk(
  'dashboard/fetchDashboardCards',
  async (): Promise<DashboardCards> => {
    return await fetchDashboardCards();
  },
);

export const fetchCpuReportAsync = createAsyncThunk(
  'cpuReport/fetchCpuReport',
  async (): Promise<CpuReport> => {
    return await fetchCpuReport();
  },
);

export const fetchCommitsReportAsync = createAsyncThunk(
  'commitsReport/fetchCommitsReport',
  async (): Promise<CommitReport[]> => {
    return await fetchCommitsReport();
  },
);

export const fetchProjectsAsync = createAsyncThunk(
  'projects/fetchProjects',
  async (): Promise<Project[]> => {
    return await fetchProjects();
  },
);

export const createProjectAsync = createAsyncThunk(
  'projects/createProject',
  async (project: Project): Promise<Project> => {
    return await createProject(project);
  },
);

export const deleteProjectAsync = createAsyncThunk(
  'projects/deleteProject',
  async (id: number): Promise<number> => {
    await deleteProject(id);
    return id;
  },
);

export const updateProjectAsync = createAsyncThunk(
  'projects/updateProject',
  async (payload: {id: number; project: Project}): Promise<Project> => {
    return await updateProject(payload.id, payload.project);
  },
);
