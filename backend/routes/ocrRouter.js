import express from 'express'
import ocrController from "../controller/ocrController.js";
import upload from '../config/multer.js';
const router = express.Router()

router.post('/extract',upload.array('aadhaarImages', 2), ocrController.extractDetails)

export default router
