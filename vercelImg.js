require('dotenv').config(); 
const axios = require('axios');

async function uploadToVercelBlob(fileBuffer, fileName) {
  const response = await axios.post(
    `https://api.vercel.com/v2/now/blobs`,
    fileBuffer,
    {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
        'x-now-digest': 'sha256-' + require('crypto').createHash('sha256').update(fileBuffer).digest('base64'),
        'x-now-file': fileName,
      }
    }
  );
  return `https://myblob.vercel.app/${response.data.sha}`;
}



