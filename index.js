const http=require('http');
const url=require('url');
const {StringDecoder} =require('string_decoder');
const decoder=new StringDecoder('utf-8')

const app={}
app.config={
    port:4000
}

app.createServer=()=>{
 const server=http.createServer(app.handleRequest);
 server.listen(app.config.port,()=>{
    console.log(`The connection of Port is http://localhost:${app.config.port}`)
})}
app.handleRequest=(req,res)=>{
    const path=url.parse(req.url, true);
    const pathName=path.pathname
    const trimePath=pathName.replace(/^\/+|\/+$/g, '');
    const method=req.method.toLowerCase();
    const headers=req.headers;

    req.on('data',(buffer)=>{
        console.log(decoder.write(buffer))
    })

 req.on('end',()=>{
    decoder.end();

 })
    console.log("trimepath",trimePath);
    console.log("Some of data here",req.body);
    console.log(url.parse(req.url));
    res.write(`${trimePath}`);
    res.write("THis is route");
    res.write("This is page");
    res.write("THis is my page");
    res.end();
    
     }
app.createServer();