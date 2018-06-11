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
            "type": "corp",
            "company-name": "Test Inc",
            "address":
              {
                "company-address-line-one": "123 Test St",
                "company-address-line-two": "Suite 2A",
                "company-address-line-three": "Bldg 5",
                "city": "Test City",
                "postcode": "EH2 5AD",
                "state": "GA",
                "zipcode": "30033"
              },
            "billing-address":
              {
                "company-address-line-one": "123 Test St Attn: Billing",
                "company-address-line-two": "Suite 2A",
                "company-address-line-three": "Bldg 5",
                "city": "Test Billing City",
                "postcode": "EH2 5AD",
                "state": "GA",
                "zipcode": "30033"
              },
             "company-telephone": "404 320 9989",
             "company-contact": "John Doe",
             "company-size": "10000",
             "vatnumber": "123456789",
             "company-number": "987654321",
             "employees":
             {
              "organisation-id": ["31a9923b-9ee1-4e9e-a3d4-8f800fabce54","31a9923b-9ee1-4e9e-a3d4-8f800fabce54"]
             }
  };

  return organisation;
}
