const http = require('http');
const url = require('url');
const {response} = require("express");
const request = require('request');



function jsonParser(stringValue) {
    return JSON.parse(stringValue).data.priceUsd;
}

http.createServer((req,res)=>{
    let urlRequest = url.parse(req.url,true);
    console.log(urlRequest.query.currency);
 var options = {
  url: 'http://api.coincap.io/v2/assets/' + urlRequest.query.currency
 };

 function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
      console.log("usd " + jsonParser(body));
   res.end("usd " + jsonParser(body));
  }else {
      response.status = 404;
      console.log("error");
      response.end = 'error';
  }
 }

 request(options, callback);

}).listen(3000);
