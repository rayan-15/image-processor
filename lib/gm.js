var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});
var path = require('path')

function size(key){
    return new Promise( (resolve, reject) =>
     
gm(path.resolve('../screenshot.png'))
.size(function (err, size) {
    size = {width: 200}
    console.log("hello gm")
    console.log(err)
    console.log(size)
    if (!err)
      console.log(size.width > size.height ? 'wider' : 'taller than you');
      resolve(size);
  }));
}

module.exports = {
    size
}