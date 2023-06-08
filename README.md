# LAB - Class 17

## Project: AWS: S3 and Lambda

### Author: Donna Ada

### Problem Domain

Create an AWS Lambda with that is triggered when a `.png` file is uploaded to an s3 bucket, and automatically run some processing on image.

### Collaborators

Reference Lecture Notes by Ryan Gallaway


### Setup

#### `.env` requirements

Create `.env` file with PORT number of your choice 
  - `PORT=<PORT_NUMBER>`

#### How to initialize/run your application

- `npm i`
- create `.env` file with PORT number of your choice

#### Routes

- GET : `/` - Proof of Life Route

#### Tests

- Proof of Life Test using `app.get()`.

### Lambda

#### How to use your lambda.

In order for the Lambda function to be triggered, a `.png` file must be uploaded to the `dmaa-images` AWS S3 Bucket.

#### Some issues encountered

- Improper checking during `if-else` logic that checks if name exists.
- Forgetting to add a limitation based on specific key ending.
  - created infinite loop when .json file added.
- Adding create logic in wrong code block causing data to never be added.
- Not stringifying the data being passed into the body on Put caused errors.
- Not specifying `application/json` in parameters on Put caused error.


#### [Link to images.json](https://dmaa-images.s3.us-west-2.amazonaws.com/images.json)