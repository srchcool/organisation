import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export const userManagement = async (organisationId, error) => {

	/*********IMPORTANT*****************
	
	organisationId-confirmedAt-index global secondary index created on table organisationusers

	A sparse key (sort key for the above index) confirmedAt should also be created

	Alternatively, we could do a ScanFilter on the table but it is very inefficient

	***********************************/
	let body = {};

	const params = {

	    TableName: "organisationusers",
	    IndexName: "organisationId-confirmedAt-index",
	    KeyConditionExpression: "organisationId = :organisationId AND confirmedAt > :confirmedAt",
	    ExpressionAttributeValues: {
	      ":organisationId": organisationId,//"0fd1b5a8-6fc1-11e8-adc0-fa7ae01bbebc"
	      ":confirmedAt": 0
	    },
	    ProjectionExpression: "userId,firstName,lastName"
	  };

	try {

		const result = await dynamoDbLib.call("query", params);		

		/********DATA SPECS*********
		body : {
		 users: [array of userObj]
		}

		userObj = {
		 userId: guid,
		 firstName: string,
		 lastName: string
		}
		****************************/

		body.users = result.Items;
	    

	} catch (e) {

		error = e;

		//console.log( e );
	}

	//console.dir( body );

	return body;

};


export const organisationStats = async (organisationId, error) => {
	
	
	let body = {};

	const params = {

	    TableName: "organisationdigest",
	    KeyConditionExpression: "organisationId = :organisationId",
	    ExpressionAttributeValues: {
	      ":organisationId": organisationId//organisationId,//"aae3c790-746a-11e8-a6a8-a9e1780e659d"
	     
	    },
	    //ProjectionExpression: ""
	  };

	try {

		const result = await dynamoDbLib.call("query", params);		

		body = result.Items;
	    

	} catch (e) {

		error = e;

		//console.log( e );
	}

	//console.dir( body );

	return body;

};