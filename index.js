const http=require('http');
const handleRequest=require('./helpers/handlerequest')
const app={}
app.config={
    port:4000
}

app.createServer=()=>{
 const server=http.createServer(handleRequest);
 server.listen(app.config.port,()=>{
    console.log(`The connection of Port is http://localhost:${app.config.port}`)
})}

app.createServer();