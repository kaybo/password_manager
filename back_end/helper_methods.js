const { Console } = require("console");
const crypto = require("crypto");


const algorithm = "aes-192-cbc";

//WARNING: EITHER CHANGE THIS OR PUT THE KEY ELSEWHERE
const secret = 'default';

//This can be used to anything
const key = Buffer.from('xNRxA48aNYd33PXaODSutRNFyCu4cAe/InKT/Rx+bw0=', 'base64');
const iv = Buffer.from('aaaaaaaaaaaaaaaaaaaaaa==', 'base64');//do not change this

const encrypt = (text) => {
    
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encryptedData = cipher.update(text, 'utf8', 'base64') + cipher.final('base64');
    return encryptedData;
} 

const decrypt = (encrypted) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decripted = decipher.update(encrypted, 'base64', 'utf8') + decipher.final('utf8');
    return decripted;
  }


module.exports = {encrypt, decrypt}