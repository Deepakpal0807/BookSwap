import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: {
    "FICTION": [],
    "NON-FICTION": [],
    "MYSTERY": [],
    "THRILLER": [],
    "ROMANCE": [],
    "HORROR": [],
    "SCIENCE FICTION": [],
    "FANTASY": [],
    "BIOGRAPHY": [],
    "AUTOBIOGRAPHY": [],
    "SELF-HELP": [],
    "HISTORY": [],
    "TRAVEL": [],
    "POETRY": [],
    "CHILDREN'S BOOKS": [],
    "YOUNG ADULT": [],
    "GRAPHIC NOVELS": [],
  },
  useremail: "",

  // Initial state to hold books grouped by genre
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooksByGenre: (state, action) => {
      state.books = action.payload; // Set the grouped books data
    },
    clearBooksByGenre: (state) => {
      state.books = {}; // Clear the grouped books data
    },
    setUserEmail: (state, action) => {
      state.useremail = action.payload; // Set the user email
    },
    clearUserEmail: (state) => {
      state.useremail = ""; // Clear the user email
    },
  },
});

// Export actions to be used in components
export const { setBooksByGenre, clearBooksByGenre, setUserEmail, clearUserEmail } = booksSlice.actions;

export default booksSlice.reducer;
