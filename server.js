var aws = require('aws-sdk');
var express = require('express');
var app = express();
var fs = require('fs');
var { s3 } = require('./lib/amazon')
var { upload } = require('./lib/utils')
const sharp = require('sharp');
const { query } = require('./lib/sqs')
const { size } = require('./lib/gm') 
 
 
var AWS = require('aws-sdk');
var path = require('path');
var fs = require('fs');
const { resolve } = require('path');

 AWS.config.update({
//     accessKeyId: AWS.config.credentials.accessKeyId,
//     secretAccessKey: AWS.config.credentials.secretAccessKey,
    region: AWS.config.region
  });
  
  
  
  const { Consumer } = require('sqs-consumer');

  
  const cons = Consumer.create({
    queueUrl: 'https://sqs.ap-south-1.amazonaws.com/005727460644/my-queue',
    handleMessage: async (message) => {
      console.log(message)
      console.log("-----")
      var obj = JSON.parse(message.Body)
      console.log(typeof obj)
      console.log("-----")
      const {bucket, key} = obj
     await download(bucket, key);
     await resizeImg(key)
     let readStream = fs.createReadStream(getThumbnailName(key))
     await upload('rayans-awsbucket', getThumbnailName(key), readStream);
     var sizedata = await size(key)
    console.log(sizedata)

//      var sql = "INSERT INTO rayan (filename, width, height, filesize) VALUES ('screenshot_200.png', 200, 200, '60kb')"
//      console.log("doneeeeee")
//     await query(sql)
//     console.log("okokok")
    }
  });
  
  cons.on('error', (err) => {
    console.error(err.message);
  });
  
  cons.on('processing_error', (err) => {
    console.error(err.message);
  });
  
  cons.start();
  
  
  
  
  function download(bucket, key) {
      return new Promise( (resolve, reject) => {
          
          var s3 = new AWS.S3();
          var params = {
            Bucket: bucket, 
            Key: key
          };
          let readStream = s3.getObject(params).createReadStream();
          let writeStream = fs.createWriteStream(path.join(__dirname, key));
          readStream.pipe(writeStream);
          readStream.on('end', function () {
            resolve()
          });
          console.log('done')
    }
    ) 
  }
  

  
  
  
  async function resizeImg(fileName) {
    return new Promise( async (resolve, reject) => {
        console.log(fileName)
        
      let buffer = await sharp('./screenshot.png')
        .rotate()
        .resize(200)
        .jpeg({ mozjpeg: true })
        .toBuffer();
        console.log(buffer)
        console.log('done')
        let writeStream = fs.createWriteStream("./" + getThumbnailName(fileName));
       writeStream.write(buffer);
       resolve();
      })
    }
  

  function getThumbnailName(fileName){
    const words = fileName.split('.');
    const ext = words.pop()  
    return words.join(".") + "_200." + ext;      
  }
  
  

  
//   var params = {Bucket: 'rayans-awsbucket', Key: 'resizedimg.png', Body: readStream};
//   s3.upload(params, function(err, data) {
//     console.log(err, data);
//   });
//   console.log("done")
  
 
  
  
//   var Jimp = require('jimp');
   
//   // open a file called "s3data.png"
//   Jimp.read('s3data.png')
//     .then(s3data => {
//       return s3data
//         .resize(200, 200) // resize
//         .quality(60) // set JPEG quality
//         .greyscale() // set greyscale
//         .toBuffer();
//         .write('s3data-small.jpg'); // save
//     })
//     .catch(err => {
//       console.error(err);
//     })