import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";

interface FormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);

  function onError(errors: any) {
    console.log(errors.message);
  }

  function onSubmit(data: FormData) {
    axios
      .post("http://localhost:4000/login", data)
      .then(function (response) {
        const { token } = response.data;
        const { role } = response.data.user;
        console.log(role);
        if (role === "admin") {
          setCookie("token", token);
          navigate("/dashboard");
          toast.success(`You are authorized as an ${role} 😀 `);
        } else {
          toast.success(`You are ${role}`);
          navigate("/client");
        }
      })
      .catch(function () {
        console.log(data);
        toast.error("You are not authorized.");
      });
  }

  return (
    <div className="flex flex-col justify-center md:flex-row">
      <div className="w-53 flex flex-col items-center justify-center">
        <p className="text-blue-500 mb-10">Login to Shatel CRUD app</p>
        <div className="md:w-101">
          <div className="flex flex-col gap-5 justify-center shadow-lg border rounded-lg p-5">
            <CookiesProvider>
              <p>Enter your Authorized Username and Password.</p>
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className=" mt-10 flex flex-col gap-6"
              >
                <input
                  className="border p-2 shadow rounded "
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
                  className="border p-2 shadow rounded "
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
