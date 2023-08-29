"use client";

import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  return (
    <form>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="border bg-white p-8 w-96">
          <div className="flex justify-center mb-6">
            <p>Login</p>
          </div>
          <div className="flex flex-col space-y-2 mb-4">
            {/* <p className="text-sm text-red-500 font-medium -mt-4">
            * Error: 
          </p> */}
          </div>
          <button
            type="submit"
            disabled={!email || !password}
            className="text-sm font-bold text-white bg-blue-400 w-full p-1.5 rounded transition-all hover:bg-blue-500 active:bg-blue-600 disabled:bg-blue-200"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
