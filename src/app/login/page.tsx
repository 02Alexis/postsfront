"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    console.log(res);

    if (res?.error) return setError(res.error as string);
    if (res?.ok) return router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit}>
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}

        <div className="border bg-white p-8 w-96">
          <div className="flex justify-center mb-6">
            <p>Login</p>
          </div>
          <div className="flex flex-col space-y-2 mb-4">
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
          <button
            type="submit"
            className="text-sm font-bold text-white bg-blue-400 w-full p-1.5 rounded transition-all hover:bg-blue-500 active:bg-blue-600 disabled:bg-blue-200"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
