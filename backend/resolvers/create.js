'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        City: {
            id: uuid.v4(),
            createdAt: Date.now(),
            name: data.name,
            description: data.description,
        }
    };
    return dynamoDb.put(params).promise()
        .then(result => params.City)
}; 