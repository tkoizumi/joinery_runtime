import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from './s3client';

export const create = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'joinery',
    acl: 'public-read',
    key: function (request, file, cb) {
      cb(null, file.originalname);
    }
  })
}).array('file', 1);

export const save = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'joinery',
    acl: 'public-read',
    key: function (request, file, cb) {
      cb(null, file.originalname);
    }
  })
}).array('file', 1);

export const remove = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'joinery',
    acl: 'public-read',
    key: function (request, file, cb) {
      cb(null, file.originalname);
    }
  })
}).array('file', 1);