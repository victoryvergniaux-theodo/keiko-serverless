import { userTable } from '@libs/dynamodb-toolbox/nftTable';
import { QueryCommand } from 'dynamodb-toolbox';

export const main = async (event: {
  pathParameters: { name: string };
}): Promise<any> => {
  const name = event.pathParameters.name;

  const params = { partition: 'User', name: name };

  const query = await userTable.build(QueryCommand).query(params).send();

  return query.Items;
};
