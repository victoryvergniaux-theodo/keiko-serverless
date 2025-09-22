import { getHandlerPath } from 'libs/configHelper/getHandlerPath';
import { userTableDynamoDBReadPolicies } from 'resources/policies';
import { userTableName } from 'resources/index';

export const getUser = {
  environment: { USER_TABLE_NAME: userTableName },
  iamRoleStatements: [userTableDynamoDBReadPolicies],
  handler: getHandlerPath(__dirname),
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/users/{name}',
      },
    },
  ],
};
