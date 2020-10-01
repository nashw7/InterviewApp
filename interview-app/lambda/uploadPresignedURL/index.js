const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' })

AWS.config.update({
    region: "us-east-2",
})

exports.handler = async (event) => {
    const result = await getPresignedURL()
    console.log('Result: ', result)
    return result
}

const getPresignedURL = async function() {
    
    const scanParams = {
        TableName: 'InterviewDataTable',
        AttributesToGet: 'id'
    }
    
    let itemCount = 0
    await ddb.scan(scanParams, (err, data) => {
        console.log('Scanning')
        if(err) {
            console.log("SCAN ERROR:", err);
        }
        itemCount = data.Count
        console.log("SCAN DATA:", data)
    }).promise()
    
    console.log('ItemCount', itemCount)
    
    const newId = 'img00' + (itemCount + 1)

    const s3Params = {
        Bucket: 'interview-uploads-nashw',
        Key: `${newId}.jpg`,
        ContentType: 'image/*',
        ACL: 'public-read'
    }
    
    return new Promise((resolve, reject) => {
        resolve({
            "statusCode": 200,
            "body": JSON.stringify({
                "URL": s3.getSignedUrl('putObject', s3Params),
                "newFilename": `${newId}.jpg`,

            })
        })
    })
}