import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../store";
import { fetchBooks } from "../features/slicers/bookSlicer";

export default function AdminPanel() {
  const books = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch<AppDispatch>();

  console.log(books);
  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  return (
    <>
      <div className="p-4 shadow bg-light-blue text-white ">Admin Panel</div>
      <div className="flex flex-row">
        <div className="flex-4 bg-bgdark text-white p-2">DASHBOARD</div>
        <table className="w-full flex-4">
          <thead className="bg-bgsoft text-white text-left ">
            <tr className="p-2">
              <td>id</td>
              <td>title</td>
              <td>contnet</td>
              <td>data</td>
              <td>user id</td>
            </tr>
          </thead>
          <tbody className="text-left">
            <tr>
              <td>1</td>
              <td>Learning Redux Toolkit</td>
              <td>I've heard good things.</td>
              <td>2023-11-24 T 10:21</td>
              <td>none</td>
            </tr>
            <tr>
              <td>2</td>
              <td>You dont know js yet</td>
              <td>improve your skills every dat</td>
              <td>2023-11-24 T 22:01</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
