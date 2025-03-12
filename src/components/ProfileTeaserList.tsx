"use client";
import { useEffect } from "react";
import { useSearch } from "@/app/context/SearchContext";
import Image from "next/image";

export default function ProfileTeaserList() {
  const { defaultUsers, searchResults } = useSearch();
  useEffect(() => {
    console.log("Current searchResults:", searchResults);
  }, [searchResults]);
  useEffect(() => {
    console.log("Current defaultUsers:", defaultUsers);
  }, [defaultUsers]);
  // If there are search results, show them; otherwise, show default users
  const usersToShow = searchResults.length > 0 ? searchResults : defaultUsers;
  useEffect(() => {
    console.log("Current usersToShow:", usersToShow);
  }, [usersToShow]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {usersToShow.map((user) => (
        <div key={user.id} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <Image
            src={user.image || "/default-avatar.png"}
            alt={user.name}
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-lg font-semibold">{user.name}</span>
        </div>
      ))}
    </div>
  );
}