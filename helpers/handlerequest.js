const url=require('url');
const {StringDecoder} =require('string_decoder');
const decoder=new StringDecoder('utf-8');
const route=require('../router');
const {parseJSON}=require('../helpers/utilities');
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
    console.log(trimePath);
    let currentRequest = route[trimePath] ? route[trimePath] : notFoundRequest;
    let realData="";
    req.on('data',(buffer)=>{
        realData+=decoder.write(buffer);
        
    })
    req.on('end',()=>{
    realData+=decoder.end();
    console.log("Real Data",realData);
    requestproperties.body=parseJSON(realData);
    currentRequest(requestproperties, callback = (statuscode,payload)=>{
        console.log(statuscode),
        console.log(payload);
        let status= typeof statuscode === "number" ? statuscode : 500;
        let payloaddata= typeof payload === "object"? payload : {}
        res.setHeader('Content-Type','application/json');
        res.writeHead(status);
        res.write(JSON.stringify(payloaddata));
        res.end();
        })

 })
   
    
     }

module.exports=handleRequest