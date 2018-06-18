import uuid from "uuid";
import emailer from './emailer';
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import config from "./config";
import hash from './hash';

export const main = async (event, context, callback)=> {

  //v0.99 (fixed error handling)
  //TODO: fix createdAt format in DB?
  //TODO: BUG!!! It goes to junk mail folder on GMAIL. Fix headers, etc

  const data = JSON.parse(event.body);
  let successBody = {};

  //console.log( data );return;

  //1. Validate data

  //2. Insert into customers
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
  
  try {
    await dynamoDbLib.call("put", params);
    //callback(null, success(params.Item));
    successBody.customerStatus = 'Success';
    successBody.customerData = params.Item;
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false , error: e }));
    return;
  }
  
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

  try {
    await dynamoDbLib.call("put", params);
    //callback(null, success(params.Item));
    successBody.organisationusersStatus = 'Success';
    successBody.organisationusersData = params.Item;
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false , error: e }));
    return;
  }


  //5. Send email

  const emailComponents = {

      source: config.emailSource,
      to: data.details.email,
      subject: config.addUserEmailSubject,
      bodyText: config.addUserEmailBody(userId, provisionalInvite)

    };  


  try 
  {
      
    await emailer.send( emailComponents, event, context );

    successBody.emailStatus = 'Success';
    successBody.emailData = emailComponents;

    callback(null, success(successBody));

  } 
  catch (e) 
  {
    console.log(e);
    callback(null, failure({ status: false, error: e }));
  }   

}