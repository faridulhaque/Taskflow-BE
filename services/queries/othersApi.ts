import { apiSlice } from "../apiSlice";
import { TaskPayload } from "../types";

const othersApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    addTask: builder.mutation({
      query: (data: TaskPayload) => ({
        url: "/tasks/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),

    getUpcomingTasks: builder.query({
      query: () => {
        console.log("Fetching upcoming tasks...");
        return {
          url: "/tasks/upcoming",
          method: "GET",
        };
      },
      providesTags: ["tasks"],
    }),

    getTodayTask: builder.query({
      query: () => ({
        url: `/tasks/today`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),

    getArchiveTasks: builder.query({
      query: () => ({
        url: `/tasks/previous`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),

    changeStatus: builder.mutation({
      query: (id: string) => ({
        url: `/tasks/status/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["tasks"],
    }),

    deleteTask: builder.mutation({
      query: (id: string) => {
        return {
          url: `/tasks/del/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["tasks"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useAddTaskMutation,
  useGetUpcomingTasksQuery,
  useGetTodayTaskQuery,
  useGetArchiveTasksQuery,
  useDeleteTaskMutation,
  useChangeStatusMutation,
} = othersApi;
