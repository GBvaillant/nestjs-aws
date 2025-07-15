import { Injectable } from '@nestjs/common';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from './s3.config';

@Injectable()
export class S3Service {
  async uploadFile(bucket: string, key: string, body: Buffer) {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
    });

    return await s3Client.send(command);
  }
}
