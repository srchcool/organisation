import { crud, models } from '@welbot/sdk';
import hash from './hash'

//TODO: include this into '@welbot/sdk' as part of models
import organisationUsers from './organisationusers';
models.organisationUsers = organisationUsers;
//END TODO

const { createBase, transferCallDataToDynamoRequestParameters } = crud.dynamoCreate;

const organisationUsersDefinition = models.organisationUsers;

const organisationUsersCreateParams = (baseParams, data, id) => {
  
  const params = transferCallDataToDynamoRequestParameters(baseParams, data, organisationUsersDefinition);
  params.TableName = 'organisationusers';
  params.Item.id = id;  
  //TODO: How do we want to generate this (uuid for now)?
  params.Item.provisionalInvite = hash.v1();
  params.Item.active = false;

  console.log(params);
  return params;
};

// eslint-disable-next-line import/prefer-default-export
export const main = createBase(organisationUsersCreateParams, organisationUsersDefinition.validationSchema);
//TODO: Send email to user on success (handler)!