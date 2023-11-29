import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../store";
import { fetchAuthor } from "../features/slicers/authorSlicer";
import {
  deleteBook,
  editBook,
  fetchBooks,
} from "../features/slicers/bookSlicer";
import timeDifference from "../features/costumeHook/timeDiffrence";

import {
  HiInboxStack,
  HiMiniUsers,
  HiMiniShoppingBag,
  HiMiniSquare3Stack3D,
} from "react-icons/hi2";
import RightBar from "./RightBar";

import { HiMiniMagnifyingGlass } from "react-icons/hi2";

export default function AdminPanel() {
  const books = useSelector((state: RootState) => state.books.books);
  const author = useSelector((state: RootState) => state.author.author);
  const loading = useSelector((state: RootState) => state.books.isLoading);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");

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
    <main className="bg-bgdark text-white flex flex-col">
      <div className=" flex flex-row items-center justify-between p-5 m-2 bg-bgsoft shadow text-white rounded-md">
        <h1>Admin Panel</h1>
        <div className="flex items-center gap-2 bg-transparent outline-none">
          <HiMiniMagnifyingGlass />
          <input
            type="text"
            placeholder="Search Your Book..."
            className="rounded-md p-1 bg-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>ICONS</div>
      </div>
      <section className="bg-bgdark flex flex-row gap-1 m-1 p-1">
        <div className=" flex-none w-64 flex flex-col bg-bgsoft p-5 text-white rounded-md gap-10 h-f ">
          <p>User</p>
          <div className="flex gap-4 p-2 items-center hover:bg-bgdark rounded-lg cursor-pointer">
            <HiInboxStack />
            <h1>Dashboard</h1>
          </div>
          <div className="flex gap-4 p-2 items-center hover:bg-bgdark rounded-lg cursor-pointer">
            <HiMiniShoppingBag />
            <h1>Card</h1>
          </div>
          <p>Setting</p>
          <div className="flex gap-4 p-2 items-center hover:bg-bgdark rounded-lg cursor-pointer">
            <HiMiniUsers />
            <h1>Profile</h1>
          </div>
          <div className="flex gap-4 p-2 items-center hover:bg-bgdark rounded-lg cursor-pointer">
            <HiMiniSquare3Stack3D />
            <h1>Transactions</h1>
          </div>
        </div>
        <div className="flex flex-1 h-fit">
          <div className="h-full ml-1 flex-4">
            {loading ? (
              <div className="relative left-2/4 top-2/4 animate-bounce w-54 flex flex-4 h-5 mr-3 text-lg ">
                <p>LOADING...</p>
              </div>
            ) : (
              <div className="w-full">
                <table className="bg-bgsoft rounded-md text-sm w-full">
                  <thead className="text-left bg-bgdark">
                    <tr className="border-b">
                      <td className="p-2">ID</td>
                      <td className="p-2">Title</td>
                      <td className="p-2">Content</td>
                      <td className="p-2">Date</td>
                      <td className="p-2">User-Id</td>
                      <td className="p-2">Author</td>
                    </tr>
                  </thead>
                  <tbody className="bg-bgsoft text-white text-left rounded-md">
                    {books
                      .filter(
                        (book) =>
                          book.title &&
                          book.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      )
                      .map(({ id, title, content, date, userId }) => {
                        const authorsName =
                          author.find((a) => a.id === userId)?.name || "none";
                        const timeAgo = timeDifference(date);
                        return (
                          <tr className="pt-1" key={id}>
                            <td className="p-2">{id}</td>
                            <td className="p-2">
                              {editingBook && editingBook.id === id ? (
                                <input
                                  className="text-black w-10"
                                  type="text"
                                  value={editingBook.title}
                                  onChange={(e) =>
                                    setEditingBook({
                                      ...editingBook,
                                      title: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                title
                              )}
                            </td>{" "}
                            <td className="p-2">
                              {editingBook && editingBook.id === id ? (
                                <input
                                  className="text-black w-10"
                                  type="text"
                                  value={editingBook.content}
                                  onChange={(e) =>
                                    setEditingBook({
                                      ...editingBook,
                                      content: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                content
                              )}
                            </td>
                            <td className="p-2">
                              {editingBook && editingBook.id === id ? (
                                <input
                                  className="text-black w-10"
                                  type="date"
                                  value={editingBook.date}
                                  onChange={(e) =>
                                    setEditingBook({
                                      ...editingBook,
                                      date: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                timeAgo
                              )}
                            </td>{" "}
                            <td className="p-2">
                              {editingBook && editingBook.id === id ? (
                                <input
                                  className="text-black w-10"
                                  type="text"
                                  value={editingBook.userid}
                                  onChange={(e) =>
                                    setEditingBook({
                                      ...editingBook,
                                      userId: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                userId
                              )}
                            </td>{" "}
                            <td className="p-2">{authorsName}</td>
                            <td className="flex items-center p-5 gap-2">
                              {editingBook && editingBook.id === id ? (
                                <>
                                  <button
                                    className="rounded-md p-2 bg-green-500"
                                    onClick={() => handleSaveEdit(editingBook)}
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="rounded-md p-2 bg-red-500"
                                    onClick={handleCancelEdit}
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <button
                                  className="rounded-md p-2 bg-yellow-500"
                                  onClick={() =>
                                    handleEditClick({
                                      id,
                                      title,
                                      content,
                                      date,
                                      userId,
                                    })
                                  }
                                >
                                  Edit
                                </button>
                              )}

                              {editingBook && editingBook.id === id ? (
                                ""
                              ) : (
                                <button
                                  className="rounded-md p-2 bg-red-500"
                                  onClick={() => dispatch(deleteBook(id))}
                                >
                                  Delete
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row flex-64 items-center ">
          <RightBar />
        </div>
      </section>
    </main>
  );
}
