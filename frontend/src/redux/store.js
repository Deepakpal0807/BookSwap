import { configureStore } from '@reduxjs/toolkit'

import userReducer from './User/userslice'
import booksReducer from './Book/Bookslice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    books: booksReducer,
  },
})