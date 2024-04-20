// hashPassword
const {hashPassword}=require('../helpers/utilities');
const {parseJSON}=require('../helpers/utilities');
const file=require('../lib/data');
const userHandler={};
userHandler.useHandleRequest=(requestproperties,callback)=>{

let method=['get','post','put','delete'];
if(method.includes(requestproperties.method)){
    userHandler.userRequest[requestproperties.method](requestproperties,callback)
}
else{
    callback(404,{message:"Invalid method"})
}
}
userHandler.userRequest={};
userHandler.userRequest.post=(requestproperties,callback)=>{
    const firstname=typeof  requestproperties.body.firstname === 'string' && requestproperties.body.firstname.trim()  && requestproperties.body.firstname.length > 0 ? requestproperties.body.firstname : false;
    const lastname=typeof  requestproperties.body.lastname === 'string' && requestproperties.body.lastname.trim()  && requestproperties.body.lastname.length > 0 ? requestproperties.body.lastname : false;
    const email=typeof  requestproperties.body.email === 'string' && requestproperties.body.email.trim()  && requestproperties.body.email.length > 0 ? requestproperties.body.email : false;
    const phone=typeof  requestproperties.body.phone === 'string' && requestproperties.body.phone.trim()  && requestproperties.body.phone.length > 0 ? requestproperties.body.phone : false;
    const password=typeof  requestproperties.body.password === 'string' && requestproperties.body.password.trim()  && requestproperties.body.password.length > 0 ? requestproperties.body.password : false;
    if(firstname && lastname && email && phone && password){
        const userData={
            firstname,
            lastname,
            email,
            phone,
            password:hashPassword(password)
        }
        file.readFile('user',phone, (err,payload)=>{
            if(err){
               file.createFile('user',phone, userData, (err2)=>{
                console.log(err2);
                if(err2){
                 callback(202,{message:"user is created successfully"});
                }
                else{
                callback(406,{message: "user not created"});
                }
               })
            }
            else{
                callback(405)
            }
        })
    


    }
    else{
        callback('Invalid Data');
    }

    }
userHandler.userRequest.get=(requestproperties,callback)=>{
const phone=typeof requestproperties?.queryString?.phone === "string" && requestproperties?.queryString?.phone.trim() &&requestproperties?.queryString?.phone.length>0 ? requestproperties?.queryString?.phone : false;
console.log("phone",phone);

if(phone){
file.readFile('user',phone, (err,payload)=>{
    console.log(payload,err);
    
    if(!err && payload){
    const userData2={...parseJSON(payload)}
    delete userData2?.password
    callback(204,userData2);
    }
    else{
     callback(408,{message:"NO Data"})
    }
})
}
else{
    callback(407)

}
}
 module.exports=userHandler;


