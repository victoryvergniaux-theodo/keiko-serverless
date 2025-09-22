import { createNft } from './createNft/config';
import { deleteNft } from './deleteNft/config';
import { getNft } from './getNft/config';
import { getUser } from './getUser/config';
import { getUsers } from './getUsers/config';
import { logMessage } from './logMessage/config';
import { setUserScore } from './setUserScore/config';

export const functions = {
  getNft,
  createNft,
  deleteNft,
  getUser,
  getUsers,
  setUserScore,
  logMessage,
};
