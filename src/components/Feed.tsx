// components/Feed.tsx
// components/Feed.tsx

// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Post from './Post'; // Assuming Post component is in the components folder
// import { Box, Paper } from '@mui/material';

// const Feed = ({ userId }: { userId: string }) => {
//   const [posts, setPosts] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('/api/feed/getPosts');
//         setPosts(response.data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       {/* Wrap posts in a container with a max-width */}
//       <Box sx={{ maxWidth: 600, width: '100%' }}>
//         {posts.map((post: any) => (
//           <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }} key={post.id}>
//             <Post post={post} />
//           </Paper>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Feed;
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post'; // Assuming Post component is in the components folder
import { Box, Paper } from '@mui/material';

interface PostType {
  id: string;
  content: string;  // Add any other fields based on your post structure
}

const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/feed/getPosts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Wrap posts in a container with a max-width */}
      <Box sx={{ maxWidth: 600, width: '100%' }}>
        {posts.map((post) => (
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }} key={post.id}>
            <Post post={post} />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Feed;
