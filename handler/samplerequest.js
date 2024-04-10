const handler={};
handler.sampleRequest=(req,res)=>{
    console.log("This is root route");

    res.end("This is root route");
}

module.exports=handler