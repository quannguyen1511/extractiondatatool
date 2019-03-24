const elasticsearch = require("elasticsearch");
var fs = require('fs');
var db = require("./db");
const promiseWrapper = require("./utils/promise.util");
var model = require("./models/disease.model");
const client = new elasticsearch.Client({
  // hosts: ["https://site:275c5e120960e83bd2b613cf4e2fa995@ori-eu-west-1.searchly.com"]    
  hosts: ["https://site:281b1d1ac369455328020a6e3f2ffce3@ori-eu-west-1.searchly.com"]

});

// client.ping(
//   {
//     requestTimeout: 30000
//   },
//   function (error) {
//     if (error) {
//       console.error("elasticsearch cluster is down!");
//     } else {
//       console.log("Everything is ok");
//     }
//   }
// );
client.indices.create(
  {
    index: "diseases"
  },
  async function(error, response, status) {
    if (error) {
      console.log(error);
    } else {
      console.log("created new index", response);
      var bulk = [];
     var diseases = require('./data.json');
      diseases.forEach(disease => {
        console.log(disease)
        bulk.push({
          index: {
            _index: "diseases",
            _type: "diseases_list",
            _id: disease._id
          }
        });
        delete disease._id;
        delete disease.__v;
        console.log(disease)
        bulk.push(disease);
      });
      client.bulk({ body: bulk }, function(err, response) {
        if (err) {
          console.log("Failed Bulk operation", err);
        } else {
          console.log("Successfully imported ", bulk.length);
        }
      });
    }
  }
);
// async function writeFile (){
//   var diseases = JSON.stringify(await promiseWrapper(model, model.find, {}));
//   fs.writeFile('data.json', diseases,'utf8' ,(err) => {
//     if (err) {
//       console.log(err)
//     }
//   })
// }