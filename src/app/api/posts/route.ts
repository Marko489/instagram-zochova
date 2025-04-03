// import { IncomingMessage } from 'http';
// import { IncomingForm, Fields, Files } from 'formidable';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { uploadToBlob } from '@/lib/upload'; // Path to your upload function

// export const config = {
//   api: {
//     bodyParser: false, // Disable built-in body parser to handle file uploads manually
//   },
// };

// const uploadHandler = (req: NextApiRequest, res: NextApiResponse) => {
//   const form = new IncomingForm();

//   form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
//     if (err) {
//       res.status(500).json({ error: 'Error during file upload' });
//       return;
//     }

//     try {
//       // Extract caption, ensuring it's a string
//       const caption = fields.caption ? (Array.isArray(fields.caption) ? fields.caption[0] : fields.caption) : '';

//       // Ensure the file is correctly typed from formidable.File to a native File object
//       const formidableFile = files.file as formidable.File;
//       const fileForUpload = new File([formidableFile.file], formidableFile.originalFilename, {
//         type: formidableFile.mimetype,
//       });

//       // Upload the file to Vercel Blob
//       const imageUrl = await uploadToBlob(fileForUpload);

//       // Return the uploaded image URL and caption
//       res.status(200).json({
//         imageUrl,
//         caption,
//       });
//     } catch (uploadErr) {
//       res.status(500).json({ error: 'Error uploading the image' });
//     }
//   });
// };

// export default uploadHandler;

// src/app/api/posts/route.ts

// src/app/api/posts/route.ts
// src/app/api/posts/route.ts

// src/app/api/posts/route.ts

// src/app/api/posts/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { uploadToBlob } from '@/lib/upload';
// import { prisma } from '@/app/api/auth/[...nextauth]/prisma'; // Assuming you have a prisma instance

// export const POST = async (req: NextRequest) => {
//   try {
//     const formData = await req.formData();
//     const caption = formData.get('caption')?.toString() || '';
//     const file = formData.get('file') as File;

//     if (!file) {
//       return NextResponse.json({ error: 'File not found' }, { status: 400 });
//     }

//     const imageUrl = await uploadToBlob(file);

//     // Create the new post in the database
//     const newPost = await prisma.post.create({
//       data: {
//         userId: 'userId', // Replace with the actual userId (you'll likely get it from the session)
//         imageUrl: imageUrl,
//         caption: caption,
//       },
//     });

//     return NextResponse.json(newPost, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ error: 'Error uploading the file' }, { status: 500 });
//   }
// };


// import { NextRequest, NextResponse } from 'next/server';
// import { uploadToBlob } from '@/lib/upload';
// import { prisma } from '@/app/api/auth/[...nextauth]/prisma'; // Import Prisma client

// export const POST = async (req: NextRequest) => {
//   try {
//     // Get form data (caption and file)
//     const formData = await req.formData();
//     const caption = formData.get('caption')?.toString() || '';
//     const file = formData.get('file') as File;

//     if (!file) {
//       return NextResponse.json({ error: 'File not found' }, { status: 400 });
//     }

//     // Upload the file to blob storage
//     const imageUrl = await uploadToBlob(file);

//     // Save the post to the database
//     const post = await prisma.post.create({
//       data: {
//         userId: "USER_ID", // Replace with the actual user ID, you may need to retrieve it from session or JWT
//         imageUrl: imageUrl,
//         caption: caption,
//       },
//     });

//     // Return the response with the created post
//     return NextResponse.json(post, { status: 200 });
//   } catch (err) {
//     console.error('Error creating post:', err);
//     return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
//   }
// };


import { NextRequest, NextResponse } from 'next/server';
import { uploadToBlob } from '@/lib/upload';
import { prisma } from '@/app/api/auth/[...nextauth]/prisma'; // Import Prisma client
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'; // Import authOptions to get session

export const POST = async (req: NextRequest) => {
  try {
    // Get the session (including the user ID)
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Get form data (caption and file)
    const formData = await req.formData();
    const caption = formData.get('caption')?.toString() || '';
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 400 });
    }

    // Upload the file to blob storage
    const imageUrl = await uploadToBlob(file);

    // Save the post to the database
    const post = await prisma.post.create({
      data: {
        userId: session.user.id, // Use the user ID from the session
        imageUrl: imageUrl,
        caption: caption,
      },
    });

    // Return the response with the created post
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error('Error creating post:', err);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
};

