import { prisma } from '../../auth/[...nextauth]/prisma'; // Ensure prisma is correctly initialized

export async function DELETE(req: Request) {
  const { commentId, userId } = await req.json();

  if (!commentId || !userId) {
    return new Response(
      JSON.stringify({ error: 'CommentId and UserId are required' }),
      { status: 400 }
    );
  }

  try {
    // Find the comment by its ID
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    // Check if the comment exists
    if (!comment) {
      return new Response(
        JSON.stringify({ error: 'Comment not found' }),
        { status: 404 }
      );
    }

    // Ensure that the user is the owner of the comment
    if (comment.userId !== userId) {
      return new Response(
        JSON.stringify({ error: 'You can only delete your own comments' }),
        { status: 403 }
      );
    }

    // Delete the comment
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Comment deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting comment:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
