import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { prisma } from "../../auth/[...nextauth]/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { postId } = await req.json();
    const userId = session.user.id;

    const existingLike = await prisma.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
      return NextResponse.json({ message: "Post unliked successfully" });
    } else {
      await prisma.like.create({ data: { userId, postId } });
      return NextResponse.json({ message: "Post liked successfully" });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to like/unlike post" }, { status: 500 });
  }
}
