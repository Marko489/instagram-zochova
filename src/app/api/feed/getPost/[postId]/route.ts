import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../auth/[...nextauth]/prisma'; // Adjust the path as needed

export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = params;

  try {
    // Fetch the post with comments, likes, and bookmarks
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        comments: {
          include: {
            user: { select: { name: true, email: true } }, // Include user details in comments
            likes: true, // Include likes on comments if needed
          },
        },
        likes: {
          include: {
            user: { select: { name: true, email: true } }, // Include user details in likes
          },
        },
        bookmarks: true, // Include bookmarks
        user: { select: { name: true, email: true, image: true } }, // Include user details for the post
      },
    });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
