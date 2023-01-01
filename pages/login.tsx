import { Formik } from "formik";
import Link from "next/link";
import React from "react";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-96 p-5 my-12 mx-auto rounded-md border ">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: any = {};

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);

            signIn("credentials", {
              redirect: false,
              email: values.email,
              password: values.password,
            });
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold mb-4 ">Login</h1>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500"
                id="email"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <>
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                </>
              )}
            </div>

            <div className="mb-4 ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Password
              </label>

              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500"
                  id="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {errors.password && touched.password && (
                  <>
                    <p className="text-red-500 text-xs italic">
                      {errors.password}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="mb-4 ">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-pink-500 accent-pink-500"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
            </div>

            <div className="mb-1 ">
              <button
                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500 w-full"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
            </div>

            <div className="mb-4 flex justify-end ">
              <a
                className="block align-baseline font-bold text-sm text-zinc-500 hover:text-zinc-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>

            <div className="relative mb-4">
              <hr className="my-3" />

              <div className="absolute top-[-13px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-gray-500">
                or
              </div>
            </div>

            <div className="mb-4 ">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500 w-full"
                onClick={() => {
                  signIn("facebook", { callbackUrl: "http://localhost:3000" });
                }}
              >
                Login with Facebook
              </button>

              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500 w-full mt-2"
                onClick={() => {
                  signIn("google", { callbackUrl: "http://localhost:3000" });
                }}
              >
                Login with Google
              </button>

              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500 w-full mt-2"
                onClick={() => {
                  signIn("github", { callbackUrl: "http://localhost:3000" });
                }}
              >
                Login with Github
              </button>
            </div>

            <div className="mb-4 text-center ">
              <p>
                Need an account?{" "}
                <Link
                  className="inline-block align-baseline font-bold text-sm text-zinc-500 hover:text-zinc-800"
                  href="register"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
