import { prisma } from '../../auth/[...nextauth]/prisma'; // Ensure prisma is correctly initialized

export async function POST(req: Request) {
  const { postId, userId, content } = await req.json();

  if (!postId || !userId || !content) {
    return new Response(
      JSON.stringify({ error: 'PostId, UserId, and Content are required' }),
      { status: 400 }
    );
  }

  try {
    // Create a new comment in the database
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    });

    // Return the new comment data (you could also fetch the full post with the comment if needed)
    return new Response(JSON.stringify(newComment), { status: 200 });
  } catch (error) {
    console.error('Error adding comment:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
