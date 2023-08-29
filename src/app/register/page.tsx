'use client';
import LoginInput from "@/components/LoginInput";
import { useState } from "react";


function RegisterPage() {
    const [imguser, setImguser] = useState<string>("");
    const [nameuser, setNameuser] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="border bg-white p-8 w-96">
        <div className="flex justify-center mb-6">
          <p>Crear cuenta</p>
        </div>
        <div className="flex flex-col space-y-2 mb-4">
          {/* <p className="text-sm text-red-500 font-medium -mt-4">
            * Error: 
          </p> */}
          <LoginInput
            label="Url img"
            value={imguser}
            onChange={setImguser}
          />
          <LoginInput
            label="Nombre de usuario"
            value={nameuser}
            onChange={setNameuser}
          />
          <LoginInput
            label="Email"
            value={username}
            onChange={setUsername}
          />
          <LoginInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
        </div>
        <button
          disabled={!imguser || !nameuser || !username || !password}
          className="text-sm font-bold text-white bg-blue-400 w-full p-1.5 rounded transition-all hover:bg-blue-500 active:bg-blue-600 disabled:bg-blue-200"
        >
          Registrarse
        </button>
      </div>
    </div>
  )
}

export default RegisterPage