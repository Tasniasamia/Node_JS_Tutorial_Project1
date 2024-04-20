const http=require('http');
const handleRequest=require('./helpers/handlerequest');
const environment=require('./helpers/environment');
const lib=require('./lib/data')
const app={}
// lib.deleteFile("user","product", function callback(e){
// console.log(e)
// })
app.createServer=()=>{
 const server=http.createServer(handleRequest);
 server.listen(environment?.port,()=>{
    console.log(`The connection of Port is http://localhost:${environment.port}`)
})}

app.createServer();