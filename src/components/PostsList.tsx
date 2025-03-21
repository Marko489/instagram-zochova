
// src\components\PostsList.tsx
// src/components/PostsList.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { Typography, IconButton } from "@mui/material";
// import { FavoriteBorder, Favorite, ChatBubbleOutline } from "@mui/icons-material";
// import Image from "next/image";

// interface Post {
//   id: string;
//   imageUrl: string;
//   caption?: string;
//   user: { name: string | null };
// }

// const PostsList: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({}); // Track liked posts

//   useEffect(() => {
//     async function fetchPosts() {
//       const response = await fetch("/api/posts");
//       const data = await response.json();
//       setPosts(data);
//     }

//     fetchPosts();
//   }, []);

//   // Handle Like button toggle
//   const handleLike = (postId: string) => {
//     setLikedPosts((prev) => ({
//       ...prev,
//       [postId]: !prev[postId], // Toggle like state
//     }));
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", padding: "16px" }}>
//       {posts.map((post) => (
//         <div
//           key={post.id}
//           style={{
//             width: "480px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             textAlign: "center",
//             borderRadius: "12px",
//             border: "2px solid #ccc",
//             overflow: "hidden",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//             backgroundColor: "#fff",
//           }}
//         >
//           {/* User Name Section */}
//           <div
//             style={{
//               width: "100%",
//               height: "50px",
//               display: "flex",
//               alignItems: "center",
//               paddingLeft: "12px",
//               backgroundColor: "#f9f9f9",
//             }}
//           >
//             <Typography variant="h6" style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>
//               {post.user.name ? post.user.name : "Unknown User"}
//             </Typography>
//           </div>

//           {/* Image Section */}
//           <div style={{ width: "100%", height: "480px" }}>
//             <Image
//               src={post.imageUrl}
//               alt={post.caption || "Post image"}
//               width={480}
//               height={480}
//               style={{ objectFit: "cover", width: "100%", height: "100%" }}
//             />
//           </div>

//           {/* Like and Comment Buttons (Moved here) */}
//           <div
//             style={{
//               width: "100%",
//               display: "flex",
//               justifyContent: "flex-start",
//               alignItems: "center",
//               gap: "12px",
//               padding: "12px",
//               backgroundColor: "transparent",
//             }}
//           >
//             <IconButton onClick={() => handleLike(post.id)} color="primary">
//               {likedPosts[post.id] ? <Favorite color="error" /> : <FavoriteBorder />}
//             </IconButton>

//             <IconButton color="primary">
//               <ChatBubbleOutline />
//             </IconButton>
//           </div>

//           {/* Caption Section */}
//           <div
//             style={{
//               width: "100%",
//               padding: "16px",
//               backgroundColor: "#f9f9f9",
//               textAlign: "left",
//             }}
//           >
//             <Typography variant="h6" style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
//               {post.caption}
//             </Typography>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostsList;







"use client";

import { useEffect, useState } from "react";
import {
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  ChatBubbleOutline,
  Delete,
} from "@mui/icons-material";
import Image from "next/image";

interface Post {
  id: string;
  imageUrl: string;
  caption?: string;
  user: { id: string; name: string | null };
  likesCount: number;
  comments: Comment[];
  userId: string;
}

interface Comment {
  id: string;
  content: string;
  user: { id: string; name: string };
}

const PostsList: React.FC<{ userId: string }> = ({ userId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [openPost, setOpenPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    const isLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));

    await fetch(`/api/posts/like`, {
      method: "POST",
      body: JSON.stringify({ postId }),
    });

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, likesCount: post.likesCount + (isLiked ? -1 : 1) }
          : post
      )
    );
  };

  const handleAddComment = async (postId: string) => {
    if (!commentInputs[postId]) return;
    const response = await fetch(`/api/posts/comment`, {
      method: "POST",
      body: JSON.stringify({ postId, content: commentInputs[postId] }),
    });
    const newComment = await response.json();

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleDeleteComment = async (postId: string, commentId: string) => {
    await fetch(`/api/posts/comment/${commentId}`, {
      method: "DELETE",
    });
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: post.comments.filter((c) => c.id !== commentId) }
          : post
      )
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", padding: "16px" }}>
      {posts.map((post) => (
        <div key={post.id} style={{ width: "480px", borderRadius: "12px", border: "2px solid #ccc", padding: "12px", backgroundColor: "#fff" }}>
          <Typography variant="h6">{post.user.name || "Unknown User"}</Typography>
          <Image src={post.imageUrl} alt={post.caption || "Post image"} width={480} height={480} style={{ objectFit: "cover" }} />
          
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => handleLike(post.id)} color="primary">
              {likedPosts[post.id] ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
            <Typography>{post.likesCount} likes</Typography>
            <IconButton onClick={() => setOpenPost(post)} color="primary">
              <ChatBubbleOutline />
            </IconButton>
          </div>
          
          <div style={{ maxHeight: "150px", overflowY: "auto", borderTop: "1px solid #ccc", marginTop: "8px", paddingTop: "8px" }}>
            {post.comments.map((comment) => (
              <ListItem key={comment.id}>
                <ListItemText primary={comment.user.name} secondary={comment.content} />
                {comment.user.id === userId && (
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleDeleteComment(post.id, comment.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </div>
          
          <TextField
            value={commentInputs[post.id] || ""}
            onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
            placeholder="Add a comment..."
            fullWidth
          />
          <Button onClick={() => handleAddComment(post.id)} disabled={!commentInputs[post.id]}>
            Post
          </Button>
        </div>
      ))}
      {openPost && (
        <Dialog open={true} onClose={() => setOpenPost(null)}>
          <DialogTitle>Comments</DialogTitle>
          <DialogContent>
            <List>
              {openPost.comments.map((comment) => (
                <ListItem key={comment.id}>
                  <ListItemText primary={comment.user.name} secondary={comment.content} />
                  {comment.user.id === userId && (
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleDeleteComment(openPost.id, comment.id)}>
                        <Delete color="error" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PostsList;
