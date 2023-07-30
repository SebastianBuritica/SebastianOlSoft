import {RootState} from './store';

export const selectUser = (state: RootState) => state.app.login.user;
export const selectNotifications = (state: RootState) =>
  state.app.notification.notifications;
export const selectDashboardCards = (state: RootState) =>
  state.app.dashboard.cards;
export const selectCpuReport = (state: RootState) => state.app.cpuReport.report;
export const selectCommitsReport = (state: RootState) =>
  state.app.commitsReport.report;
export const selectProjects = (state: RootState) => state.app.project.projects;
export const selectProjectsStatus = (state: RootState) =>
  state.app.project.status;
