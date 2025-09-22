import { nftTable } from '@libs/dynamodb-toolbox/nftTable';
import { QueryCommand } from 'dynamodb-toolbox';

export const main = async (): Promise<any> => {
  const params = { partition: 'Nft' };

  const query = await nftTable.build(QueryCommand).query(params).send();

  return query;
};
