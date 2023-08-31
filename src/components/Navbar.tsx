

import Link from "next/link";
import { getServerSession } from "next-auth";

async function Navbar() {
  const session = await getServerSession();
  return (
    <nav className="bg-gray-900 p-4 text-white">
      <div className="flex justify-between container mx-auto">
        <Link href="/">
          <h1 className="font-bold text-xl">Home</h1>
        </Link>

        <ul className="flex gap-x-2">
          {session ? (
            <>
              <li className="px-3 py-1">
                <Link href="/dashboard/profile">Perfil</Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/agregarFeed">Crear publicación</Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/api/auth/signout">Sign out</Link>
              </li>
            </>
          ) : (
            <>
              <li className="px-3 py-1">
                <Link href="/login">Login</Link>
              </li>
              {/* <li className="px-3 py-1">
                <Link href="/register">Registro</Link>
              </li> */}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
