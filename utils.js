import uuid from "uuid";
import emailer from './emailer';
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import config from "./config";
import hash from './hash';


exports.addUser = function addUser ( event )
{

  //v0.994 (Implemented vandium validation & created a promise chain util module )
  //TODO Fix promise chain error handling
  //TODO: BUG!!! It goes to junk mail folder on GMAIL. Fix headers, etc

  const data = event.body;
  let successData = {};
 
  //1. Insert into customers
  const userId = uuid.v1();
  
  let params = {
    TableName: "customer",
    Item: {
      id: uuid.v1(),
      userId: userId,
      organisationId: data.organisationId,
      details: data.details,
      createdAt: Date.now()
    }
  };

  successData.customerStatus = 'Success';
  successData.customerData = params.Item;
  let successCb = function(){ return (successData); };
   
  
  const promiseCustomer = dynamoDbLib.call("put", params).then( successCb, null ).catch( null );

  
  //2. Insert into lookup table  
  const  provisionalInvite = hash.v1();

  params = {
    TableName: "organisationusers",
    Item: {
      //id: uuid.v1(),
      provisionalInvite: provisionalInvite,
      organisationId: data.organisationId,
      userId: userId,      
      active: false,
      createdAt: Date.now()
    }
  };

  successData.organisationusersStatus = 'Success';
  successData.organisationusersData = params.Item;  
  successCb = function(){ return (successData); };

  const promiseOrganisationUsers = dynamoDbLib.call("put", params).then( successCb, null ).catch( null );


  //3. Send email

  const emailComponents = {

      source: config.emailSource,
      to: data.details.email,
      subject: config.addUserEmailSubject,
      bodyText: config.addUserEmailBody(data.organisationId, provisionalInvite)

    };  


  successData.emailStatus = 'Success';
  successData.emailData = emailComponents;
  successCb = function(){ return (successData); };

  const promiseEmail = emailer.send( emailComponents ).then( successCb, null ).catch( null ); 

    
  return ( 
             promiseCustomer
              .then( promiseOrganisationUsers )
                .then( promiseEmail ) 
                  .catch( null )
          );
  
}

/*exports.confirmUserGetItem = async function confirmUserGetItem ( event )
{ 

    const params = {
      TableName: "organisationusers",

      Key: {
        organisationId: data.organisationId,
        provisionalInvite: data.provisionalInvite
      }
    };

    try {
      const result = await dynamoDbLib.call("get", params);
      if (result.Item) 
      {
        
        callback(null, success(result.Item));
      } 
      else 
      {
        callback(null, failure({ status: false, error: "Item not found." }));
      }
    } catch (e) 
    {
      callback(null, failure({ status: false }));
    }

}*/

 

exports.confirmUser = function confirmUser ( event )
{

  const data = event.body;
      
  //Update active for orgId/provisionalInvite pair (if it exists)
  const params = {

    TableName: "organisationusers",

    Key: {
      provisionalInvite: data.provisionalInvite,
      organisationId: data.organisationId      
    },
    UpdateExpression: "SET active = :active",
    ExpressionAttributeValues: {
      ":active": data.active
    },
    ReturnValues: "ALL_NEW"

  };
  
  return dynamoDbLib.call("update", params);
  
}  
