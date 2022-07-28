const { resolve } = require('path');
var { s3 } = require('./amazon');


 function upload (bucket, key, stream) {
  return new Promise( (resolve, reject) => {
    var params = {Bucket: bucket, Key: key, Body: stream};
  s3.upload(params, function(err, data) {
    console.log(err, data);
    if(err) {
      console.log(reject)
    }
    resolve();
  });

  })
}
module.exports = {
    upload 
}