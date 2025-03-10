"use client";
import LinkButton from "@/components/link-button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold">Welcome, {session?.user.name}</h1>
        <Image
          src={
            session.user.image ??
            "https://avatars.githubusercontent.com/u/61103063?v=4"
          }
          width={96}
          height={96}
          alt={session.user.name ?? "Arfatur Rahman"}
          className="rounded-full w-24 h-24 mt-4"
        />
        <LinkButton href="/mistral-ai" value="Mistral AI" />
        <button
          onClick={() =>
            signOut({
              redirect: true,
            })
          }
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login with GitHub</h1>
      <button
        onClick={() =>
          signIn("github", {
            redirect: true,
          })
        }
        className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
      >
        GitHub Login
      </button>

      <LinkButton href="/" value="Home" />
    </div>
  );
}
