import aws from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()


aws.config.update({
  accessKeyId: process.env.AWSS_SEC_KEY,
  secretAccessKey: process.env.AWSS_ACCESS_KEY,
  region: process.env.AWSS_REGION
});


const s3 = new aws.S3();

 const uploadFile = async (files) => {
  const params = {
    Bucket: process.env.AWSS_BUCKET_NAME,
    Key: `images/${Date.now()}_${files.originalname}`,
    Body: files.buffer, // Set the file content as the Body
  };

  console.log('Upload Params:', params)
  try {
      const data = await s3.upload(params).promise();
      return data;
  } catch (error) {
      throw new Error(`Error uploading file: ${error.message}`);
  }
};
