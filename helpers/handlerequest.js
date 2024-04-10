const url=require('url');
const {StringDecoder} =require('string_decoder');
const decoder=new StringDecoder('utf-8');
const route=require('../router');
const {notFoundRequest}=require('../handler/notfoundrequest')
const handleRequest=(req,res)=>{
    const path=url.parse(req.url, true);
    const pathName=path.pathname
    const trimePath=pathName.replace(/^\/+|\/+$/g, '');
    const method=req.method.toLowerCase();
    const headers=req.headers;
    console.log(trimePath);
    
    const currentRequest = route[trimePath] ? route[trimePath] : notFoundRequest;
    currentRequest(req,res)
    // currentRequest=(requestproperties,(statuscode,payload)=>{
    // const status= statuscode === 200 ? statuscode : 500;
    // const data=payload?payload:{}
    // res.writeHead(status);
    // res.end(data);
     
    // })
  console.log(typeof currentRequest);
   
    
    req.on('data',(buffer)=>{
        console.log(decoder.write(buffer))
    })

    req.on('end',()=>{
    decoder.end();

 })
   
    
     }

module.exports=handleRequest