



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// import { FaRegComment, FaRegBookmark, FaBookmark } from 'react-icons/fa'; // Import icons for comments and bookmarks

// const Post = ({ post }: { post: any }) => {
//   const { data: session } = useSession();
//   const [likes, setLikes] = useState(post.likes.length); // Ensure this is set correctly
//   const [isLiked, setIsLiked] = useState(post.likes.some((like: any) => like.userId === session?.user.id));
//   const [comments, setComments] = useState(post.comments);
//   const [newComment, setNewComment] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(post.bookmarks.some((bookmark: any) => bookmark.userId === session?.user.id));
//   const [loading, setLoading] = useState(false);

//   // Fetch updated post data on page load
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`/api/feed/getPost/${post.id}`);
//         const updatedPost = response.data;
//         setLikes(updatedPost.likes.length);
//         setIsLiked(updatedPost.likes.some((like: any) => like.userId === session?.user.id));
//         setComments(updatedPost.comments);
//       } catch (error) {
//         console.error('Error fetching updated post:', error);
//       }
//     };

//     fetchPost();
//   }, [post.id, session?.user.id]);

//   const handleLike = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('/api/feed/likePost', {
//         userId: session?.user.id,
//         postId: post.id,
//       });
  
//       setLikes(response.data.likes);
//       setIsLiked(response.data.isLiked);
//     } catch (error) {
//       console.error('Error liking/unliking post:', error);
//     }
//     setLoading(false);
//   };

//   const handleAddComment = async () => {
//   if (!newComment.trim()) return;

//   try {
//     const response = await axios.post('/api/feed/addComment', {
//       postId: post.id,
//       userId: session?.user.id,
//       content: newComment,
//     });

//     const addedComment = response.data;

//     // Add the new comment with all required data, like id and userId
//     setComments([...comments, { 
//       id: addedComment.id, 
//       content: addedComment.content, 
//       userId: addedComment.userId, 
//       user: { name: session?.user.name } 
//     }]);

//     setNewComment('');
//   } catch (error) {
//     console.error('Error adding comment:', error);
//   }
// };


//   const handleDeleteComment = async (commentId: string) => {
//     try {
//       if (!session?.user.id) {
//         alert('You must be logged in to delete a comment');
//         return;
//       }

//       const response = await axios.delete('/api/feed/deleteComment', {
//         data: { commentId, userId: session.user.id },
//       });

//       if (response.status === 200) {
//         setComments(comments.filter((comment: any) => comment.id !== commentId));
//       }
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };

//   const handleBookmark = async () => {
//     try {
//       await axios.post('/api/feed/bookmarkPost', { userId: session?.user.id, postId: post.id });
//       setIsBookmarked(!isBookmarked);
//     } catch (error) {
//       console.error('Error bookmarking/unbookmarking post:', error);
//     }
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   const handleOutsideClick = (e: React.MouseEvent) => {
//     if ((e.target as HTMLElement).classList.contains('popup-overlay')) {
//       closePopup();
//     }
//   };

//   return (
//     <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
//       <h3>{post.user.name}</h3>

//       {/* Image of the post */}
//       <img
//         src={post.imageUrl}
//         alt="Post"
//         style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
//       />
      
//       {/* Icons placed above the caption but below the image */}
//       <div style={{ display: 'flex', gap: '10px', marginTop: '10px', marginBottom: '10px' }}>
//         <button
//           onClick={handleLike}
//           style={{
//             backgroundColor: 'transparent',
//             border: 'none',
//             color: isLiked ? 'red' : 'black',
//             fontSize: '18px',
//             cursor: loading ? 'not-allowed' : 'pointer',
//           }}
//           disabled={loading}
//         >
//           {loading ? 'Loading...' : isLiked ? '❤️' : '🤍'} Like ({likes})
//         </button>
//         <button
//           onClick={handleBookmark}
//           style={{
//             backgroundColor: 'transparent',
//             border: 'none',
//             color: isBookmarked ? 'green' : 'black',
//             fontSize: '18px',
//             cursor: 'pointer',
//           }}
//         >
//           {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
//         </button>
//         <button
//           onClick={() => setShowPopup(true)}
//           style={{
//             backgroundColor: 'transparent',
//             border: 'none',
//             color: 'black',
//             fontSize: '18px',
//             cursor: 'pointer',
//           }}
//         >
//           <FaRegComment />
//         </button>
//       </div>

//       {/* Caption below the icons */}
//       <p>{post.caption}</p>

//       {/* Comment popup card */}
//       {showPopup && (
//         <div
//           className="popup-overlay"
//           onClick={handleOutsideClick}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 999,
//           }}
//         >
//           <div
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               backgroundColor: '#fff',
//               padding: '20px',
//               borderRadius: '8px',
//               width: '450px', // Increased width for a larger popup
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closePopup}
//               style={{
//                 position: 'absolute',
//                 top: '10px',
//                 right: '10px',
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 fontSize: '20px',
//                 cursor: 'pointer',
//               }}
//             >
//               ✖
//             </button>
            
//             {/* Comment overview window with fixed height and scrollable content */}
//             <div
//               style={{
//                 backgroundColor: '#f9f9f9',
//                 height: '400px', // Fixed height for the comment section
//                 overflowY: 'auto',
//                 padding: '10px',
//                 marginBottom: '10px',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               {comments.slice(0, 40).map((comment: any) => (
//                 <div key={comment.id} style={{ marginBottom: '10px' }}>
//                   <p><strong>{comment.user.name}</strong>: {comment.content}</p>
//                   {comment.userId === session?.user.id && (
//                     <button
//                       onClick={() => handleDeleteComment(comment.id)}
//                       style={{ color: 'red', fontSize: '14px', cursor: 'pointer' }}
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Add comment section */}
//             <input
//               type="text"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Add a comment..."
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 marginBottom: '10px',
//                 borderRadius: '4px',
//                 border: '1px solid #ddd',
//               }}
//             />
//             <button
//               onClick={handleAddComment}
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 borderRadius: '4px',
//                 backgroundColor: '#007bff',
//                 color: 'white',
//                 border: 'none',
//                 cursor: 'pointer',
//               }}
//             >
//               Post
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Post;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// import { FaRegComment, FaRegBookmark, FaBookmark, FaTrash } from 'react-icons/fa'; // Import trashcan icon

// const Post = ({ post }: { post: any }) => {
//   const { data: session } = useSession();
//   const [likes, setLikes] = useState(post.likes.length);
//   const [isLiked, setIsLiked] = useState(post.likes.some((like: any) => like.userId === session?.user.id));
//   const [comments, setComments] = useState(post.comments);
//   const [newComment, setNewComment] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(post.bookmarks.some((bookmark: any) => bookmark.userId === session?.user.id));
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`/api/feed/getPost/${post.id}`);
//         const updatedPost = response.data;
//         setLikes(updatedPost.likes.length);
//         setIsLiked(updatedPost.likes.some((like: any) => like.userId === session?.user.id));
//         setComments(updatedPost.comments);
//       } catch (error) {
//         console.error('Error fetching updated post:', error);
//       }
//     };

//     fetchPost();
//   }, [post.id, session?.user.id]);

//   const handleLike = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('/api/feed/likePost', {
//         userId: session?.user.id,
//         postId: post.id,
//       });

//       setLikes(response.data.likes);
//       setIsLiked(response.data.isLiked);
//     } catch (error) {
//       console.error('Error liking/unliking post:', error);
//     }
//     setLoading(false);
//   };

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;

//     try {
//       const response = await axios.post('/api/feed/addComment', {
//         postId: post.id,
//         userId: session?.user.id,
//         content: newComment,
//       });

//       const addedComment = response.data;

//       setComments([...comments, { 
//         id: addedComment.id, 
//         content: addedComment.content, 
//         userId: addedComment.userId, 
//         user: { name: session?.user.name } 
//       }]);

//       setNewComment('');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   const handleDeleteComment = async (commentId: string) => {
//     try {
//       if (!session?.user.id) {
//         alert('You must be logged in to delete a comment');
//         return;
//       }

//       const response = await axios.delete('/api/feed/deleteComment', {
//         data: { commentId, userId: session.user.id },
//       });

//       if (response.status === 200) {
//         setComments(comments.filter((comment: any) => comment.id !== commentId));
//       }
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };

//   const handleBookmark = async () => {
//     try {
//       await axios.post('/api/feed/bookmarkPost', { userId: session?.user.id, postId: post.id });
//       setIsBookmarked(!isBookmarked);
//     } catch (error) {
//       console.error('Error bookmarking/unbookmarking post:', error);
//     }
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   const handleOutsideClick = (e: React.MouseEvent) => {
//     if ((e.target as HTMLElement).classList.contains('popup-overlay')) {
//       closePopup();
//     }
//   };

//   return (
//     <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
//       <h3>{post.user.name}</h3>

//       <img
//         src={post.imageUrl}
//         alt="Post"
//         style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
//       />

//       <div style={{ display: 'flex', gap: '10px', marginTop: '10px', marginBottom: '10px' }}>
//         <button
//           onClick={handleLike}
//           style={{
//             backgroundColor: 'transparent',
//             border: 'none',
//             color: isLiked ? 'red' : 'black',
//             fontSize: '18px',
//             cursor: loading ? 'not-allowed' : 'pointer',
//           }}
//           disabled={loading}
//         >
//           {loading ? 'Loading...' : isLiked ? '❤️' : '🤍'} Like ({likes})
//         </button>
//         <button
//           onClick={handleBookmark}
//           style={{
//             backgroundColor: 'transparent',
//             border: 'none',
//             color: isBookmarked ? 'green' : 'black',
//             fontSize: '18px',
//             cursor: 'pointer',
//           }}
//         >
//           {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
//         </button>
//         <button
//           onClick={() => setShowPopup(true)}
//           style={{
//             backgroundColor: 'transparent',
//             border: 'none',
//             color: 'black',
//             fontSize: '18px',
//             cursor: 'pointer',
//           }}
//         >
//           <FaRegComment />
//         </button>
//       </div>

//       <p>{post.caption}</p>

//       {showPopup && (
//         <div
//           className="popup-overlay"
//           onClick={handleOutsideClick}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 999,
//           }}
//         >
//           <div
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               backgroundColor: '#fff',
//               padding: '20px',
//               borderRadius: '8px',
//               width: '450px',
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closePopup}
//               style={{
//                 position: 'absolute',
//                 top: '10px',
//                 right: '10px',
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 fontSize: '20px',
//                 cursor: 'pointer',
//               }}
//             >
//               ✖
//             </button>

//             <div
//               style={{
//                 backgroundColor: '#f9f9f9',
//                 height: '400px',
//                 overflowY: 'auto',
//                 padding: '10px',
//                 marginBottom: '10px',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               {comments.slice(0, 40).map((comment: any) => (
//                 <div
//                   key={comment.id}
//                   style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
//                 >
//                   <p><strong>{comment.user.name}</strong>: {comment.content}</p>

//                   {comment.userId === session?.user.id && (
//                     <button
//                       onClick={() => handleDeleteComment(comment.id)}
//                       style={{
//                         backgroundColor: 'transparent',
//                         border: 'none',
//                         color: 'red',
//                         fontSize: '18px',
//                         cursor: 'pointer',
//                       }}
//                     >
//                       <FaTrash />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <input
//               type="text"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Add a comment..."
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 marginBottom: '10px',
//                 borderRadius: '4px',
//                 border: '1px solid #ddd',
//               }}
//             />
//             <button
//               onClick={handleAddComment}
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 borderRadius: '4px',
//                 backgroundColor: '#007bff',
//                 color: 'white',
//                 border: 'none',
//                 cursor: 'pointer',
//               }}
//             >
//               Post
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Post;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FaRegComment, FaRegBookmark, FaBookmark, FaTrash } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

const Post = ({ post }: { post: any }) => {
  const theme = useTheme();
  const { data: session } = useSession();
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.some((like: any) => like.userId === session?.user.id));
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');
  const [inlineNewComment, setInlineNewComment] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarks.some((bookmark: any) => bookmark.userId === session?.user.id));
  const [loading, setLoading] = useState(false);

  // Get colors from theme
  const backgroundColor = theme.palette.background.paper;
  const textColor = theme.palette.text.primary;
  const secondaryTextColor = theme.palette.text.secondary;
  const primaryColor = theme.palette.primary.main;
  const borderColor = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)';
  const commentBgColor = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
  const popupOverlayColor = theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)';
  const likeColor = theme.palette.mode === 'dark' ? '#ff6b6b' : '#e91e63';
  const bookmarkColor = theme.palette.mode === 'dark' ? '#4caf50' : '#43a047';
  const deleteColor = theme.palette.mode === 'dark' ? '#ff5252' : '#f44336';
  const inputBgColor = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.09)' : '#fff';
  const buttonHoverBg = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/feed/getPost/${post.id}`);
        const updatedPost = response.data;
        setLikes(updatedPost.likes.length);
        setIsLiked(updatedPost.likes.some((like: any) => like.userId === session?.user.id));
        setComments(updatedPost.comments);
      } catch (error) {
        console.error('Error fetching updated post:', error);
      }
    };

    fetchPost();
  }, [post.id, session?.user.id]);

  const handleLike = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/feed/likePost', {
        userId: session?.user.id,
        postId: post.id,
      });

      setLikes(response.data.likes);
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
    setLoading(false);
  };

  const handleAddComment = async (content: string, setInputValue: React.Dispatch<React.SetStateAction<string>>) => {
    if (!content.trim()) return;

    try {
      const response = await axios.post('/api/feed/addComment', {
        postId: post.id,
        userId: session?.user.id,
        content: content,
      });

      const addedComment = response.data;

      setComments([...comments, { 
        id: addedComment.id, 
        content: addedComment.content, 
        userId: addedComment.userId, 
        user: { name: session?.user.name } 
      }]);

      setInputValue('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      if (!session?.user.id) {
        alert('You must be logged in to delete a comment');
        return;
      }

      const response = await axios.delete('/api/feed/deleteComment', {
        data: { commentId, userId: session.user.id },
      });

      if (response.status === 200) {
        setComments(comments.filter((comment: any) => comment.id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleBookmark = async () => {
    try {
      await axios.post('/api/feed/bookmarkPost', { userId: session?.user.id, postId: post.id });
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error bookmarking/unbookmarking post:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('popup-overlay')) {
      closePopup();
    }
  };

  // Component for rendering a comment with delete button
  const CommentItem = ({ comment }: { comment: any }) => (
    <div
      style={{ 
        marginBottom: '10px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '8px',
        borderRadius: '6px',
        backgroundColor: commentBgColor,
      }}
    >
      <p style={{ color: textColor, margin: 0 }}>
        <strong>{comment.user?.name || 'Unknown User'}</strong>
        <span style={{ color: secondaryTextColor }}>: {comment.content}</span>
      </p>

      {comment.userId === session?.user.id && (
        <button
          onClick={() => handleDeleteComment(comment.id)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: deleteColor,
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            borderRadius: '50%',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = buttonHoverBg;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <FaTrash />
        </button>
      )}
    </div>
  );

  return (
    <div style={{ 
      marginBottom: '20px', 
      padding: '16px', 
      border: `1px solid ${borderColor}`, 
      borderRadius: '8px',
      backgroundColor: backgroundColor,
      color: textColor,
      boxShadow: theme.palette.mode === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    }}>
      <h3 style={{ color: textColor, marginTop: 0 }}>{post.user.name}</h3>

      <img
        src={post.imageUrl}
        alt="Post"
        style={{ 
          width: '100%', 
          height: 'auto', 
          borderRadius: '8px',
          border: `1px solid ${borderColor}`
        }}
      />

      <div style={{ display: 'flex', gap: '15px', marginTop: '12px', marginBottom: '12px' }}>
        <button
          onClick={handleLike}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: isLiked ? likeColor : secondaryTextColor,
            fontSize: '18px',
            cursor: loading ? 'not-allowed' : 'pointer',
            padding: '6px 12px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s',
          }}
          disabled={loading}
          onMouseOver={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = buttonHoverBg;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {loading ? 'Loading...' : isLiked ? '❤️' : '🤍'} 
          <span>Like ({likes})</span>
        </button>
        
        <button
          onClick={handleBookmark}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: isBookmarked ? bookmarkColor : secondaryTextColor,
            fontSize: '18px',
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = buttonHoverBg;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          <span>Save</span>
        </button>
        
        <button
          onClick={() => setShowPopup(true)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: secondaryTextColor,
            fontSize: '18px',
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = buttonHoverBg;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <FaRegComment /> 
          <span>({comments.length})</span>
        </button>
      </div>

      <p style={{ color: textColor }}>{post.caption}</p>

      {/* Inline comments section */}
      <div style={{ marginTop: '15px', borderTop: `1px solid ${borderColor}`, paddingTop: '10px' }}>
        <h4 style={{ 
          fontSize: '16px', 
          marginBottom: '8px',
          color: textColor,
          fontWeight: 500
        }}>Comments</h4>
        
        {/* Scrollable comments container */}
        <div
          style={{
            backgroundColor: commentBgColor,
            height: '180px',
            overflowY: 'auto',
            padding: '12px',
            marginBottom: '12px',
            borderRadius: '8px',
            boxShadow: theme.palette.mode === 'dark' ? 'inset 0 0 5px rgba(0, 0, 0, 0.2)' : 'inset 0 0 5px rgba(0, 0, 0, 0.05)',
          }}
        >
          {comments.length > 0 ? (
            comments.slice(-5).reverse().map((comment: any) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <p style={{ color: secondaryTextColor, textAlign: 'center', marginTop: '10px' }}>No comments yet</p>
          )}
        </div>

        {/* Inline comment input */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={inlineNewComment}
            onChange={(e) => setInlineNewComment(e.target.value)}
            placeholder="Add a comment..."
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: '20px',
              border: `1px solid ${borderColor}`,
              backgroundColor: inputBgColor,
              color: textColor,
              outline: 'none',
            }}
          />
          <button
            onClick={() => handleAddComment(inlineNewComment, setInlineNewComment)}
            style={{
              padding: '10px 16px',
              borderRadius: '20px',
              backgroundColor: primaryColor,
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'opacity 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Comment
          </button>
        </div>
        
        {comments.length > 5 && (
          <button
            onClick={() => setShowPopup(true)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: primaryColor,
              marginTop: '12px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'opacity 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            View all {comments.length} comments
          </button>
        )}
      </div>

      {showPopup && (
        <div
          className="popup-overlay"
          onClick={handleOutsideClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: popupOverlayColor,
            zIndex: 999,
            backdropFilter: 'blur(3px)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: backgroundColor,
              padding: '24px',
              borderRadius: '12px',
              width: '450px',
              boxShadow: theme.palette.mode === 'dark' ? '0 8px 32px rgba(0, 0, 0, 0.5)' : '0 8px 32px rgba(0, 0, 0, 0.2)',
              border: `1px solid ${borderColor}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'transparent',
                border: 'none',
                color: secondaryTextColor,
                fontSize: '20px',
                cursor: 'pointer',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = buttonHoverBg;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ✖
            </button>

            <h3 style={{ marginTop: 0, marginBottom: '16px', color: textColor }}>Comments</h3>

            <div
              style={{
                backgroundColor: commentBgColor,
                height: '400px',
                overflowY: 'auto',
                padding: '16px',
                marginBottom: '16px',
                borderRadius: '8px',
                boxShadow: theme.palette.mode === 'dark' ? 'inset 0 0 10px rgba(0, 0, 0, 0.3)' : 'inset 0 0 10px rgba(0, 0, 0, 0.05)',
              }}
            >
              {comments.slice(0, 40).map((comment: any) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>

            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              style={{
                width: '100%',
                padding: '12px 16px',
                marginBottom: '12px',
                borderRadius: '24px',
                border: `1px solid ${borderColor}`,
                backgroundColor: inputBgColor,
                color: textColor,
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
            <button
              onClick={() => handleAddComment(newComment, setNewComment)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '24px',
                backgroundColor: primaryColor,
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'opacity 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;