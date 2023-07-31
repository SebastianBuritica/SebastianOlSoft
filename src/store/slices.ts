import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  loginAsync,
  fetchNotificationsAsync,
  fetchDashboardCardsAsync,
  fetchCpuReportAsync,
  fetchCommitsReportAsync,
  fetchProjectsAsync,
  createProjectAsync,
  deleteProjectAsync,
  updateProjectAsync,
} from './thunks';
import {
  CommitReport,
  CpuReport,
  DashboardCards,
  LoginUser,
  Notification,
  Project,
} from './types';

interface LoginState {
  user: null | LoginUser;
  status: 'idle' | 'loading' | 'failed';
}

interface NotificationState {
  notifications: Notification[];
  status: 'idle' | 'loading' | 'failed';
}

interface DashboardState {
  cards: DashboardCards | null;
  status: 'idle' | 'loading' | 'failed';
}

interface CpuReportState {
  report: CpuReport | null;
  status: 'idle' | 'loading' | 'failed';
}

interface CommitsReportState {
  report: CommitReport[] | null;
  status: 'idle' | 'loading' | 'failed';
}

interface ProjectsState {
  projects: Project[] | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState = {
  login: {
    user: null,
    status: 'idle',
  } as LoginState,
  notification: {
    notifications: [],
    status: 'idle',
  } as NotificationState,
  dashboard: {
    cards: null,
    status: 'idle',
  } as DashboardState,
  cpuReport: {
    report: null,
    status: 'idle',
  } as CpuReportState,
  commitsReport: {
    report: null,
    status: 'idle',
  } as CommitsReportState,
  project: {
    projects: null,
    status: 'idle',
  } as ProjectsState,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state.login.status = 'loading';
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<LoginUser[]>) => {
          state.login.status = 'idle';
          state.login.user = action.payload[0];
        },
      )
      .addCase(loginAsync.rejected, state => {
        state.login.status = 'failed';
      })
      .addCase(fetchNotificationsAsync.pending, state => {
        state.notification.status = 'loading';
      })
      .addCase(
        fetchNotificationsAsync.fulfilled,
        (state, action: PayloadAction<Notification[]>) => {
          state.notification.status = 'idle';
          state.notification.notifications = action.payload;
        },
      )
      .addCase(fetchNotificationsAsync.rejected, state => {
        state.notification.status = 'failed';
      })
      .addCase(fetchDashboardCardsAsync.pending, state => {
        state.dashboard.status = 'loading';
      })
      .addCase(
        fetchDashboardCardsAsync.fulfilled,
        (state, action: PayloadAction<DashboardCards>) => {
          state.dashboard.status = 'idle';
          state.dashboard.cards = action.payload;
        },
      )
      .addCase(fetchDashboardCardsAsync.rejected, state => {
        state.dashboard.status = 'failed';
      })
      .addCase(fetchCpuReportAsync.pending, state => {
        state.cpuReport.status = 'loading';
      })
      .addCase(
        fetchCpuReportAsync.fulfilled,
        (state, action: PayloadAction<CpuReport>) => {
          state.cpuReport.status = 'idle';
          state.cpuReport.report = action.payload;
        },
      )
      .addCase(fetchCpuReportAsync.rejected, state => {
        state.cpuReport.status = 'failed';
      })
      .addCase(fetchCommitsReportAsync.pending, state => {
        state.commitsReport.status = 'loading';
      })
      .addCase(
        fetchCommitsReportAsync.fulfilled,
        (state, action: PayloadAction<CommitReport[]>) => {
          state.commitsReport.status = 'idle';
          state.commitsReport.report = action.payload;
        },
      )
      .addCase(fetchCommitsReportAsync.rejected, state => {
        state.commitsReport.status = 'failed';
      })
      .addCase(fetchProjectsAsync.pending, state => {
        state.project.status = 'loading';
      })
      .addCase(
        fetchProjectsAsync.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.project.status = 'idle';
          state.project.projects = action.payload;
        },
      )
      .addCase(fetchProjectsAsync.rejected, state => {
        state.project.status = 'failed';
      })
      .addCase(createProjectAsync.pending, state => {
        state.project.status = 'loading';
      })
      .addCase(
        createProjectAsync.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.project.status = 'idle';
          if (state.project.projects) {
            state.project.projects.push(action.payload);
          } else {
            state.project.projects = [action.payload];
          }
        },
      )
      .addCase(createProjectAsync.rejected, state => {
        state.project.status = 'failed';
      })
      .addCase(deleteProjectAsync.pending, state => {
        state.project.status = 'loading';
      })
      .addCase(
        deleteProjectAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.project.status = 'idle';
          if (state.project.projects) {
            state.project.projects = state.project.projects.filter(
              project => project.id !== action.payload,
            );
          }
        },
      )
      .addCase(deleteProjectAsync.rejected, state => {
        state.project.status = 'failed';
      })
      .addCase(updateProjectAsync.pending, state => {
        state.project.status = 'loading';
      })
      .addCase(
        updateProjectAsync.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.project.status = 'idle';
          if (state.project.projects) {
            const index = state.project.projects.findIndex(
              project => project.id === action.payload.id,
            );
            if (index > -1) {
              state.project.projects[index] = action.payload;
            }
          }
        },
      )
      .addCase(updateProjectAsync.rejected, state => {
        state.project.status = 'failed';
      });
  },
});

export default {app: appSlice.reducer};
