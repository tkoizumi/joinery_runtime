import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from './s3client';
import { rPush } from './redisClient';
import crypto from 'crypto';

const newId = () => {
  return crypto.randomBytes(16).toString('hex');
}

export const create = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'joinery',
    acl: 'public-read',
    key: function (request, file, cb) {
      const id_fileName = `${newId()}_${file.originalname}`;
      console.log(id_fileName);
      rPush('files', id_fileName);
      cb(null, id_fileName);
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