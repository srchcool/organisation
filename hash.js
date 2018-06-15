import crypto from "crypto";
import uuid from "uuid";
import config from "./config";

module.exports  = hash();

function hash(){


	function getHashV1()
	{

		/*
		2-sided hashing (testing only)
		const cipher = crypto.createCipher('aes-128-cbc', config.salt);
		let hash = cipher.update('abc', 'utf8', 'hex')
		hash += cipher.final('hex');
		return hash;
		*/
		const nixTs = Math.round((new Date()).getTime() / 1000);
		const buffer = uuid.v1()+config.salt+nixTs;

		return crypto.createHash('sha256').update(buffer).digest('base64'); //use digest('hex') for a hex hash

		
	}

	return(
	{
	  v1: ()=>{return getHashV1();},
	});	

}