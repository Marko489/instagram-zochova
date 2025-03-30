import { prisma } from '../../auth/[...nextauth]/prisma'; // Ensure this path is correct
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { userId, postId } = await req.json(); // Use `await req.json()` to parse the body

  if (!userId || !postId) {
    return NextResponse.json({ error: 'UserId and PostId are required' }, { status: 400 });
  }

  try {
    // Find the like for the user and post combination
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    if (existingLike) {
      // If the post is already liked, unlike the post (delete like)
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      
      // Return the updated number of likes and whether the post is liked
      const updatedLikes = await prisma.like.count({
        where: { postId: postId }
      });
      
      return NextResponse.json({
        message: 'Post unliked successfully',
        likes: updatedLikes, // Return the updated like count
        isLiked: false, // Indicate that the post is no longer liked
      });
    } else {
      // If the post isn't liked, like the post (create like)
      await prisma.like.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });
      
      // Return the updated number of likes and whether the post is liked
      const updatedLikes = await prisma.like.count({
        where: { postId: postId }
      });

      return NextResponse.json({
        message: 'Post liked successfully',
        likes: updatedLikes, // Return the updated like count
        isLiked: true, // Indicate that the post is liked
      });
    }
  } catch (error) {
    console.error('Error liking/unliking post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
