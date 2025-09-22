import { UserEntity } from '@libs/dynamodb-toolbox/userEntity';
import { $add, UpdateItemCommand } from 'dynamodb-toolbox';
import type { UpdateItemInput } from 'dynamodb-toolbox';
import { SORT_KEY } from 'resources/dynamoDB';

export const main = async (event: {
  pathParameters: { id: string };
  body: string;
}): Promise<any> => {
  const id = event.pathParameters.id;
  const score = JSON.parse(event.body).score;
  const item: UpdateItemInput<typeof UserEntity> = {
    [SORT_KEY]: id,
    score: $add(score),
  };

  await UserEntity.build(UpdateItemCommand).item(item).send();

  return;
};
