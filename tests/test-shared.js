export const apiGatewayEventForTest = () => ({
  path: '/organisation',
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

export function basicorganisationBody() {

    const organisation = {
      type: "corp",
      companyName: "Test Inc",
      address:
        {
          companyAddressLineOne: "123 Test St",
          companyAddressLineTwo: "Suite 2A",
          companyAddressLineThree: "Bldg 5",
          city: "Test City",
          postcode: "EH2 5AD",
          state: "GA",
          zipcode: "30033"
        },
      billingAddress:
        {
          companyAddressLineOne: "123 Test St Billing",
          //companyAddressLineTwo: "",
          //companyAddressLineThree: "",
          city: "Test City Billing",
          postcode: "EH2 5AD",
          state: "GA",
          zipcode: "30033"
        },
       companyTelephone: "4043209989",
       companyContact: "John Doe",
       companySize: "123",
       vatnumber: "12314434567",
       companyNumber: "878797898794",
       employees:
       {
        customerId: ["31a9923b-9ee1-4e9e-a3d4-8f800fabce54","31a9923b-9ee1-4e9e-a3d4-8f800fabce54"]
       }
};

  return organisation;
}
