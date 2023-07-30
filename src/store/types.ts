export interface LoginUser {
  id: number;
  userId: number;
  user: string;
  password: string;
}

export interface Notification {
  id: number;
  type: string;
  details: string;
  time: string;
}

export interface DashboardCards {
  projects: number;
  projectsDev: number;
  pendingNc: number;
  errorsDeploy: number;
}

export interface TimeValue {
  time: string;
  value: number;
}

export interface CpuReport {
  percentage_time: number;
  deploys: number;
  time: TimeValue[];
}

export interface CommitReport {
  month: number;
  feat: number;
  fix: number;
}

export interface Project {
  id: number;
  projectName: string;
  repoUrl: string;
  client: string;
  developers: string;
  ci: boolean;
  cd: boolean;
  frontendTecnology: string;
  backendTecnology: string;
  databases: string;
  errorsCount: number;
  warningCount: number;
  deployCount: number;
  percentageCompletion: number;
  reportNc: number;
  status: string;
}
