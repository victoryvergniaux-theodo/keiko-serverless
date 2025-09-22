import { userTable } from '@libs/dynamodb-toolbox/nftTable';
import { QueryCommand } from 'dynamodb-toolbox';

export const main = async (): Promise<any> => {
  const params = { partition: 'User' };

  const query = await userTable.build(QueryCommand).query(params).send();

  return query.Items;
};
