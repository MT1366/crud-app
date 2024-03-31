import React, { useState } from "react";
import { Book } from "../features/Types/Book";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Loader from "./Loader";

// for using react hook form
// interface InputData {
//   title: string;
//   content: string;
//   date: string;
//   userId: string;
// }

interface Author {
  id: number;
  name: string;
}

interface TableProps {
  books: Book[];
  author: Author[];
  editingBook: Book | null;
  setEditingBook: React.Dispatch<React.SetStateAction<Book | null>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  deleteBook: (id: number) => void;
  timeDifference: (date: string) => string;
  handleEditClick: (book: Book) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: (book: Book) => void;
  dispatch: (action: any) => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const Table: React.FC<TableProps> = ({
  books,
  author,
  editingBook,
  setEditingBook,
  searchTerm,
  deleteBook,
  timeDifference,
  handleEditClick,
  handleCancelEdit,
  handleSaveEdit,
  dispatch,
  openModal,
  setOpenModal,
}) => {
  const loading = useSelector((state: RootState) => state.books.isLoading);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <table className="table-auto border-separate border-spacing-1 bg-dark w-53 h-70">
      {loading ? (
        <Loader />
      ) : (
        <>
          {openModal && (
            <Modal openModal={openModal} setOpenModal={setOpenModal} />
          )}
          <thead className="text-center bg-black rounded-lg ">
            <tr className="">
              <th className="border border-slate-600 leading-2">ID</th>
              <th className="border border-slate-600">Title</th>
              <th className="border border-slate-600">Content</th>
              <th className="border border-slate-600">Date</th>
              <th className="border border-slate-600">User-Id</th>
              <th className="border border-slate-600">Author</th>
              <button
                onClick={() => setOpenModal(!openModal)}
                className="rounded bg-green-500"
              >
                Add Book
              </button>
            </tr>
          </thead>
          <tbody className="bg-dark text-white rounded-md ">
            {currentItems
              .filter(
                (book) =>
                  book.title &&
                  book.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(({ id, title, content, date, userId, imageUrl }) => {
                const authorsName =
                  author.find((a) => a.id === userId)?.name || "none";
                const timeAgo = timeDifference(date);
                return (
                  <tr className="border border-slate-700" key={id}>
                    <td className="border border-slate-700 text-center">
                      {id}
                    </td>
                    <td className="border border-slate-700">
                      {editingBook && editingBook.id === id ? (
                        <input
                          className=""
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
                        <div className="flex gap-2 items-center">
                          <img src={imageUrl} className="w-10 h-10" />
                          <p>{title}</p>
                        </div>
                      )}
                    </td>
                    <td className="p-2 border border-slate-700">
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
                    <td className="p-2 border border-slate-700">
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
                    <td className="border border-slate-700 text-center">
                      {editingBook && editingBook.id === id ? (
                        <input
                          className="text-black w-10"
                          type="text"
                          value={editingBook.userId}
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
                    <td className="border border-slate-700">{authorsName}</td>
                    <td className="flex items-center p-5 gap-2 border border-slate-700">
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
                          type="submit"
                          onClick={() =>
                            handleEditClick({
                              id,
                              title,
                              content,
                              date,
                              userId,
                              imageUrl,
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
          <tfoot>
            <tr>
              <td colSpan={2}>
                <div className="flex justify-around">
                  <div>
                    Page {currentPage} of {totalPages}
                  </div>

                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>{" "}
        </>
      )}
    </table>
  );
};

export default Table;
