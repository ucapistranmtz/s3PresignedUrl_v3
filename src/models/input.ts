import { action } from '../enums/action';

export interface signedUrlInput {
  fileKey: string;
  bucketName: string;
  action: action;
  metadata: Record<string, string>;
  endpoint: string | undefined;
  expiresIn: number;
}
