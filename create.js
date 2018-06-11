import { crud, models } from '@welbot/sdk';

//TODO: include this into '@welbot/sdk' as part of models
import organisation from './organisation';
models.organisation = organisation;
//END TODO

const { createBase, transferCallDataToDynamoRequestParameters } = crud.dynamoCreate;

const organisationDefinition = models.organisation;

const organisationCreateParams = (baseParams, data, id) => {
  
  const params = transferCallDataToDynamoRequestParameters(baseParams, data, organisationDefinition);
  params.TableName = 'organisation';
  params.Item.id = id;

  console.log(params);
  return params;
};

// eslint-disable-next-line import/prefer-default-export
export const main = createBase(organisationCreateParams, organisationDefinition.validationSchema);