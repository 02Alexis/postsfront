"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  IoHeartOutline,
  IoPaperPlaneOutline,
  IoBookmarkOutline,
  IoEllipsisHorizontalSharp,
  IoChatbubbleOutline,
  IoHappyOutline,
  IoHeart,
} from "react-icons/io5";
import { Post  } from "@/interface/types";

function formatDate(dateString: string) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function PostCart({ post }: { post: Post }) {
  const [commentText, setCommentText] = useState("");
  const session = useSession();

  const handlePostComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/posts/${post._id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data.user.token}`,
          },
          body: JSON.stringify({ text: commentText }),
        }
      );

      if (response.ok) {
        // Realizar alguna acción si es necesario, como refrescar la lista de comentarios
        setCommentText(""); // Limpiar el campo de texto después de enviar el comentario
        window.location.reload();
      } else {
        console.error("Error al enviar el comentario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${post._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.data.user.token}`,
        },
      });

      if (response.ok) {
        // Realizar alguna acción si es necesario, como refrescar la lista de publicaciones
        window.location.reload(); // Recargar la página después de eliminar
      } else {
        console.error("Error al eliminar el post:", response.statusText);
        alert("No estás autorizado para eliminar este post."); // Mostrar la alerta
      }
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/posts/${post._id}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.data.user.token}`,
          },
        }
      );

      if (response.ok) {
        // Realizar alguna acción si es necesario, como refrescar la lista de comentarios
        window.location.reload(); // Recargar la página después de eliminar el comentario
      } else {
        console.error("Error al eliminar el comentario:", response.statusText);
        alert("No estás autorizado para eliminar este comentario."); // Mostrar la alerta
      }
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

  return (
    <div className="border bg-white rounded-xl mb-4">
      <div className="flex items-center justify-between p-2.5">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-neutral-200 rounded-full">
            <img src={post.userImage} className="rounded-full" />
          </div>
          <div className="ml-2.5 text-black">
            <p className="font-medium text-sm">{post.userName}</p>
            <p style={{ fontSize: 12 }}>{post.title}</p>
          </div>
        </div>
        <IoEllipsisHorizontalSharp
          onClick={handleDeletePost}
          className="text-lg mr-2 cursor-pointer"
        />
      </div>
      <div className="w-full bg-neutral-200">
        <Link href={`${post._id}`}>
          <img src={post.image_url} alt="" className="w-full h-full" />
        </Link>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between text-2xl">
          <div className="flex items-center space-x-4">
            <IoHeart className="cursor-pointer text-red-500 transition-all active:scale-75" />
            <IoHeartOutline className="cursor-pointer transition-all hover:opacity-50 active:scale-75" />
            <IoChatbubbleOutline className="cursor-pointer hover:opacity-50" />
            <IoPaperPlaneOutline className="cursor-pointer hover:opacity-50" />
          </div>
          <IoBookmarkOutline className="cursor-pointer hover:opacity-50" />
        </div>
        <div className="flex items-center my-3 space-x-2">
          <div className="flex items-center -space-x-2"></div>
        </div>
        <div className="text-sm my-2">
          <span className="font-medium inline-block mr-2">{post.userName}</span>
          <span>{post.description}</span>
        </div>
        <p
          className="my-2 text-neutral-400 text-sm uppercase"
          style={{ fontSize: 12 }}
        >
          {formatDate(post.createdAt)}
        </p>
      </div>
      {post.comments &&
        post.comments.map((comment) => (
          <div key={comment._id} className="">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-neutral-200 rounded-full">
                <img src={comment.userImage} className="rounded-full" />
              </div>
              <div className="ml-2.5">
                <p style={{ fontSize: 11.3 }} className="font-medium text-sm">
                  {comment.userName} {formatDate(comment.createdAt)}
                </p>
                <p>{comment.text}</p>
              </div>
              <IoEllipsisHorizontalSharp
                onClick={() => handleDeleteComment(comment._id)}
                style={{ fontSize: 11.3 }}
                className="text-lg mr-2 cursor-pointer"
              />
            </div>
          </div>
        ))}
      <div className="border-t p-3 text-sm flex items-center justify-between space-x-3">
        <IoHappyOutline className="text-2xl" />
        <input
          type="text"
          className="outline-none block flex-1"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div
          className="text-blue-400 font-bold mr-1 cursor-pointer"
          onClick={handlePostComment}
        >
          Post
        </div>
      </div>
    </div>
  );
}

export default PostCart;
