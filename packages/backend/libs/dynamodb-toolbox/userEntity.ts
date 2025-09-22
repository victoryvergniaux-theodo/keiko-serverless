import { Entity, string, number, item } from 'dynamodb-toolbox';
import { PARTITION_KEY, SORT_KEY } from 'resources/dynamoDB';
import { nftTable } from './nftTable';

export const UserEntity = new Entity({
  name: 'User',
  table: nftTable,
  schema: item({
    [PARTITION_KEY]: string().key().default('User'),
    [SORT_KEY]: string().key(),
    id: string(),
    name: string(),
    score: number(),
    mail: string(),
  }),
});
