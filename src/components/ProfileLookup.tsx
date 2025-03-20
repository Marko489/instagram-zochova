

// "use client";

// import { useEffect, useState } from "react";
// import { Box, Typography, Avatar, CircularProgress, Paper } from "@mui/material";

// interface User {
//     name: string;
//     email: string;
//     createdAt: string;
//     profile?: {
//         avatarUrl?: string;
//         bio?: string;
//         interests?: string[];
//     };
//     posts?: Post[];
// }

// interface Post {
//     id: string;
//     imageUrl: string;
//     caption: string;
//     createdAt: string;
// }

// export default function ProfilePage() {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await fetch("/api/user");
//                 if (!res.ok) throw new Error("Failed to fetch user data");
//                 const data = await res.json();
//                 setUser(data);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return (
//             <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//                 <CircularProgress size={80} />
//             </Box>
//         );
//     }

//     if (!user) {
//         return (
//             <Typography sx={{ textAlign: "center", mt: 4, color: "gray", fontSize: 24 }}>
//                 User not found
//             </Typography>
//         );
//     }

//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "100vh",
//                 backgroundColor: "#f4f4f4",
//                 padding: 4,
//             }}
//         >
//             <Paper
//                 elevation={5}
//                 sx={{
//                     width: "80%",
//                     maxWidth: "900px",
//                     height: "90vh",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     padding: 6,
//                     borderRadius: 4,
//                     backgroundColor: "white",
//                     boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
//                 }}
//             >
//                 {/* Avatar */}
//                 <Avatar
//                     src={user.profile?.avatarUrl || ""}
//                     sx={{
//                         width: 150,
//                         height: 150,
//                         mb: 3,
//                         bgcolor: user.profile?.avatarUrl ? "transparent" : "gray",
//                         fontSize: 40,
//                     }}
//                 >
//                     {!user.profile?.avatarUrl && "N/A"}
//                 </Avatar>

//                 {/* User Info */}
//                 <Typography variant="h3" fontWeight={700}>
//                     {user.name}
//                 </Typography>
//                 <Typography sx={{ color: "gray", fontSize: 20, mb: 1 }}>{user.email}</Typography>
//                 <Typography variant="h6" sx={{ color: "black", fontSize: 18 }}>
//                     🕒 Joined: {new Date(user.createdAt).toLocaleDateString()}
//                 </Typography>

//                 {/* Bio & Interests Layout */}
//                 <Box sx={{ display: "flex", width: "100%", mt: 5, gap: 4 }}>
//                     {/* Bio */}
//                     <Box
//                         sx={{
//                             flex: 1,
//                             backgroundColor: "#fafafa",
//                             padding: 3,
//                             borderRadius: 2,
//                             textAlign: "center",
//                         }}
//                     >
//                         <Typography variant="h6" fontWeight={600} gutterBottom>
//                             Bio
//                         </Typography>
//                         <Typography sx={{ fontSize: 16, color: "black" }}>
//                             {user.profile?.bio || "No bio available"}
//                         </Typography>
//                     </Box>

//                     {/* Interests */}
//                     <Box
//                         sx={{
//                             flex: 1,
//                             backgroundColor: "#fafafa",
//                             padding: 3,
//                             borderRadius: 2,
//                             textAlign: "center",
//                         }}
//                     >
//                         <Typography variant="h6" fontWeight={600} gutterBottom>
//                             Interests
//                         </Typography>
//                         <Typography sx={{ fontSize: 16, color: "black" }}>
//                             {user.profile?.interests?.length
//                                 ? user.profile.interests.join(", ")
//                                 : "No interests listed"}
//                         </Typography>
//                     </Box>
//                 </Box>

//                 {/* Posts Container */}
//                 <Box
//                     sx={{
//                         width: "100%",
//                         flexGrow: 1,
//                         mt: 4,
//                         backgroundColor: "#e0e0e0",
//                         borderRadius: 2,
//                         padding: 3,
//                         display: "flex",
//                         flexWrap: "wrap",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         gap: 2,
//                         overflowY: "auto",
//                     }}
//                 >
//                     {user.posts && user.posts.length > 0 ? (
//                         user.posts.map((post) => (
//                             <Box key={post.id} sx={{ width: 150, height: 150, overflow: "hidden", borderRadius: 2 }}>
//                                 <img
//                                     src={post.imageUrl}
//                                     alt={post.caption}
//                                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                                 />
//                             </Box>
//                         ))
//                     ) : (
//                         <Typography color="text.disabled">No posts yet</Typography>
//                     )}
//                 </Box>
//             </Paper>
//         </Box>
//     );
// }







"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Typography, Avatar, CircularProgress, Paper } from "@mui/material";

interface User {
    name: string;
    email: string;
    createdAt: string;
    profile?: {
        avatarUrl?: string;
        bio?: string;
        interests?: string[];
    };
    posts?: Post[];
}

interface Post {
    id: string;
    imageUrl: string;
    caption: string;
    createdAt: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/user");
                if (!res.ok) throw new Error("Failed to fetch user data");
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress size={80} />
            </Box>
        );
    }

    if (!user) {
        return (
            <Typography sx={{ textAlign: "center", mt: 4, color: "gray", fontSize: 24 }}>
                User not found
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f4f4f4",
                padding: 4,
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    width: "80%",
                    maxWidth: "900px",
                    height: "90vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 6,
                    borderRadius: 4,
                    backgroundColor: "white",
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
                }}
            >
                {/* Avatar */}
                <Avatar
                    src={user.profile?.avatarUrl || ""}
                    sx={{
                        width: 150,
                        height: 150,
                        mb: 3,
                        bgcolor: user.profile?.avatarUrl ? "transparent" : "gray",
                        fontSize: 40,
                    }}
                >
                    {!user.profile?.avatarUrl && "N/A"}
                </Avatar>

                {/* User Info */}
                <Typography variant="h3" fontWeight={700}>
                    {user.name}
                </Typography>
                <Typography sx={{ color: "gray", fontSize: 20, mb: 1 }}>{user.email}</Typography>
                <Typography variant="h6" sx={{ color: "black", fontSize: 18 }}>
                    🕒 Joined: {new Date(user.createdAt).toLocaleDateString()}
                </Typography>

                {/* Bio & Interests Layout */}
                <Box sx={{ display: "flex", width: "100%", mt: 5, gap: 4 }}>
                    {/* Bio */}
                    <Box
                        sx={{
                            flex: 1,
                            backgroundColor: "#fafafa",
                            padding: 3,
                            borderRadius: 2,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Bio
                        </Typography>
                        <Typography sx={{ fontSize: 16, color: "black" }}>
                            {user.profile?.bio || "No bio available"}
                        </Typography>
                    </Box>

                    {/* Interests */}
                    <Box
                        sx={{
                            flex: 1,
                            backgroundColor: "#fafafa",
                            padding: 3,
                            borderRadius: 2,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Interests
                        </Typography>
                        <Typography sx={{ fontSize: 16, color: "black" }}>
                            {user.profile?.interests?.length
                                ? user.profile.interests.join(", ")
                                : "No interests listed"}
                        </Typography>
                    </Box>
                </Box>

                {/* Posts Container */}
                <Box
                    sx={{
                        width: "100%",
                        flexGrow: 1,
                        mt: 4,
                        backgroundColor: "#e0e0e0",
                        borderRadius: 2,
                        padding: 3,
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        overflowY: "auto",
                    }}
                >
                    {user.posts && user.posts.length > 0 ? (
                        user.posts.map((post) => (
                            <Box key={post.id} sx={{ width: 150, height: 150, position: "relative", borderRadius: 2, overflow: "hidden" }}>
                                <Image
                                    src={post.imageUrl}
                                    alt={post.caption}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </Box>
                        ))
                    ) : (
                        <Typography color="text.disabled">No posts yet</Typography>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}
