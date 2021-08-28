import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateNoteController } from '@modules/notes/useCases/createNote/CreateNoteController';
import { DeleteNoteController } from '@modules/notes/useCases/deleteNote/DeleteNoteController';
import { ListNotesByUserController } from '@modules/notes/useCases/listNotesByUser/ListNotesByUserController';
import { UpdateNoteController } from '@modules/notes/useCases/updateNote/UpdateNoteController';

const notesRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createNoteController = new CreateNoteController();
const listNotesByUserController = new ListNotesByUserController();
const updateNoteController = new UpdateNoteController();
const deleteNoteController = new DeleteNoteController();

notesRoutes.post('/', uploadAvatar.single('file'), createNoteController.handle);
notesRoutes.get('/:user_id', listNotesByUserController.handle);
notesRoutes.put(
  '/:id',
  uploadAvatar.single('file'),
  updateNoteController.handle
);
notesRoutes.delete('/delete/:id', deleteNoteController.handle);

export { notesRoutes };
