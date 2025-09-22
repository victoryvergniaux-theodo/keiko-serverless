import { Entity, string, number, item } from 'dynamodb-toolbox';
import { PARTITION_KEY, SORT_KEY } from 'resources/dynamoDB';
import { nftTable } from './nftTable';

export const NFTEntity = new Entity({
  name: 'NFT',
  table: nftTable,
  schema: item({
    [PARTITION_KEY]: string().key().default('Nft'),
    [SORT_KEY]: string().key(),
    id: string(),
    positionX: number(),
    positionY: number(),
    imageIndex: number(),
  }),
});
