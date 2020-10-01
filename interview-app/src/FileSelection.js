import React, { Component } from 'react';
import { CustomInput, FormGroup, Button } from 'reactstrap';


class FileSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      cloudFileName: null,
      url: null,
      fileMeta: null,
      uploadResponse: null,
    }
  }

  selectFile = async (e) => {
    const { files } = e.target
    const file = files[0]

    try {
      const response = await fetch('https://ofcy2jw423.execute-api.us-east-2.amazonaws.com/default/uploadPresignedURL')
      let responseJson = await response.json();

      const fileMeta = {
        id: responseJson.newFilename,
        originalName: file.name,
        lastModified: file.lastModifiedDate,
        size: file.size,
        type: file.type,
      }

      console.log('RESPONSE', responseJson)
      console.log('Cloud File Name:', responseJson.newFilename)
      console.log('URL:', responseJson.URL)
      console.log('File Meta:', fileMeta)

      this.setState({ cloudFileName: responseJson.newFilename, url: responseJson.URL, file, fileMeta })
		} catch (error) {
			console.error(error);
		}
  }

  uploadFile = async () => {
      // Upload the image to our pre-signed URL. Method supposed to be POST but ran into permission and "CORS" errors, PUT works 
      const uploadResponse = await fetch(this.state.url, {
        credentials: 'include',
        method: 'PUT',
        headers: {'Content-Type': 'image/*',},
        body: this.state.file,
      })
      console.log('S3 Response', uploadResponse)
      
      //Add new Item to DynamoDB, API call below fails due to CORS issues (Both PUT and)
      const databaseResponse = await fetch('https://r6b7n8z821.execute-api.us-east-2.amazonaws.com/default/putDynamoItem', {
        credentials: 'include',
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: this.state.fileMeta,
      })
      console.log('DB Response', databaseResponse)
  }

  
  render() {
    const { file, cloudFileName, } = this.state
    let name = ''
    if (file) {
      name = file.name
    }
    return (
      <FormGroup>
        <CustomInput
          id="fileSelector"
          type="file"
          onChange={this.selectFile}
          name="file"
          label={name}
        />
        <br></br>
        Id on Cloud: {cloudFileName}
        <br></br>
         <Button 
          color="primary" 
          onClick={this.uploadFile}
          >Upload</Button>
          <br></br>
      </FormGroup>
    )
  }
}

export default FileSelection
