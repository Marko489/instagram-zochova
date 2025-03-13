
// src\app\api\searchBar\route.ts
// import { useEffect } from "react";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  try {
    let users;

    if (!query) {
      // Fetch 15 random users when search is empty
      users = await prisma.user.findMany({
        take: 15,
        orderBy: { id: "asc" }, // Can be modified for better randomness
        select: { id: true, name: true, image: true },
      });
      
    } else {
      // Contextual search: match any part of the name (case-insensitive)
      users = await prisma.user.findMany({
        where: { name: { contains: query, mode: "insensitive" } },
        select: { id: true, name: true, image: true },
      });
    }
    
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
