
const notFoundRequest=(requestproperties,callback)=>{
    callback(400,{message:"Not found any request"});
}

module.exports={notFoundRequest}