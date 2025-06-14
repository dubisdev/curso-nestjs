import { DiskStorageOptions } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const fileNamer: DiskStorageOptions['filename'] = (
  req: Express.Request,
  file,
  callback,
) => {
  if (!file) return callback(new Error('File is required'), '');

  const fileExtension = file.mimetype.split('/')[1];

  const fileName = `${uuidv4()}.${fileExtension}`;

  callback(null, fileName);
};
