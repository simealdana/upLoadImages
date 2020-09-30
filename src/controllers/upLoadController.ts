import { Request, Response } from 'express';
import { errorMessage } from '../lib/helpers';
require('dotenv').config(); // Loading dotenv to have access to env variables
const AWS:any = require('aws-sdk')// Requiring AWS SDK.

class UpLoadImage {
    
  public  async generateGetUrl(req: Request, res: Response){

    const { Key}=req.query;
    AWS.config = new AWS.Config({
        accessKeyId: process.env.S3_KEY, // stored in the .env file
        secretAccessKey: process.env.S3_SECRET, // stored in the .env file
        region: process.env.BUCKET_REGION // This refers to your bucket configuration.
    });

    const s3 = await new AWS.S3();
    const Bucket = process.env.BUCKET_NAME;
    const params = {
      Bucket,
      Key,
      Expires: 120// 20 minutes
    };
    await s3.getSignedUrl('getObject', params, (err, url) => {
          if (err) {
            const error = errorMessage(500)
            res.status(500).json({error,err});
          } else {
            res.status(200).json({url});
          }
        });

  }

  public async generatePutUrl(req: Request, res: Response){

    const { Key, ContentType}=req.query;
    AWS.config = new AWS.Config({
        accessKeyId: process.env.S3_KEY, // stored in the .env file
        secretAccessKey: process.env.S3_SECRET, // stored in the .env file
        region: process.env.BUCKET_REGION // This refers to your bucket configuration.
    });

    const s3 = await new AWS.S3();
    const Bucket = process.env.BUCKET_NAME;
    const params = { Bucket, Key, ContentType,Expires:500 };

    await s3.getSignedUrl('putObject', params, (err, data) => {
      if(err){
        console.log(err);
        res.json({success: false, error: err})
      }
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
    const returnData = {
        signedRequest: data,
        url: `https://${Bucket}.s3.amazonaws.com/ladingpage1/${Key}`
      };
      // Send it all back
      res.json({success:true, data:{returnData}});
    });
    
  }

  public async getListBucket(req: Request, res: Response){

    AWS.config.setPromisesDependency();

    AWS.config = new AWS.Config({
      accessKeyId: process.env.S3_KEY, // stored in the .env file
      secretAccessKey: process.env.S3_SECRET, // stored in the .env file
      region: process.env.BUCKET_REGION // This refers to your bucket configuration.
    });

    const s3 = await new AWS.S3();

    const Bucket = process.env.BUCKET_NAME;

    const response = await s3.listObjectsV2({
      Bucket,
    }).promise()

    console.log(response)
    await res.status(200).json(response)
  }

}

export const upLoadImage = new UpLoadImage();