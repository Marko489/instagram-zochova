



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


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FaRegComment, FaRegBookmark, FaBookmark, FaTrash } from 'react-icons/fa'; // Import trashcan icon

const Post = ({ post }: { post: any }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.some((like: any) => like.userId === session?.user.id));
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarks.some((bookmark: any) => bookmark.userId === session?.user.id));
  const [loading, setLoading] = useState(false);

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

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post('/api/feed/addComment', {
        postId: post.id,
        userId: session?.user.id,
        content: newComment,
      });

      const addedComment = response.data;

      setComments([...comments, { 
        id: addedComment.id, 
        content: addedComment.content, 
        userId: addedComment.userId, 
        user: { name: session?.user.name } 
      }]);

      setNewComment('');
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

  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>{post.user.name}</h3>

      <img
        src={post.imageUrl}
        alt="Post"
        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
      />

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px', marginBottom: '10px' }}>
        <button
          onClick={handleLike}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: isLiked ? 'red' : 'black',
            fontSize: '18px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          disabled={loading}
        >
          {loading ? 'Loading...' : isLiked ? '❤️' : '🤍'} Like ({likes})
        </button>
        <button
          onClick={handleBookmark}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: isBookmarked ? 'green' : 'black',
            fontSize: '18px',
            cursor: 'pointer',
          }}
        >
          {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
        <button
          onClick={() => setShowPopup(true)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'black',
            fontSize: '18px',
            cursor: 'pointer',
          }}
        >
          <FaRegComment />
        </button>
      </div>

      <p>{post.caption}</p>

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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              width: '450px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ✖
            </button>

            <div
              style={{
                backgroundColor: '#f9f9f9',
                height: '400px',
                overflowY: 'auto',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              {comments.slice(0, 40).map((comment: any) => (
                <div
                  key={comment.id}
                  style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <p><strong>{comment.user.name}</strong>: {comment.content}</p>

                  {comment.userId === session?.user.id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'red',
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            />
            <button
              onClick={handleAddComment}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
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
