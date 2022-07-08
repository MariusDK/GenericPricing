import express, { Express, Request, Response } from 'express';
import multer from 'multer';
import CourseController from '../controllers/course';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router({});

router.get('/getPrice', CourseController.getPrice);

router.post('/upload', upload.single('pricingFile'),  CourseController.upload);

router.delete('/remove', CourseController.remove);

router.post('/override', CourseController.enableMigration);

router.get('/get', CourseController.getEnableMigration);

export default router;

