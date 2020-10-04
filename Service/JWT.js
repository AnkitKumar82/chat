const jwtSecret = 'QPMXLWRSKVTNAXJPWNHDLTBLYBBVOVSYNRJWYRJCZAFONJDONJWEEXACHYOE';
const jwt = require("jsonwebtoken");
const { decode } = require("jsonwebtoken");
const con = require("../mysql");

const getToken = async function(data){
    var token = await jwt.sign({ "user_id": data }, jwtSecret);
    return token;
}
const jwtVerify =async function(token,socket){
    try{
        var decoded = await jwt.verify(token, jwtSecret);
        return parseInt(decoded.user_id);
    }catch(err) {
        if(token !== ""){
            socket.emit("error_user_id",{error:"error_user_id"});
        }
        return -1;
    }
}
module.exports = {
    getToken,
    jwtVerify
}
