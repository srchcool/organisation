import { utilities } from '@welbot/sdk';
import * as create from '../../create';
import * as get from '../../get';
import * as list from '../../list';
import * as update from '../../update';

import { apiGatewayEventForTest, contextForTest, basicorganisationBody } from '../test-shared';

const { isoStringRegex } = utilities;

let organisationId;
const organisationBody = basicorganisationBody();
const updatedorganisationBody = basicorganisationBody(true);
updatedorganisationBody.adminTitle = 'updated_test_organisation';
updatedorganisationBody.description = 'updated organisation is updated';


test('create organisation', async (done) => {
  console.log('create.');

  const event = apiGatewayEventForTest();
  event.httpMethod = 'POST';
  event.body = JSON.stringify(organisationBody);

  const context = contextForTest();
  context.logGroupName = '/aws/lambda/organisation-prod-create';
  context.functionName = 'organisation-prod-create';

  const callback = (error, response) => {
    console.log(response);
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    const responseBody = JSON.parse(response.body);
    expect(typeof responseBody.id).toBe('string');
    expect(typeof responseBody.createdAt).toBe('string');
    organisationId = responseBody.id;
    Object.keys(organisationBody).forEach((key) => {
      console.log(`key is checking: ${key}`);
      expect(responseBody[key]).toBeTruthy();
      expect(responseBody[key]).toEqual(organisationBody[key]);
    });
    done();
  };
  await create.main(event, context, callback);
});

test('get created organisation', async (done) => {
  console.log('get.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: organisationId };
  event.httpMethod = 'GET';
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/organisation-prod-get';
  context.functionName = 'organisation-prod-get';

  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    const responseBody = JSON.parse(response.body);
    expect(JSON.parse(response.body).id).toBe(organisationId);
    console.log('organisationId checked.');
    Object.keys(organisationBody).forEach((key) => {
      console.log(`key is checking: ${key}`);
      expect(responseBody[key]).toBeTruthy();
      console.log(` equal checking: ${key}, value: ${organisationBody[key]}`);
      expect(responseBody[key]).toEqual(organisationBody[key]);
    });
    done();
  };

  await get.main(event, context, callback);
});

test('list succeeds', async (done) => {
  console.log('list.');
  const event = apiGatewayEventForTest();
  event.httpMethod = 'GET';

  const context = contextForTest();
  context.logGroupName = '/aws/lambda/nudge-group-service-prod-list';
  context.functionName = 'nudge-group-service-prod-list';

  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');


    done();
  };

  await list.main(event, context, callback);
});

test('update organisation content', async (done) => {
  console.log('update.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: organisationId };
  event.httpMethod = 'PUT';
  event.body = JSON.stringify(updatedorganisationBody);

  event.pathParameters = { id: organisationId };
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/organisation-prod-update';
  context.functionName = 'organisation-prod-update';

  const callback = (error, response) => {
    console.log(response);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBe('{"status":true}');
    done();
  };

  await update.main(event, context, callback);
});

test('get updated organisation', async (done) => {
  console.log('get.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: organisationId };
  event.httpMethod = 'GET';
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/organisation-prod-get';
  context.functionName = 'organisation-prod-get';
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    const responseBody = JSON.parse(response.body);
    expect(JSON.parse(response.body).id).toBe(organisationId);
    Object.keys(updatedorganisationBody).forEach((key) => {
      console.log(`key is checking: ${key}`);
      expect(responseBody[key]).toBeTruthy();
      console.log(` equal checking: ${key}, value: ${organisationBody[key]}`);
      expect(responseBody[key]).toEqual(updatedorganisationBody[key]);
    });
    done();
  };

  await get.main(event, context, callback);
});


test('get fails on deleted organisation', async (done) => {
  console.log('get.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: organisationId };
  event.httpMethod = 'GET';
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/organisation-prod-get';
  context.functionName = 'organisation-prod-get';

  const callback = (error, response) => {
    expect(response.statusCode).toEqual(500);
    expect(response.body).toBe('{"type":"Error","message":"Item not found."}');
    done();
  };

  await get.main(event, context, callback);
});
