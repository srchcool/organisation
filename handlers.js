import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export const userManagement = async (organisationId, error) => {

	/*********IMPORTANT*****************
	
	organisationId-index global secondary index created on table organisationusers

	A sparse key confirmedTS should also be created

	Alternatively, we could do a ScanFilter on the table but it is very inefficient

	***********************************/
	let body = {};

	const params = {

	    TableName: "organisationusers",
	    IndexName: "organisationId-index",
	    KeyConditionExpression: "organisationId = :organisationId",
	    ExpressionAttributeValues: {
	      ":organisationId": organisationId //"0fd1b5a8-6fc1-11e8-adc0-fa7ae01bbebc"
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