import { NFTEntity } from '@libs/dynamodb-toolbox/nftEntity';
import { PutItemCommand, PutItemInput } from 'dynamodb-toolbox';
import { SORT_KEY } from 'resources/dynamoDB';

const crypto = require('crypto');

/**export const main = async (): Promise<any> => {
  const params = {
    TableName: process.env.NFT_TABLE_NAME,
    ExpressionAttributeValues: {
      
    }
  };
};*/

export const main = async (event: any): Promise<any> => {
  const randomIntFromInterval = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const id = crypto.randomUUID();
  const positionX = randomIntFromInterval(5, 90);
  const positionY = randomIntFromInterval(10, 90);
  const imageIndex = Math.floor(Math.random() * 5);

  const NFT: PutItemInput<typeof NFTEntity> = {
    [SORT_KEY]: id,
    id: id,
    positionX: positionX,
    positionY: positionY,
    imageIndex: imageIndex,
  };

  const resp = await NFTEntity.build(PutItemCommand).item(NFT).send();
  console.log(resp);
  return 'OK';
};
