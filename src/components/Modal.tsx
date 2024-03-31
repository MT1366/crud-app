import { useEffect, useRef } from "react";
import { postBook } from "../features/slicers/bookSlicer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthor } from "../features/slicers/authorSlicer";
import { RootState, AppDispatch } from "../store";
import { useForm } from "react-hook-form";
import TextInput from "./Inputs/TextInput";
import DateInput from "./Inputs/DateInput";
// import FileInput from "./Inputs/FileInput";

interface FormData {
  title: string;
  content: string;
  date: string;
  userId: string;
  author: string;
  imageUrl: File | null;
}
interface ModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void; // Corrected type for setOpenModal
}

export default function Modal({ openModal, setOpenModal }: ModalProps) {
  const author = useSelector((state: RootState) => state.author.author);
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, formState } = useForm<FormData>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { errors } = formState;

  useEffect(() => {
    dispatch(fetchAuthor());
  }, [dispatch]);

  function onSubmit(data: FormData) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        formData.append(key, value);
      }
    }

    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append("imageUrl", fileInput.files[0]);
    }
    console.log(formData);
    dispatch(postBook(formData));
    setOpenModal(false);
  }

  return (
    <div className="relative bg-gray-500 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col container absolute left-64 w-50 rounded-md border gap-5 justify-center m-10 p-12 text-black bg-white/30 backdrop-blur-md ${
          openModal ? "animate-wiggle" : ""
        }`}
      >
        <h1 className="text-white text-lg">Add new book</h1>
        <TextInput
          register={register}
          name="title"
          placeholder="Title"
          errors={errors}
          type="text"
        />
        <TextInput
          register={register}
          name="content"
          placeholder="Content"
          errors={errors}
          type="text"
        />
        <DateInput
          register={register}
          name="date"
          placeholder="Date"
          errors={errors}
        />
        <input
          {...register("userId", {
            required: "This field is required!",
            min: {
              value: 0,
              message: "Value must be zero or higher",
            },
            max: {
              value: 1,
              message: "Value must be below one",
            },
          })}
          type="text"
          placeholder="User ID"
          name="userId"
          className="bg-bgdark p-1 rounded-md outline-none text-white"
        />
        {errors?.userId && (
          <p className="text-red-400 text-xs font-bold relative animate-bounce">
            {errors.userId.message}
          </p>
        )}

        <input
          type="file"
          placeholder="Image"
          name="imageUrl"
          className="bg-bgdark p-1 rounded-md outline-none text-white"
          ref={fileInputRef}
        />
        {errors?.imageUrl && (
          <p className="text-red-400 text-xs font-bold relative animate-bounce">
            {errors.imageUrl.message}
          </p>
        )}
        {/* <FileInput
          placeholder="image"
          name="imageUrl"
          register={register}
          errors={errors}
        /> */}
        <select
          {...register("author", {
            required: "This field is required!",
          })}
          name="author"
          id="author"
          className="bg-bgdark p-1 rounded-md outline-none text-white"
        >
          {author.map((auth) => (
            <option key={auth.id} value={auth.name}>
              {auth.name}
            </option>
          ))}
        </select>
        {errors?.author && (
          <p className="text-red-400 text-xs font-bold relative animate-bounce">
            {errors.author.message}
          </p>
        )}

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
