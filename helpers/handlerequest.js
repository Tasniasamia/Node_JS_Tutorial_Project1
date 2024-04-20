const url=require('url');
const {StringDecoder} =require('string_decoder');
const decoder=new StringDecoder('utf-8');
const route=require('../router');
const {parseJSON}=require('../helpers/utilities');
const {notFoundRequest}=require('../handler/notfoundrequest');
// const handleRequest=(req,res)=>{
//     const path=url.parse(req.url, true);
//     const pathName=path.pathname
//     const trimePath=pathName.replace(/^\/+|\/+$/g, '');
//     const method=req.method.toLowerCase();
//     const headers=req.headers;
//     const queryString=path.query;
//     console.log(path);
//     console.log(trimePath);
//     const requestproperties= {
//         path,
//         pathName,
//         trimePath,
//         method,
//         headers,
//         queryString
//     }
//     console.log(trimePath);
//     let currentRequest = route[trimePath] ? route[trimePath] : notFoundRequest;
//     let realData="";
//     req.on('data',(buffer)=>{
//     realData+=decoder.write(buffer);
        
//     })
//     req.on('end',()=>{
//     realData+=decoder.end();
//     console.log("Real Data",realData);
//     requestproperties.body=parseJSON(realData);
//     currentRequest(requestproperties, callback = (statuscode,payload)=>{
//         console.log(statuscode),
//         console.log("payload data" ,payload);
//         let status= typeof statuscode === "number" ? statuscode : 500;
//         let payloaddata= typeof payload === "object"? payload : {}
//         const payloadString=JSON.stringify(payloaddata);
//         console.log(payloadString);
//         res.setHeader('Content-Type','application/json');
//         res.writeHead(status);
//         res.write(payloadString);
//         res.end();
//         })

//  })
   
    
//      }
const handleRequest = (req, res) => {
    const decoder = require('string_decoder').StringDecoder;
    const url = require('url');

    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const headers = req.headers;
    const queryString = parsedUrl.query;

    console.log("Path:", pathName);

    const requestProperties = {
        pathName,
        method,
        headers,
        queryString
    };

    let currentRequest = route[pathName] ? route[pathName] : notFoundRequest;

    let realData = '';
    const decode = new StringDecoder('utf-8');

    req.on('data', (chunk) => {
        realData += decode.write(chunk);
    });

    req.on('end', () => {
        realData += decode.end();
        console.log("Real Data:", realData);

        // Parse request body as JSON
        try {
            requestProperties.body = JSON.parse(realData);
        } catch (err) {
            console.error("Error parsing request body:", err);
            requestProperties.body = {};
        }

        currentRequest(requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log("Response sent with status code:", statusCode);
        });
    });
};

module.exports=handleRequest