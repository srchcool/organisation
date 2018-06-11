export const apiGatewayEventForTest = () => ({
  path: '/customer',
  resource: '/{proxy+}',
  queryStringParameters: {},

  requestContext: {
    apiId: 'id',
  },
  resourcePath: '/{proxy+}',
  apiId: 'xxxxxxxxxx',
});

export const contextForTest = () => ({
  awsRequestId: 'id',
  invokeid: 'id',
  logStreamName: '2015/09/22/[HEAD]13370a84ca4ed8b77c427af260',
  functionVersion: 'HEAD',
  isDefaultFunctionVersion: true,
  memoryLimitInMB: '1024',
  getRemainingTimeInMillis: () => 5997,
});

export function basiccustomerBody() {

  const customer = {

          /*id:"31a9923b-9ee1-4e9e-a3d4-8f800fabce54",*/
          details:{
                salutation:"Mr",
                "first-name":"Sam",
                "last-name":"Deere",
                email:"sam@welbot.io"
                 },
          "user-id":"31a9923b-9ee1-4e9e-a3d4-8f800fabce54",
          "organisation-id":"31a9923b-9ee1-4e9e-a3d4-8f800fabce54",
          account:{
                "account-number":"STU0001",
                "account-type":"D2C/B2B/Affiliate",
                "account-start":"2018-03-21",
                "price-per-seat":"5.50",
                "monthly-payment":"",
                "yearly-payment":"2000.00",
                "discount":{
                      "discount-type":"yearly",
                      "discount-percentage":"10"
                      },              
                 "affiliate-code":"",
                 "licences":"20",
                 "subscription-period":"24 months",
                 "customer-type":"Paid Beta",
                 "cancellation":"True",
                 "refund":"",
                 "refund-amount":"",
                 payment:{
                        "id":"",
                        "gateway-id":"",
                        "object":"card/bank transfer/cheque"
                        },                      
                 affiliate:{
                        "affiliate-type":"",
                        "affiliate-id":"",
                        "discount":{
                              "affiliate-code":"",
                              "discount-id":"",
                              "discount-percentage":"10"
                                 }
                        }

                  
                
                } //END "account"


        };


  return customer;
}
