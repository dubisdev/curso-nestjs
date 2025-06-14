import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const fileFilter: MulterOptions['fileFilter'] = (
  req: Express.Request,
  file,
  callback,
) => {
  if (!file) return callback(new Error('File is required'), false);

  const fileExtension = file.mimetype.split('/')[1];

  const validExtensions = ['jpeg', 'jpg', 'png', 'gif', 'pdf'];
  if (validExtensions.includes(fileExtension)) {
    return callback(null, true);
  }

  callback(
    new Error(
      `Invalid file type. Allowed types: ${validExtensions.join(', ')}`,
    ),
    false,
  );
};
