import React from "react";

export default function Login() {
  return (
    <div className="w-96 p-5 my-20 mx-auto rounded-md border ">
      <h1 className="text-4xl font-bold mb-4 ">Login</h1>

      <div className="mb-4 ">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500"
          id="username"
          type="text"
        />
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
            id="username"
            type="text"
          />
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
        <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500 w-full">
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500 w-full">
          Login with Facebook
        </button>

        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500 w-full mt-2">
          Login with Google
        </button>

        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500 w-full mt-2">
          Login with Github
        </button>
      </div>

      {/* // Already a user? login */}
      <div className="mb-4 text-center ">
        <p>
          Don&apos;t have an account?{" "}
          <a
            className="inline-block align-baseline font-bold text-sm text-zinc-500 hover:text-zinc-800"
            href="#"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
