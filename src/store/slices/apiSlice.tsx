import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a type for your Todo
export interface Todo {
  id: number;
  text: string;
  status: 'todo' | 'inProgress' | 'done';
}

// Define your API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://66b6ec8d7f7b1c6d8f1a74d1.mockapi.io/api/v1' }), // Ensure this is the correct base URL
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/todo',
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (newTodo) => ({
        url: '/todo',
        method: 'POST',
        body: newTodo,
      }),
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query: (updatedTodo) => ({
        url: `/todo/${updatedTodo.id}`,
        method: 'PUT',
        body: updatedTodo,
      }),
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `/todo/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
