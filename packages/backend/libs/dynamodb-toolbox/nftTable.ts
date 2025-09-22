import { Table } from 'dynamodb-toolbox';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { PARTITION_KEY, SORT_KEY } from 'resources/dynamoDB';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const ddb = new DynamoDBClient({});

const documentClient = DynamoDBDocumentClient.from(ddb, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export const nftTable = new Table({
  name: process.env.NFT_TABLE_NAME || 'BLA BLA BLA',
  partitionKey: { name: PARTITION_KEY, type: 'string' },
  sortKey: { name: SORT_KEY, type: 'string' },
  documentClient,
});

export const userTable = new Table({
  name: process.env.USER_TABLE_NAME || 'USERS',
  partitionKey: { name: PARTITION_KEY, type: 'string' },
  sortKey: { name: SORT_KEY, type: 'string' },
  documentClient,
});
