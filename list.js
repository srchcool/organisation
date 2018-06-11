import { crud } from '@welbot/sdk';

const { listBase } = crud.dynamoList;
// eslint-disable-next-line import/prefer-default-export
export const main = listBase(() => ({ TableName: 'organisation' }));
