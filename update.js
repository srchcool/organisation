import { crud, models } from '@welbot/sdk';

//TODO: include this into '@welbot/sdk' as part of models
var organisation = require('./organisation');
models.organisation = organisation;
//END TODO

const { updateBase, getUpdateExpressionWithAttributeValues } = crud.dynamoUpdate;
const organisationDefinition = models.organisation;

const organisationUpdateParams = (baseParams, data, id) => {
  const params = JSON.parse(JSON.stringify(baseParams));
  params.TableName = 'organisation';
  params.Key = { id };

  const updateExpressionWithAttributeValues = getUpdateExpressionWithAttributeValues(
    params.UpdateExpression,
    data,
    organisationDefinition,
  );
  console.log(updateExpressionWithAttributeValues.updateExpression);

  params.UpdateExpression = updateExpressionWithAttributeValues.updateExpression;
  Object.assign(
    params.ExpressionAttributeValues,
    updateExpressionWithAttributeValues.newExpressionAttributeValues,
  );

  return params;
};

// eslint-disable-next-line import/prefer-default-export
export const main = updateBase(organisationUpdateParams, organisationDefinition.validationSchema);
