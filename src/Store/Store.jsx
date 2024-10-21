import { configureStore } from '@reduxjs/toolkit'

import todoSlice from '../Features/Todo/todoSlice'
export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer, // Add your slice here. For example, todoSlice, authSlice, etc.
  },
})