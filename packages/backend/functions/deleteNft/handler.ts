import { NFTEntity } from '@libs/dynamodb-toolbox/nftEntity';
import { DeleteItemCommand } from 'dynamodb-toolbox';
import { PARTITION_KEY, SORT_KEY } from 'resources/dynamoDB';

export const main = async (event: {
  pathParameters: { id: string };
}): Promise<string> => {
  const id = event.pathParameters.id;
  if (!id) throw new Error('Missing id');
  const resp = await NFTEntity.build(DeleteItemCommand)
    .key({ [PARTITION_KEY]: 'Nft', [SORT_KEY]: id })
    .send();
  console.log(resp);
  return 'OK';
};
