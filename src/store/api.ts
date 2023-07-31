import axios from 'axios';
import {
  CommitReport,
  CpuReport,
  DashboardCards,
  LoginUser,
  Notification,
  Project,
} from './types';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => snakeToCamel(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [key.replace(/(_\w)/g, matches => matches[1].toUpperCase())]:
          snakeToCamel(obj[key]),
      }),
      {},
    );
  }
  return obj;
}

api.interceptors.response.use(response => {
  response.data = snakeToCamel(response.data);
  return response;
});

export const loginUser = async (
  user: string,
  password: string,
): Promise<LoginUser[]> => {
  const response = await api.get<LoginUser[]>(
    `/login?user=${user}&password=${password}`,
  );
  return response.data;
};

export const fetchNotifications = async (): Promise<Notification[]> => {
  const response = await api.get<Notification[]>('/notification');
  return response.data;
};

export const fetchDashboardCards = async (): Promise<DashboardCards> => {
  const response = await api.get<DashboardCards>('/dashboard_cards');
  return response.data;
};

export const fetchCpuReport = async (): Promise<CpuReport> => {
  const response = await api.get<CpuReport>('/cpu_report');
  return response.data;
};

export const fetchCommitsReport = async (): Promise<CommitReport[]> => {
  const response = await api.get<CommitReport[]>('/report_commits');
  return response.data;
};

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>('/projects');
  return response.data;
};

export const createProject = async (project: Project): Promise<Project> => {
  const response = await api.post<Project>('/projects', project);
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

export const updateProject = async (
  id: number,
  project: Project,
): Promise<Project> => {
  const response = await api.put<Project>(`/projects/${id}`, project);
  return response.data;
};
