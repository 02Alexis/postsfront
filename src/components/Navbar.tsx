"use client";

import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 text-white">
      <div className="flex justify-between container mx-auto">
        <Link href="/">
          <h1 className="font-bold text-xl">Logo</h1>
        </Link>

        <ul className="flex gap-x-2">
          <li className="px-3 py-1">
            <Link href="/dashboard/profile">Perfil</Link>
          </li>
          <li className="px-3 py-1">
            <Link href="#">Crear publicación</Link>
          </li>
          <li className="px-3 py-1">
            <Link href="/login">Login</Link>
          </li>
          <li className="px-3 py-1">
            <Link href="/register">Registro</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
