'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "eu-north-1"});

exports.handler = function (event, context, callback) {
    const ddb = new AWS.DynamoDB({apiVersion: "2012-10-08"});
    const params = {
        TableName: "Users",
        Key: {
            id: {
                s: "12345"
            }
        }
    }
    ddb.getItem(params, (error,data) => {
        if(err){
            console.log(err);
        }
        console.log(data);
    })
}