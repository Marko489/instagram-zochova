// src\app\api\searchBar.ts

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// export async function searchUsers(query: string) {
//   if (!query) return [];

//   return await prisma.user.findMany({
//     where: {
//       name: {
//         startsWith: query,
//         mode: "insensitive", // Case-insensitive search
//       },
//     },
//     take: 7, // Limit to 7 results
//     select: {
//       id: true,
//       name: true,
//       image: true,
//     },
//   });
// }


// src\app\api\searchBar\route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  if (!query) return NextResponse.json({ users: [] });

  try {
    const users = await prisma.user.findMany({
      where: { name: { startsWith: query, mode: "insensitive" } },
      take: 7,
      select: { id: true, name: true, image: true },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
