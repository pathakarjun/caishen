"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(5, "Username must have more than 4 characters")
    .max(50),
  password: z
    .string()
    .min(1, "Password is required")
    .min(9, "Password must have than 8 characters"),
});

const SignInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const submitData = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast.error("Invalid Username or Password");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5 py-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full ">
          <div className="flex items-center xl:p-10">
            <form
              className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
              onSubmit={handleSubmit(submitData)}
            >
              <h3 className="mb-3 text-4xl font-extrabold text-indigo-950">
                Sign In
              </h3>
              <p className="mb-4 text-slate-500/85">
                Enter your username and password
              </p>
              <a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-indigo-900 bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:ring-slate-300">
                <img
                  className="h-5 mr-2"
                  src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                  alt=""
                />
                Sign in with Google
              </a>
              <div className="flex items-center mb-3">
                <hr className="h-0 border-b border-solid border-slate-200 grow" />
                <p className="mx-4 text-slate-400">or</p>
                <hr className="h-0 border-b border-solid border-slate-200 grow" />
              </div>
              <label
                htmlFor="username"
                className="mb-2 text-sm text-start text-indigo-950"
              >
                Username*
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter a username"
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-slate-200 mb-7 placeholder:text-slate-500/85 bg-slate-100 text-indigo-950 rounded-2xl"
                {...register("username")}
              />
              {errors.username && (
                <div className="-mt-7 mb-4 text-left">
                  <span className="text-red-700 text-xs">
                    {errors.username.message}
                  </span>
                </div>
              )}
              <label
                htmlFor="password"
                className="mb-2 text-sm text-start text-indigo-950"
              >
                Password*
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter a password"
                autoComplete="on"
                className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-slate-200 placeholder:text-slate-500/85 bg-slate-100 text-indigo-950 rounded-2xl"
                {...register("password")}
              />
              {errors.password && (
                <div className="-mt-5 mb-2 text-left">
                  <span className="text-red-700 text-xs">
                    {errors.password.message}
                  </span>
                </div>
              )}
              <div className="flex flex-row justify-between mb-8">
                <label className="relative inline-flex items-center mr-3 cursor-pointer select-none"></label>
                <a href="" className="mr-4 text-sm font-medium text-indigo-500">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-100 bg-indigo-500"
              >
                Sign In
              </button>
              <p className="text-sm leading-relaxed text-indigo-950">
                Not registered yet? &nbsp;
                <a href="/sign-up" className="font-bold text-slate-500/85">
                  Create an Account
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
