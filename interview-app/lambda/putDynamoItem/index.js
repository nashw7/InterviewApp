const AWS = require('aws-sdk')

const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' })

exports.handler = async (event, context, callback) => {
    
    const params = {
        TableName: 'InterviewDataTable',
        Item: {
            id: event.id,
            uploaded: Date.now(),
            lastModified: event.lastModified,
            originalName: event.originalName,
            size: event.size,
            type: event.type,
        }   
    }
    console.log('Params', params)
    return await ddb.put(params, (err, data) => {
        if(err) {
            console.log("ERROR:", err);
        }
        console.log("DATA:", data)
    }).promise()
}







