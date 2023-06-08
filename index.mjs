import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Response } from 'node-fetch';



export const handler = async (event) => {

  //basic proof of life
  console.log('This is the test event', event.Records[0].s3.object.key.split('k')[0]);

  const s3Client = new S3Client({ region: "us-west-2" });


  const params = {
    // Key: event.Records[0].s3.object.key,
    Key: 'images.json',
    Bucket: 'dmaa-images'
  }

  let obj = event.Records[0].s3.object;

  let img = {
    name: (obj.key.split('.')[0]),
    'size (kb)': obj.size / 1000,
    type: (obj.key.split('.')[1])
  }


  let data;

  // GET FROM images.json
  try {
    let results = await s3Client.send(new GetObjectCommand(params));
    let response = new Response(results.Body);
    data = await response.json();


  } catch (e) {
    console.log("Error Handler Event", JSON.stringify(e, undefined, " "));
  }

  try {

    //CHECK IF DATA IMAGES[] IS EMPTY
    if (data.images.length === 0) {
      data.images.push(img);

    } else {

      //CHECK IF NAMES EXIST
      let imgNames = [];

      for (let i = 0; i < data.images.length; i++) {
        imgNames.push(data.images[i].name)
      }


      if (imgNames.indexOf(obj.key.split('.')[0]) !== -1) {
        console.warn('Image exists in bucket')
      } else {
        data.images.push(img);
      }

    }

    let params = {
      Key: 'images.json',
      Bucket: 'dmaa-images',
      Body: JSON.stringify(data),
      ContentType: "application/json",
    }

    let results = await s3Client.send(new PutObjectCommand(params));
    let response = new Response(results.Body);

  } catch (e) {
    console.error(e || e.message)
  }


  const response = {
    statusCode: 200,
    body: data,
  };
  return response;
};
