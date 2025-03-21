import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../../auth/[...nextauth]/prisma";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

// DELETE /api/comments/:id
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  
  // Find the comment
  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  // Ensure user owns the comment
  if (comment.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Delete the comment
  await prisma.comment.delete({ where: { id } });

  return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
}
