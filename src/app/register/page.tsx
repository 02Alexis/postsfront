"use client";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";

function RegisterPage() {
  const [error, setError] = useState();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await axios.post("/api/auth/signup", {
        image_url: formData.get("image_url"),
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
      console.log(res);
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit}>
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <div className="border bg-white p-8 w-96">
          <div className="flex justify-center mb-6">
            <p>Crear cuenta</p>
          </div>
          <div className="flex flex-col space-y-2 mb-4">
            {/* <p className="text-sm text-red-500 font-medium -mt-4">
            * Error: 
          </p> */}
            <input
              type="text"
              placeholder="image url"
              name="image_url"
              className="bg-zinc-800 px-4 py-2 block mb-2 text-white"
            />
            <input
              type="text"
              placeholder="alexis"
              name="name"
              className="bg-zinc-800 px-4 py-2 block mb-2 text-white"
            />
            <input
              type="text"
              placeholder="alex@gmail.com"
              name="email"
              className="bg-zinc-800 px-4 py-2 block mb-2 text-white"
            />
            <input
              type="password"
              placeholder="*********"
              name="password"
              className="bg-zinc-800 px-4 py-2 block mb-2 text-white"
            />
          </div>
          <button className="text-sm font-bold text-white bg-blue-400 w-full p-1.5 rounded transition-all hover:bg-blue-500 active:bg-blue-600 disabled:bg-blue-200">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
