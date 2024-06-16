"use client";
import { useGetUserRoleQuery } from "@/services/auth";

// TODO: show all posts
export default function Home() {
  const { data, isLoading } = useGetUserRoleQuery("");
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      main page
    </main>
  );
}
