import { crud } from '@welbot/sdk';

const { getBase, getBusinessLogicForTable } = crud.dynamoGet;
// eslint-disable-next-line import/prefer-default-export
export const main = getBase(getBusinessLogicForTable('organisation'));
