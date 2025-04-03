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


import { IncomingMessage } from 'http'; // Import IncomingMessage from 'http'
import { NextRequest, NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import { uploadToBlob } from '@/lib/upload'; // Path to your upload function

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser to handle file uploads manually
  },
};

export const POST = async (req: NextRequest) => {
  return new Promise((resolve, reject) => {
    // Convert NextRequest to IncomingMessage
    const incomingReq = req as unknown as IncomingMessage; // Casting NextRequest to IncomingMessage

    const form = new IncomingForm();

    form.parse(incomingReq, async (err: Error | null, fields: any, files: any) => {
      if (err) {
        resolve(
          NextResponse.json({ error: 'Error during file upload' }, { status: 500 })
        );
        return;
      }

      try {
        // Extract caption, ensuring it's a string
        const caption = fields.caption
          ? Array.isArray(fields.caption)
            ? fields.caption[0]
            : fields.caption
          : '';

        // Ensure the file is correctly typed from formidable.File to a native File object
        const formidableFile = files.file[0]; // The file should be in an array format, so access the first item
        const buffer = formidableFile.file; // Get the file buffer

        // Create a new File object for the upload (browsers require this type of constructor)
        const fileForUpload = new File([buffer], formidableFile.originalFilename, {
          type: formidableFile.mimetype,
        });

        // Upload the file to Vercel Blob
        const imageUrl = await uploadToBlob(fileForUpload);

        // Return the uploaded image URL and caption
        resolve(
          NextResponse.json({ imageUrl, caption }, { status: 200 })
        );
      } catch (uploadErr) {
        resolve(
          NextResponse.json({ error: 'Error uploading the image' }, { status: 500 })
        );
      }
    });
  });
};
