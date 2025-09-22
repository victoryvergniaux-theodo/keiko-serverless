import { tableArn, userTableArn } from '..';

export const nftTableDynamoDBReadPolicies = {
  Effect: 'Allow',
  Resource: [tableArn],
  Action: ['dynamodb:GetItem', 'dynamodb:Query'],
};

export const nftTableDynamoDBPutPolicies = {
  Effect: 'Allow',
  Resource: [tableArn],
  Action: ['dynamodb:PutItem', 'dynamodb:Query'],
};

export const nftTableDynamoDBDeletePolicies = {
  Effect: 'Allow',
  Resource: [userTableArn],
  Action: ['dynamodb:DeleteItem', 'dynamodb:Query'],
};

export const userTableDynamoDBReadPolicies = {
  Effect: 'Allow',
  Resource: [userTableArn],
  Action: ['dynamodb:GetItem', 'dynamodb:Query'],
};

export const userTableDynamoDBUpdatePolicies = {
  Effect: 'Allow',
  Resource: [userTableArn],
  Action: ['dynamodb:UpdateItem', 'dynamodb:Query'],
};
