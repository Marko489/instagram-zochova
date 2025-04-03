import { put } from "@vercel/blob";

export async function uploadToBlob(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { url } = await put("uploads/" + file.name, buffer, {
      access: "public",
      token: process.env.VERCEL_BLOB_TOKEN,
    });

    return url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("Failed to upload file");
  }
}
