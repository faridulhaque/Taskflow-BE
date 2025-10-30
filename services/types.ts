export type OnboardingPayload = {
  email: string;
  password: string;
};
export type TaskPayload = {
  _id?: string;
  email: string;
  title: string;
  description: string;
  date: string;
  time: string;
  complete: boolean;
};

export type TTaskListComponent = {
  data: TaskPayload[];
  deleting: boolean;
  changing: boolean;
  deleteTask: (id: string) => void;
  changeStatus: (id: string) => void;
  email: string | null;
  dataLoading: boolean;
};
