import { apiSlice } from "../apiSlice";
import { TaskPayload } from "../types";

const othersApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    addTask: builder.mutation({
      query: (data: TaskPayload) => ({
        url: "/task/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),

    getUpcomingTasks: builder.query({
      query: (email: string) => ({
        url: `/task/upcoming/${email}`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),

    getTodayTask: builder.query({
      query: (email: string) => ({
        url: `/task/today/${email}`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),

    getArchiveTasks: builder.query({
      query: (email: string) => ({
        url: `/task/previous/${email}`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),

    changeStatus: builder.mutation({
      query: (id: string) => ({
        url: `/task/status/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["tasks"],
    }),

    deleteTask: builder.mutation({
      query: (id: string) => {
        return {
          url: `/task/del/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetUpcomingTasksQuery,
  useGetTodayTaskQuery,
  useGetArchiveTasksQuery,
  useDeleteTaskMutation,
  useChangeStatusMutation,
} = othersApi;
