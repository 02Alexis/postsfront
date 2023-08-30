"use client"

import PostCart from "@/components/PostCart";

import {useRouter} from "next/navigation"
import { useSession } from 'next-auth/react';

async function loaderPost() {
  
  // ejecuta una petición
  const res = await fetch("http://localhost:8000/posts/");
  // convierte los datos en json
  const data = await res.json();
  // console.log(data);

  // retorna los datos
  return data;
}

async function HomePage() {
  const router = useRouter();
  const session = useSession();
  const posts = await loaderPost();

  const handleCreatePost = async (postData) => {
    try {
      const response = await fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data.user.token}`,
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Recargar la página después de crear un nuevo post
        window.location.reload();
      } else {
        console.error('Error al crear el post:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear el post:', error);
    }
  };

  return (
    <main className="py-6 px-4 mx-auto" style={{ maxWidth: 840 }}>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-7">
          {posts.map((post) => (
            <PostCart post={post} key={post.id} />
          ))}

          <div className="border bg-white rounded-xl mb-4"></div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
