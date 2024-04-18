const url=require('url');
const {StringDecoder} =require('string_decoder');
const decoder=new StringDecoder('utf-8');
const route=require('../router');
const {notFoundRequest}=require('../handler/notfoundrequest');
const handleRequest=(req,res)=>{
    const path=url.parse(req.url, true);
    const pathName=path.pathname
    const trimePath=pathName.replace(/^\/+|\/+$/g, '');
    const method=req.method.toLowerCase();
    const headers=req.headers;
    console.log(trimePath);
    const requestproperties= {
        path,
        pathName,
        trimePath,
        method,
        headers
    }
    let currentRequest = route[trimePath] ? route[trimePath] : notFoundRequest;
    // currentRequest(req,res)
    currentRequest(requestproperties, (statuscode,payload)=>{
    let status= typeof statuscode === "number" ? statuscode : 500;
    let payloaddata= typeof payload === "object"? payload : {}
    res.writeHead(status);
    res.write(JSON.stringify(payloaddata));
     
    })
//   console.log(typeof currentRequest);
   
    
    req.on('data',(buffer)=>{
        console.log(decoder.write(buffer))
    })

    req.on('end',()=>{
    decoder.end();
    res.end();

 })
   
    
     }

module.exports=handleRequest