
// src\components\PostsList.tsx
// src/components/PostsList.tsx
"use client";

import { useEffect, useState } from "react";
import { Typography, IconButton } from "@mui/material";
import { FavoriteBorder, Favorite, ChatBubbleOutline } from "@mui/icons-material";
import Image from "next/image";

interface Post {
  id: string;
  imageUrl: string;
  caption?: string;
  user: { name: string | null };
}

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({}); // Track liked posts

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  // Handle Like button toggle
  const handleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId], // Toggle like state
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", padding: "16px" }}>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            width: "480px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            borderRadius: "12px",
            border: "2px solid #ccc",
            overflow: "hidden",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#fff",
          }}
        >
          {/* User Name Section */}
          <div
            style={{
              width: "100%",
              height: "50px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "12px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>
              {post.user.name ? post.user.name : "Unknown User"}
            </Typography>
          </div>

          {/* Image Section */}
          <div style={{ width: "100%", height: "480px" }}>
            <Image
              src={post.imageUrl}
              alt={post.caption || "Post image"}
              width={480}
              height={480}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>

          {/* Like and Comment Buttons (Moved here) */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              backgroundColor: "transparent",
            }}
          >
            <IconButton onClick={() => handleLike(post.id)} color="primary">
              {likedPosts[post.id] ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>

            <IconButton color="primary">
              <ChatBubbleOutline />
            </IconButton>
          </div>

          {/* Caption Section */}
          <div
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "#f9f9f9",
              textAlign: "left",
            }}
          >
            <Typography variant="h6" style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
              {post.caption}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsList;







// database table 
// model Like {
//   id        String  @id @default(uuid())
//   post      Post    @relation(fields: [postId], references: [id], onDelete: Cascade)
//   postId    String
//   user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)
//   userId    String

//   @@unique([postId, userId]) // Ensures a user can only like a post once
// }



//api service 

// import { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "@/lib/prisma"; // Assuming you have a Prisma client

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { postId } = req.body;
//   const userId = req.user?.id; // Assuming you have authentication set up

//   if (!userId) return res.status(401).json({ error: "Unauthorized" });

//   if (req.method === "POST") {
//     // Add a like
//     try {
//       await prisma.like.create({
//         data: { postId, userId },
//       });
//       res.status(201).json({ success: true });
//     } catch (error) {
//       res.status(500).json({ error: "Something went wrong" });
//     }
//   } else if (req.method === "DELETE") {
//     // Remove a like
//     try {
//       await prisma.like.deleteMany({
//         where: { postId, userId },
//       });
//       res.status(200).json({ success: true });
//     } catch (error) {
//       res.status(500).json({ error: "Something went wrong" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }



// fetch function 

// const handleLike = async (postId: string, isLiked: boolean) => {
//   const response = await fetch(`/api/likes`, {
//     method: isLiked ? "DELETE" : "POST", // If already liked, unlike it; otherwise, like it
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ postId }),
//   });

//   if (response.ok) {
//     setPosts((prev) =>
//       prev.map((post) =>
//         post.id === postId
//           ? {
//               ...post,
//               likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1, // Update like count
//               likedByUser: !isLiked, // Toggle like status
//             }
//           : post
//       )
//     );
//   }
// };
