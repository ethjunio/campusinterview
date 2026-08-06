import {
  CreateBucketCommand,
  GetObjectCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { STORAGE_BUCKETS, StorageBucket } from './storage.buckets';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  public readonly client: S3Client;

  public constructor(config: ConfigService) {
    this.client = new S3Client({
      endpoint: config.getOrThrow<string>('RUSTFS_ENDPOINT'),
      region: config.get<string>('RUSTFS_REGION') ?? 'us-east-1',
      forcePathStyle: true,
      credentials: {
        accessKeyId: config.getOrThrow<string>('RUSTFS_ACCESS_KEY'),
        secretAccessKey: config.getOrThrow<string>('RUSTFS_SECRET_KEY'),
      },
    });
  }

  public async onModuleInit() {
    await Promise.all(
      STORAGE_BUCKETS.map((bucket) => this.ensureBucketExists(bucket)),
    );
  }

  private async ensureBucketExists(bucket: string) {
    try {
      await this.client.send(new HeadBucketCommand({ Bucket: bucket }));
    } catch (error) {
      if (
        !(error instanceof Error) ||
        !('$metadata' in error) ||
        (error as { $metadata: { httpStatusCode?: number } }).$metadata
          .httpStatusCode !== 404
      ) {
        throw error;
      }

      this.logger.log(`Bucket "${bucket}" not found, creating it`);
      await this.client.send(new CreateBucketCommand({ Bucket: bucket }));
    }
  }

  public async putObject(
    bucket: StorageBucket,
    key: string,
    body: Buffer,
    contentType?: string,
  ) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
  }

  public async getPresignedUrl(
    bucket: StorageBucket,
    key: string,
    expiresInSeconds = 3600,
  ): Promise<string> {
    return getSignedUrl(
      this.client,
      new GetObjectCommand({ Bucket: bucket, Key: key }),
      { expiresIn: expiresInSeconds },
    );
  }
}
