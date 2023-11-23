import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { useToasts } from "react-hot-toast";
import toast from "react-hot-toast/headless";

interface FormData {
  username: string;
  password: number;
}

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm<FormData>();

  const { errors } = formState;
  const navigate = useNavigate();

  function onError(errors: any) {
    console.log(errors.message);
  }

  function onSubmit(data: FormData) {
    axios
      .post("http://localhost:4000/login", data)
      .then(function (response) {
        console.log(response);
        const { token } = response.data;
        console.log(token);
        navigate("/dashboard");
      })
      .catch(function () {
        console.log(data);

        toast.error("you are not authorized.");
      });
  }

  return (
    <div className="flex flex-col justify-center md:flex-row">
      <div className="w-53 flex flex-col items-center justify-center">
        <p className="text-blue-500">Shatel CRUD app</p>
        <div className="md:w-101">
          <div className="flex flex-col justify-center shadow-md rounded-lg p-5">
            <CookiesProvider>
              <p>Log In To Admin Panel</p>
              <p>Enter your Authorized Username and Password.</p>
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className=" mt-6 flex flex-col gap-3"
              >
                <input
                  {...register("username", {
                    required: "This field is required",
                    minLength: {
                      value: 5,
                      message: "Username must be at least 5 characters",
                    },
                  })}
                  id="username"
                  type="text"
                  placeholder="Username"
                />
                {errors?.username && (
                  <p className="text-red-900 text-xs font-light relative animate-bounce">
                    {errors.username.message}
                  </p>
                )}

                <input
                  {...register("password", {
                    required: "This field is required",
                  })}
                  type="password"
                  id="password"
                  placeholder="Password"
                />
                {errors?.password && (
                  <p className="text-red-900 text-xs font-light absoulute animate-bounce">
                    {errors.password.message}
                  </p>
                )}

                <button
                  type="submit"
                  className="bg-ocean-blue text-white p-1 rounded-md hover:bg-ocean-light"
                >
                  Log In
                </button>
              </form>
            </CookiesProvider>
          </div>
        </div>
      </div>
      <div className="lg:w-50 lg:h-100 lg:bg-[url('src/assets/images/loginformimage.png')] bg-contain bg-no-repeat bg-center"></div>
    </div>
  );
}
