// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-southeast-1'});

// Create S3 service object
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

module.exports = {
    s3,
    sqs
}