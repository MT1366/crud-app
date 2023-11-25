import React from "react";
import { postBook } from "../features/slicers/bookSlicer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export default function Modal() {
  const dispatch = useDispatch<AppDispatch>();

  function submitModal(book: any) {
    dispatch(postBook());
  }

  return (
    <div>
      <form onSubmit={submitModal}>
        <input type="text" />
      </form>
    </div>
  );
}
