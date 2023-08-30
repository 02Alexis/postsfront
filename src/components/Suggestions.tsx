"use client";
import { useSession } from "next-auth/react";

function Suggestions() {
  const { data: session, status } = useSession();
//   console.log(session, status);

  return (
    <div>
      {status === "authenticated" && session && (
        <div className="flex items-center space-x-4 text-sm my-6">
          <div className="h-16 w-16 bg-neutral-200 rounded-full">
            <img
              src={session.user.image_url}
              alt="nine"
              className="rounded-full"
            />
          </div>
          <div className="flex-1">
            <p className="font-medium text-white">{session.user.name}</p>
            <p className="text-blue-400">En Linea</p>
          </div>
          <p className="text-neutral-400 font-medium cursor-pointer">Switch</p>
        </div>
      )}
      <div className="flex items-center justify-between text-sm font-medium">
        <p className="text-neutral-400">Suggestions For You</p>
        <p className="cursor-pointer" style={{ fontSize: 12 }}>
          See All
        </p>
      </div>
    </div>
  );
}

export default Suggestions;
