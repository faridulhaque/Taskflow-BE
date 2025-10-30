export type signInPayload = {
  email: string;
  password: string;
};

export type signUpPayload = {
  email: string;
  password: string;
  name: string;
};
export type TaskPayload = {
  _id?: string;
  email: string;
  title: string;
  date: string;
  time: string;
  complete: boolean;
};

export type AddTaskType = {
  title: string;
  date: string;
  time: string;
};
