'use strict';

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-providers';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import * as dotenv from 'dotenv';
dotenv.config();

export enum action {
  PUT = 'PutObjectCommand',
  GET = 'GetObjectCommand'
}

export interface signedUrlInput {
  fileKey: string;
  bucketName: string;
  action: action;
  metadata: Record<string, string>;
  endpoint: string | undefined;
  expiresIn: number;
}

export async function signedUrl(input: signedUrlInput) {
  let url = '';
  let command: GetObjectCommand | PutObjectCommand | undefined = undefined;
  try {
    const client: S3Client = new S3Client({
      region: process.env.AWS_DEFAULT_REGION,
      credentials: fromEnv()
    });
    switch (input.action) {
      case action.PUT:
        command = new PutObjectCommand({
          Metadata: input.metadata,
          Bucket: input.bucketName,
          Key: input.fileKey
        });
        break;
      case action.GET:
        command = new GetObjectCommand({
          Bucket: input.bucketName,
          Key: input.fileKey
        });
        break;
    }

    url = await getSignedUrl(client, command, { expiresIn: input.expiresIn });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    throw error;
  }

  if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line no-console
    console.log(url);
  }

  return url;
}
