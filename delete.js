import { crud } from '@welbot/sdk';

const { deleteBase } = crud.dynamoDelete;
// eslint-disable-next-line import/prefer-default-export
export const main = deleteBase(id => ({
  TableName: 'organisation',
  Key: { id },
}));
