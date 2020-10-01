# InterviewApp

This is the application Will Nash built for his interview with LJA Engineering.

## Description

This app works as a file uploader. 

By selecting an image using the file browser, a presigned URL for upload is requested from a Lambda function. The lambda returns this presigned url, as well as the cloud-id of this new image (based on # of existing entries in database). Metadata about the image is also saved to state here. 

When upload is pressed, the image is sent to the S3 bucket using the requested presigned URL, and a new entry is created in the database representing this uploaded image. 


## Navigate to interview-app for insturctions on running the app.

## License
[MIT](https://choosealicense.com/licenses/mit/)
