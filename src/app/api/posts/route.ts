
// src\app\api\posts\route.ts

// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     const posts = await prisma.post.findMany({
//       select: {
//         id: true,
//         imageUrl: true,
//         caption: true,
//         user: {
//           select: {
//             name: true, // Fetch the username of the post's author
//           },
//         },
//       },
//     });
//     return NextResponse.json(posts);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return NextResponse.json([], { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { writeFile } from "fs/promises";
// import path from "path";


const prisma = new PrismaClient(); // ✅ Prisma is initialized here

// ✅ Fetch multiple posts (Your existing GET API)
// export async function GET() {
//     try {
//         const posts = await prisma.post.findMany({
//             select: {
//                 id: true,
//                 imageUrl: true,
//                 caption: true,
//                 user: {
//                     select: {
//                         id: true,
//                         name: true, // Fetch the username of the post's author
//                     },
//                 },
//             },
//         });
//         return NextResponse.json(posts);
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//         return NextResponse.json([], { status: 500 });
//     }
// }
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                imageUrl: true,
                caption: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                likes: {
                    select: {
                        userId: true,
                    },
                },
                comments: {
                    select: {
                        id: true,
                        content: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        const formattedPosts = posts.map(post => ({
            ...post,
            likesCount: post.likes.length,
            likedByUser: false, // This will be handled in frontend
        }));

        return NextResponse.json(formattedPosts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json([], { status: 500 });
    }
}



// add new POSTS to the web

import { uploadToCloud } from "@/lib/upload";



export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const caption = formData.get("caption") as string;
    const userId = formData.get("userId") as string;

    if (!image || !caption || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upload image to cloud storage (this function must be defined in lib/upload.ts)
    const imageUrl = await uploadToCloud(image);

    // Store post in database with the cloud image URL
    const post = await prisma.post.create({
      data: { imageUrl, caption, userId },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ Delete a post by ID
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
        }

        await prisma.post.delete({ where: { id } });

        return NextResponse.json({ message: "Post deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}
