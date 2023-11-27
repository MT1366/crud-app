import React, { useEffect, useState } from "react";
import { postBook } from "../features/slicers/bookSlicer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthor } from "../features/slicers/authorSlicer";
import { RootState, AppDispatch } from "../store";

interface FormData {
  title: string;
  content: string;
  date: string;
  userId: string;
  author: string;
}

export default function Modal() {
  const author = useSelector((state: RootState) => state.author.author);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    date: "",
    userId: "",
    author: "",
  });

  useEffect(() => {
    dispatch(fetchAuthor());
  }, [dispatch]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function submitModal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(postBook(formData));
  }

  return (
    <div>
      <form
        onSubmit={submitModal}
        className="flex flex-col rounded-md border relative left w-40 gap-5 justify-center m-8 p-5 text-black"
      >
        <h1 className="text-white">Add new book</h1>
        <input
          type="text"
          placeholder="Title..."
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="bg-bgdark p-1 rounded-md outline-none text-white"
        />
        <input
          type="text"
          placeholder="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="bg-bgdark p-1 rounded-md outline-none text-white"
        />
        <input
          type="date"
          placeholder="Date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="bg-bgdark p-1 rounded-md outline-none text-white"
        />
        <input
          type="text"
          placeholder="User ID"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          className="bg-bgdark p-1 rounded-md outline-none text-white"
        />

        <select
          name="author"
          onChange={handleSelectChange}
          className="bg-bgdark p-1 rounded-md outline-none text-white"
        >
          {author.map((auth) => (
            <option key={auth.id} value={auth.name}>
              {auth.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white p-1 rounded-md "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
