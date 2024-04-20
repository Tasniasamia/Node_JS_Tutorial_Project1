const handler=require('./handler/samplerequest');
const userHandler=require('./handler/userRequst');
const {sampleRequest}=handler;
const {useHandleRequest}=userHandler

const route={
    sample:sampleRequest,
    user:useHandleRequest
}


module.exports=route