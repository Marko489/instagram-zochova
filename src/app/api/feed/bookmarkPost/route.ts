import { prisma } from '../../auth/[...nextauth]/prisma'; // Ensure prisma is correctly initialized

export async function POST(req: Request) {
  const { userId, postId } = await req.json();

  if (!userId || !postId) {
    return new Response(JSON.stringify({ error: 'UserId and PostId are required' }), {
      status: 400,
    });
  }

  try {
    // Check if the user has already bookmarked the post
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    if (existingBookmark) {
      // If already bookmarked, remove the bookmark (delete bookmark)
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      });
      return new Response(JSON.stringify({ message: 'Post unbookmarked successfully' }), {
        status: 200,
      });
    } else {
      // If not bookmarked, add the bookmark (create bookmark)
      await prisma.bookmark.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });
      return new Response(JSON.stringify({ message: 'Post bookmarked successfully' }), {
        status: 200,
      });
    }
  } catch (error) {
    console.error('Error bookmarking/unbookmarking post:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
