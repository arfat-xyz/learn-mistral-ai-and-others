"use client";
import LinkButton from "@/components/link-button";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function HomeClientComponent() {
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
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Please login</h1>
      <LinkButton href="/login" value="Login" />
    </div>
  );
}
