import { getHandlerPath } from 'libs/configHelper/getHandlerPath';
import { userTableDynamoDBUpdatePolicies } from 'resources/policies';
import { userTableName } from 'resources/index';

export const setUserScore = {
  environment: { NFT_TABLE_NAME: userTableName },
  iamRoleStatements: [userTableDynamoDBUpdatePolicies],
  handler: getHandlerPath(__dirname),
  events: [
    {
      httpApi: {
        method: 'put',
        path: '/users/{id}',
      },
    },
  ],
};
