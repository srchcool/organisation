import emailer from './emailer';
import { success, failure } from "./libs/response-lib";
import config from "./config";

export const main = async (event, context, callback) => 
{

  try 
  {

  	/***test data***/
  	const emailComponents = {

  		source: config.emailSource,
  		to: 'roumenkpetrov@gmail.com',
  		subject: 'Test AWS SES Call',
  		bodyText: 'Testing!!'

  	};

    await emailer.send( emailComponents, event, context );
    callback(null, success(emailComponents));
  } 
  catch (e) 
  {
    console.log(e);
    callback(null, failure({ status: false }));
  }   
};
