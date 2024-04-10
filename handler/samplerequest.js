const handler={};
handler.sampleRequest=(requestproperties,callback)=>{
    
    callback(200,{message:"This is root route"})
}

module.exports=handler