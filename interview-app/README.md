This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

Use the package manager npm to install necessary packages

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

Once the app is running, simply select an image to upload. Once an image is selected,
a presigned URL is obtained from S3, and pressing the Upload button will upload the 
image and persist relevant metadata to a DynamoDB database. 


## License
[MIT](https://choosealicense.com/licenses/mit/)


