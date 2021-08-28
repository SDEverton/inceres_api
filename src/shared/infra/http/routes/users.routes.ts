import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';
import { UpdateUserAvatarController } from '@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post('/', createUserController.handle);
usersRouter.get('/list', listUsersController.handle);
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export { usersRouter };
