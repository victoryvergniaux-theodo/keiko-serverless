import { getHandlerPath } from 'libs/configHelper/getHandlerPath';
import { nftTableDynamoDBDeletePolicies } from 'resources/policies';
import { tableName } from 'resources/index';

export const deleteNft = {
  environment: { NFT_TABLE_NAME: tableName },
  iamRoleStatements: [nftTableDynamoDBDeletePolicies],
  handler: getHandlerPath(__dirname),
  events: [
    {
      httpApi: {
        method: 'delete',
        path: '/nfts/{id}',
      },
    },
  ],
};
