// useBookData.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchAuthor } from "../slicers/authorSlicer";
import {
  fetchBooks,
  deleteBook as deleteBookAction,
  editBook as editBookAction,
} from "../../features/slicers/bookSlicer";

const useBookData = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const author = useSelector((state: RootState) => state.author.author);
  const loading = useSelector((state: RootState) => state.books.isLoading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchAuthor());
  }, [dispatch]);

  const deleteBook = (id: string) => {
    dispatch(deleteBookAction(id));
  };

  const editBook = (editedBook: Book) => {
    dispatch(editBookAction(editedBook));
  };

  return { books, author, loading, deleteBook, editBook };
};

export default useBookData;
