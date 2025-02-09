
// src\components\PostsList.tsx
// src/components/PostsList.tsx
"use client";

import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Image from "next/image";

interface Post {
  id: string;
  imageUrl: string;
  caption?: string;
  user: { name: string | null };
}

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts inside the component using useEffect
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts"); // Call the API route
      const data = await response.json();
      setPosts(data); // Update the state with fetched posts
    }

    fetchPosts();
  }, []); // Empty dependency array to fetch only once when the component mounts

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", padding: "16px" }}>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            width: "480px",
            height: "690px",
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

          {/* Caption Section */}
          <div
            style={{
              width: "100%",
              height: "160px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "16px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
              variant="h6"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
                marginLeft: "2px",
                textAlign: "left",
              }}
            >
              {post.caption}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
