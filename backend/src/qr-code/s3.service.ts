import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

function createS3Client() {
  return new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
}

export async function uploadToS3(file: Express.Multer.File): Promise<string> {
  const S3 = createS3Client();

  const key = `qr-${Date.now()}.png`;

  await S3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }),
  );

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

export async function deleteFromS3(key: string) {
  const S3 = createS3Client();

  await S3.send(
    new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    }),
  );
}
