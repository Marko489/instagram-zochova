import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { prisma } from "../../auth/[...nextauth]/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { postId, content, parentId } = await req.json();
    const userId = session.user.id;

    if (!content.trim()) return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });

    const comment = await prisma.comment.create({
      data: { userId, postId, content, parentId },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) return NextResponse.json({ error: "Post ID is required" }, { status: 400 });

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: { select: { id: true, name: true } },
        replies: {
          include: { user: { select: { id: true, name: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { commentId, content } = await req.json();
    const userId = session.user.id;

    const comment = await prisma.comment.update({
      where: { id: commentId, userId },
      data: { content, edited: true, updatedAt: new Date() },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: "Failed to edit comment" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { commentId } = await req.json();
    const userId = session.user.id;

    await prisma.comment.delete({
      where: { id: commentId, userId },
    });

    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
