import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUseController';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { SearchUserExistController } from '@modules/users/useCases/searchUserExist/SearchUserExistController';
import { UpdateUserAvatarController } from '@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const searchUserExistController = new SearchUserExistController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post('/', createUserController.handle);
usersRouter.get('/:document', searchUserExistController.handle);
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);
usersRouter.post('/auth', authenticateUserController.handle);

export { usersRouter };
