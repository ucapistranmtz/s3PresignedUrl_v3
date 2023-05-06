# s3PresignedUrl_v3
Getting presigned URLs using AWS SDK version 3 and env variables


You must have these environmen in your .env file 
test

```
 AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
 AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
 AWS_DEFAULT_REGION=us-west-2
```

then check the following examples 


## get presigned url to upload a file 
```typescript
  
import { signedUrl, action } from 's3presignedurl_v3';

async function put () {
  const url = await signedUrl( {
    fileKey: 'test.txt',
    bucketName: 'bucket050520223',
    action: action.PUT,
    metadata: { owner: 'ucapistran' },
    endpoint: undefined, //! https://yourendpoint.com
    expiresIn: 3600
  });
  console.log(url)
} 

put()
  
```

 
 ## get presigned url to dowload a file 
 
 ```typescript
  
import { signedUrl, action } from 's3presignedurl_v3';

async function get () {
 const url = await signedUrl( {
    fileKey: 'test.txt',
    bucketName: 'bucket050520223',
    action: action.GET,
    metadata: {},
    endpoint: undefined, //! https://yourendpoint.com
    expiresIn: 3600
  });
  console.log(url)
} 

get()
  
```

If you find this project helpful or useful, please consider <a href="https://www.buymeacoffee.com/ucapistran" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" data-color="#FF5F5F"  alt=" Engineers love Coffee" height="41" width="174"></a>.


Thank you for your support! 
