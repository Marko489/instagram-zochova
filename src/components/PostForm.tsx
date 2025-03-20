




// "use client";

// import { useState } from "react";
// import { Typography, Button, TextField, Box } from "@mui/material";

// const PostForm = () => {
//     const [file, setFile] = useState<File | null>(null);
//     const [caption, setCaption] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFile = e.target.files?.[0] || null;
//         setFile(selectedFile);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!file) return setError("Please select an image file");

//         setLoading(true);
//         setError("");

//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("caption", caption);

//         try {
//             const res = await fetch("/api/posts", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!res.ok) {
//                 throw new Error("Failed to create post");
//             }

//             const newPost = await res.json();
//             console.log("Post created:", newPost);
//             setFile(null);
//             setCaption("");
//         } catch (err) {
//             setError("Error creating post");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Box sx={{
//             position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center"
//         }}>
//             <Box sx={{
//                 width: 650, height: 750, backgroundColor: "white", borderRadius: 2, padding: 5,
//                 display: "flex", flexDirection: "column", gap: 3
//             }}>
//                 {/* Caption Field */}
//                 <TextField
//                     fullWidth
//                     variant="outlined"
//                     placeholder="Write a caption..."
//                     value={caption}
//                     onChange={(e) => setCaption(e.target.value)}
//                     multiline
//                     rows={3}
//                 />
                
//                 {/* Image Preview Box */}
//                 <Box sx={{
//                     width: "100%", height: 400, backgroundColor: "#f0f0f0", display: "flex",
//                     alignItems: "center", justifyContent: "center", borderRadius: 2, border: "1px solid #ccc",
//                     overflow: "hidden"
//                 }}>
//                     {file ? (
//                         <img
//                             src={URL.createObjectURL(file)}
//                             alt="Selected Preview"
//                             style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
//                         />
//                     ) : (
//                         <Typography color="gray">No image selected</Typography>
//                     )}
//                 </Box>
                
//                 {/* Buttons Row */}
//                 <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
//                 <Button
//                     variant="contained"
//                     component="label"
//                     sx={{
//                         backgroundColor: (theme) => theme.palette.addImage.main,
//                         "&:hover": { backgroundColor: (theme) => theme.palette.addImage.dark }, // Optional hover effect
//                     }}
//                     >
//                     Add Image
//                     <input type="file" accept="image/*" hidden onChange={handleFileChange} />
//                 </Button>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handleSubmit}
//                         disabled={loading}
//                     >
//                         {loading ? "Uploading..." : "Add Post"}
//                     </Button>
//                 </Box>
                
//                 {/* Error Message */}
//                 {error && <Typography color="error" textAlign="center">{error}</Typography>}
//             </Box>
//         </Box>
//     );
// };

// export default PostForm;



"use client";

import { useState } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";
import Image from "next/image";

const PostForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return setError("Please select an image file");

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("caption", caption);

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Failed to create post");
            }

            const newPost = await res.json();
            console.log("Post created:", newPost);
            setFile(null);
            setCaption("");
        } catch (err) {
            setError("Error creating post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            <Box sx={{
                width: 650, height: 750, backgroundColor: "white", borderRadius: 2, padding: 5,
                display: "flex", flexDirection: "column", gap: 3
            }}>
                {/* Caption Field */}
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    multiline
                    rows={3}
                />
                
                {/* Image Preview Box */}
                <Box sx={{
                    width: "100%", height: 400, backgroundColor: "#f0f0f0", display: "flex",
                    alignItems: "center", justifyContent: "center", borderRadius: 2, border: "1px solid #ccc",
                    overflow: "hidden", position: "relative"
                }}>
                    {file ? (
                        <Image
                            src={URL.createObjectURL(file)}
                            alt="Selected Preview"
                            layout="fill"
                            objectFit="contain"
                        />
                    ) : (
                        <Typography color="gray">No image selected</Typography>
                    )}
                </Box>
                
                {/* Buttons Row */}
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            backgroundColor: (theme) => theme.palette.addImage.main,
                            "&:hover": { backgroundColor: (theme) => theme.palette.addImage.dark },
                        }}
                    >
                        Add Image
                        <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Add Post"}
                    </Button>
                </Box>
                
                {/* Error Message */}
                {error && <Typography color="error" textAlign="center">{error}</Typography>}
            </Box>
        </Box>
    );
};

export default PostForm;
