import { Formik } from "formik";
import Link from "next/link";
import React from "react";

import { useSession, signIn, signOut } from "next-auth/react";
import Router from "next/router";

export default function Register() {
  return (
    <div className="w-96 p-5 my-12 mx-auto rounded-md border ">
      <h1 className="text-4xl font-bold mb-4 ">Register</h1>

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
        onSubmit={(values, { setSubmitting, setErrors }) => {
          setTimeout(async () => {
            const { email, password } = values;

            await fetch("/api/auth/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            }).then((res) => {
              res.json().then((data) => {
                if (data.error == "User already exists") {
                  setErrors({ email: "User already exists" });
                }

                if (res.status == 200) {
                  signIn("credentials", {
                    email,
                    password,
                    callbackUrl: "http://localhost:3000",
                  });

                  Router.push("/");
                }
              });
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
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
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
                htmlFor="password"
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

            <div className="mb-1 ">
              <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500 w-full">
                Register
              </button>
            </div>

            <div className="relative mb-4">
              <hr className="my-4" />

              <div className="absolute top-[-11px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-gray-500">
                or
              </div>
            </div>

            <div className="mb-4 ">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500 w-full mb-2"
                onClick={(e) => {
                  e.preventDefault();
                  signIn("github", { callbackUrl: "http://localhost:3000" });
                }}
              >
                Register with Github
              </button>

              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500 w-full mb-2"
                onClick={(e) => {
                  e.preventDefault();
                  signIn("google", { callbackUrl: "http://localhost:3000" });
                }}
              >
                Register with Google
              </button>

              {/* <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500 w-full"
                onClick={(e) => {
                  e.preventDefault();
                  signIn("facebook", { callbackUrl: "http://localhost:3000" });
                }}
              >
                Register with Facebook
              </button> */}
            </div>

            <div className="mb-4 text-center ">
              <p>
                Already have an account?{" "}
                <Link
                  className="inline-block align-baseline font-bold text-sm text-zinc-500 hover:text-zinc-800"
                  href="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
