// /api/feed/getPosts.ts
// /src/app/api/feed/getPosts/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../auth/[...nextauth]/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        likes: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        bookmarks: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(posts); // Return posts as JSON response
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
