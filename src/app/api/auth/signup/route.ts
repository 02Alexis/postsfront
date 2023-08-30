import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { image_url, name, email, password } = await request.json();
  console.log(image_url, name, email, password);

  if (!password || password.length < 6) {
    return NextResponse.json(
      {
        message: "la contraseña debe tener al menos 6 caracteres",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      image_url,
      name,
      email,
      password: hashedPassword,
    };

    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const savedUser = await response.json();
      console.log("usuario loggueado con exito, este es tu token", savedUser);
      return NextResponse.json(savedUser);
    } else {
      // Manejar el caso de error en la respuesta de la API
      return NextResponse.error();
    }
  } catch (error) {
    console.log("error bobo", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }
}
