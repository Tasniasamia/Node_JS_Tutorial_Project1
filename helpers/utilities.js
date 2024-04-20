const utilities = {};
var crypto = require("crypto");

utilities.parseJSON = (strdata) => {
    let output;
    try {
        output = JSON.parse(strdata);
    } catch (error) {
        output = {};
    }
    return output;
};

utilities.hashPassword = (password) => {
    var hasheddata = crypto.createHash("sha512").update(password).digest("base64");
    return hasheddata;
};

module.exports = utilities;
