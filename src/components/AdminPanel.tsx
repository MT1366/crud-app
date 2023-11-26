import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../store";
import { fetchBooks } from "../features/slicers/bookSlicer";
import { fetchAuthor } from "../features/slicers/authorSlicer";

import RightBar from "./RightBar";
import Modal from "./Modal";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

export default function AdminPanel() {
  const books = useSelector((state: RootState) => state.books.books);
  const author = useSelector((state: RootState) => state.author.author);
  const loading = useSelector((state: RootState) => state.books.isLoading);
  console.log(books);

  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAuthor());
  }, [dispatch]);

  return (
    <main className="bg-bgdark text-white flex flex-col h-100 w-full">
      <div className=" flex flex-row items-center justify-between gap-8 p-5 m-4 bg-bgsoft shadow text-white rounded-md">
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
      {/* <Modal /> */}
      <div className="flex flex-row items-center">
        <div className="w-40 flex-wrap bg-bgsoft p-5 ml-4 text-white rounded-md h-full items-center">
          <h1>DASHBOARD</h1>
          <h1>DASHBOARD</h1>
          <h1>DASHBOARD</h1>
          <h1>DASHBOARD</h1>
          <h1>DASHBOARD</h1>
        </div>
        <div className="h-80 ml-2 relative flex-4">
          {loading ? (
            <div className="relative left-2/4 top-2/4 animate-bounce w-54 flex flex-4 h-5 mr-3 text-lg ">
              <p>LOADING...</p>
            </div>
          ) : (
            <div className="w-full">
              <table className="bg-bgsoft w-full h-full p-5 rounded-md text-sm">
                <thead className="text-left">
                  <tr className="border-b">
                    <td className="p-2">ID</td>
                    <td className="p-2">Title</td>
                    <td className="p-2">Content</td>
                    <td className="p-2">Date</td>
                    <td className="p-2">User-Id</td>
                    <td className="p-2">Author</td>
                  </tr>
                </thead>

                <tbody className=" bg-bgsoft text-white text-left rounded-md h-75 ">
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
                      return (
                        <>
                          <tr className="pt-2" key={id}>
                            <td className="p-2">{id}</td>
                            <td className="p-2">{title}</td>
                            <td className="p-2">{content}</td>
                            <td className="p-2">{date}</td>
                            <td className="p-2">{userId ? userId : "none"}</td>
                            <td className="p-2">{authorsName}</td>
                            <td className="">
                              <button className="rounded-sm pl-2 pr-2 bg-yellow-500">
                                Edit
                              </button>
                              <button className=" bg-red-500 rounded-sm pl-2 pr-2">
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <RightBar />
      </div>
    </main>
  );
}
