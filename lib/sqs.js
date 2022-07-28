const con = require("../connection")

async function query(sql) {
    return new Promise( (resolve, reject) => {
        console.log(typeof con.query)
        con.query(sql, function (err, result) { 
          
            if (err) throw err;
            console.log("1 record inserted");
            resolve(result);
         })
        
    })
    
}

module.exports = {
    query 
};