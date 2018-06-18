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
  
  var params = {
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

  
  //3. Insert into lookup table  
  const  provisionalInvite = hash.v1();

  params = {
    TableName: "organisationusers",
    Item: {
      id: uuid.v1(),
      organisationId: data.organisationId,
      userId: userId,
      provisionalInvite: provisionalInvite,
      active: false,
      createdAt: Date.now()
    }
  };

  successData.organisationusersStatus = 'Success';
  successData.organisationusersData = params.Item;  
  successCb = function(){ return (successData); };

  const promiseOrganisationUsers = dynamoDbLib.call("put", params).then( successCb, null ).catch( null );


  //4. Send email

  const emailComponents = {

      source: config.emailSource,
      to: data.details.email,
      subject: config.addUserEmailSubject,
      bodyText: config.addUserEmailBody(data.organisationId, provisionalInvite)

    };  


  successData.emailStatus = 'Success';
  successData.emailData = emailComponents;
  successCb = function(){ return (successData); };

  var promiseEmail = emailer.send( emailComponents ).then( successCb, null ).catch( null ); 

    
  return ( 
             promiseCustomer
              .then( promiseOrganisationUsers )
                .then( promiseEmail ) 
                  .catch( null )
          );
  
}   
