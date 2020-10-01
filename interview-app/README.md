This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

Clone this repo to your local drive, and use the package manager npm to install necessary packages

```
npm i
```

## Usage

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

Once the app is running, simply select an image to upload. 

With an image is selected, a presigned URL is obtained from S3, and pressing the Upload button will both upload the 
image and persist relevant metadata to a DynamoDB database. 

## Issues

I could not seem to get CORS to cooperate, and as a result had a lot of difficulty passing information to Lambda functions using an HTTP POST or PUT request.
I could have made the application do everything (from requesting presigned URL to uploading the image and updating dynamo) as soon as the file was selected, but splitting the selection and upload into two different actions seemed like the correct route. Unfortunately, this means I was unable to pass any metadata to the lambda function for updating the database. As a result, the "ID on Cloud" remains at img001.jpg because the database is never updated. Previously I had the database updating with dummy info on file selection so the ID would increment, but I left the code in a form that it WOULD have worked, had I been able to pass information to the lambda. test_event.js in the putDynamoItem directory represent what the body ofa PUT/POST request to that lambda would look like. 


## License
[MIT](https://choosealicense.com/licenses/mit/)


