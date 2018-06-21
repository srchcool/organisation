import uuid from "uuid";
import emailer from './emailer';
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import config from "./config";
import hash from './hash';


exports.addUser = function addUser ( event )
{

  //TODO: Fix confirm to not add a new record when no match
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
      account:{},      
      createdAt: Date.now()
    }
  };

  successData.customerStatus = 'Success';
  successData.customerData = params.Item;
  let successCb = function(){ return (successData); };
   
  
  const promiseCustomer = dynamoDbLib.call("put", params).then( successCb, null ).catch( null );

  
  //2. Insert into lookup table  
  const  provisionalInvite = hash.v1();
  const firstName = data.details.firstName;
  const lastName = data.details.lastName;

  params = {
    TableName: "organisationusers",
    Item: {
      //id: uuid.v1(),
      provisionalInvite: provisionalInvite,
      organisationId: data.organisationId,
      userId: userId, 
      userName: data.details.userName,  
      firstName: firstName,
      lastName: lastName,
      //sparse key confirmedAt instead of active: false,
      confirmedAt: 0,
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
    UpdateExpression: "SET confirmedAt = :confirmedAt",//"SET active = :active",
    ExpressionAttributeValues: {
      ":confirmedAt": Date.now()
    },
    ReturnValues: "ALL_NEW"

  };
  
  return dynamoDbLib.call("update", params);
  
}  

exports.removeUser = function removeUser ( event )
{

  //TODO: Should we also remove the record in customer
  const data = event.body;

  //Remove user
  const params = {

    TableName: "organisationusers",

    Key: {
      provisionalInvite: event.pathParameters.id,
      organisationId: data.organisationId
    }

  };
  
  return dynamoDbLib.call("delete", params);
  
} 
