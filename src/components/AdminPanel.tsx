import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../store";
import { fetchAuthor } from "../features/slicers/authorSlicer";
import {
  deleteBook,
  editBook,
  fetchBooks,
} from "../features/slicers/bookSlicer";
import timeDifference from "../features/costumeHook/timeDiffrence";

import RightBar from "./RightBar";
import AdminHeader from "./AdminHeader";
import LeftBar from "./AdminLeftBar";
import Table from "./Table";

import { Book } from "../features/Types/Book";
import Loader from "./Loader";

interface AdminPanelProps {
  // Remove openModal prop
}

export default function AdminPanel({}: AdminPanelProps) {
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const books = useSelector((state: RootState) => state.books.books);
  const author = useSelector((state: RootState) => state.author.author);
  const loading = useSelector((state: RootState) => state.books.isLoading);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchAuthor());
  }, [dispatch]);

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  const handleSaveEdit = (editedBook: Book) => {
    dispatch(editBook(editedBook));
    setEditingBook(null);
  };

  return (
    <main className={"flex flex-col bg-black text-white h-screen"}>
      <AdminHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <section className="bg-black flex flex-row gap-1 m-1 p-1">
        <LeftBar />

        <div className="flex">
          <div className="ml-1">
            {loading ? (
              <Loader />
            ) : (
              <div className="">
                <Table
                  dispatch={dispatch}
                  books={books}
                  author={author}
                  editingBook={editingBook}
                  setEditingBook={setEditingBook}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  timeDifference={timeDifference}
                  handleEditClick={handleEditClick}
                  handleCancelEdit={handleCancelEdit}
                  handleSaveEdit={handleSaveEdit}
                  deleteBook={deleteBook}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              </div>
            )}
          </div>
        </div>
        <RightBar />
      </section>
    </main>
  );
}
