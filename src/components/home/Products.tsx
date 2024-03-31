import { useState, useEffect } from "react";
import { fetchBooks } from "../../features/slicers/bookSlicer";
import { RootState, AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";

import { HiMiniShoppingCart } from "react-icons/hi2";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { HiMiniArrowRight } from "react-icons/hi2";

function Products() {
  const books = useSelector((state: RootState) => state.books.books);
  const isLoading = useSelector((state: RootState) => state.books.isLoading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  return (
    <>
      <div className="flex flex-row-reverse items-center justify-between ml-24 mr-24 mt-10">
        <div className="flex gap-5 text-white text-2xl">
          <HiMiniArrowLeft className="hover:cursor-pointer" />
          <HiMiniArrowRight className="bg-orange text-dark rounded-full hover:cursor-pointer" />
        </div>
        <div className="">
          <p className="text-md text-white pb-5">Products</p>
          <p className="text-3xl text-white font-bold">
            Top <span className="text-orange">Sales</span>
          </p>
        </div>
      </div>

      <section className="flex flex-wrap justify-center ml-0 mt-10 mb-10">
        {isLoading ? (
          <div>
            <p>LOADING...</p>
          </div>
        ) : (
          books.map(({ title, content, date, imageUrl }) => {
            return (
              <div
                className="flex flex-col relative w-30 h-50 ml-24 mt-5 text-white bg-dark shadow-2xl rounded-lg p-5 gap-2 border-gray-500 hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-100"
                key={title}
              >
                <img className="h-30" src={imageUrl} />
                <p className="font-bold">{title}</p>
                <p className="text-sm">{content}</p>
                <p>{date.toString()}</p>
                <section className="flex justify-around items-center absolute top-[430px] gap-[195px]">
                  <p>Cost</p>
                  <HiMiniShoppingCart className="rounded-full text-lg text-orange" />
                </section>
              </div>
            );
          })
        )}
      </section>
    </>
  );
}

export default Products;
