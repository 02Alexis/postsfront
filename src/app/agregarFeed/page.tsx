"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; 

async function getAccessToken() {
  const response = await fetch("/api/auth/session"); // Ruta para obtener la sesión
  const session = await response.json();
  return session.accessToken;
}

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const session = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(session);

    try {
      const accessToken = await getAccessToken(); // Obtener el token de acceso
      const response = await axios.post(
        "http://localhost:8000/posts",
        {
          title,
          description,
          image_url,
        },
        {
          headers: {
            Authorization: `Bearer ${session.data.user.token}`,
            // Usar el token de la sesión
          },
        }
        );
        // console.log(session.data.user.token);

   // Agregar la nueva publicación a la lista actual de publicaciones
   addNewPost(response.data); // Llama a una función que actualiza la lista de publicaciones
   setTitle("");
   setDescription("");
   setImageUrl("");
    } catch (error) {
      console.error("Error al crear el post:", error);
      setError("Error al crear el post");
      // Manejar el error si es necesario
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Crear un nuevo post</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium">
            Título
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">
            Descripción
          </label>
          <textarea
            id="description"
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image_url" className="block font-medium">
            URL de la imagen
          </label>
          <input
            type="text"
            id="image_url"
            className="w-full p-2 border rounded"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Crear Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
