import { action } from './enums/action';
import signedUrl from './index';
import * as dotenv from 'dotenv';
import signedUrlInput from './models/input';
dotenv.config();

describe('test signedUrl', () => {
  it('should get the url to upload a file ', async () => {
    const input: signedUrlInput = {
      fileKey: 'test.txt',
      bucketName: 'bucket050520223',
      action: action.GET,
      metadata: { owner: 'ucapistran' },
      endpoint: undefined,
      expiresIn: 3600
    };
    const url = await signedUrl(input);
    expect(url).not.toBe(undefined);
    expect(url.includes('x-id=GetObject')).not.toBe(false);
  });
  it('should get the url to download a file ', async () => {
    const input: signedUrlInput = {
      fileKey: 'test.txt',
      bucketName: 'bucket050520223',
      action: action.PUT,
      metadata: { owner: 'ucapistran' },
      endpoint: undefined,
      expiresIn: 3600
    };
    const url = await signedUrl(input);
    expect(url).not.toBe(undefined); 
    expect(url.includes('x-id=PutObject')).not.toBe(false);
  });
});
