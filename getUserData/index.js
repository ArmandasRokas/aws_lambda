'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "eu-north-1"});

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({apiVersion: "2012-10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "eu-north-1"});

    let responseBody = "";
    let statusCode = 0;

    const { id } = event.pathParameters;

    const params = {
        TableName: "Users",
        Key: {
            id: id
        }
    }

    try{
        const data = await documentClient.get(params).promise();
        responseBody = JSON.stringify(data.Item);
        statusCode = 200; 
    } catch(err){
        responseBody = `Unable get user data`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "myHeader": "test"
        },
        body: responseBody
    }
    return response;
}
