import express from 'express';
import interaction from './interaction';

const router = express.Router();

router.use('/view', interaction);

export default router;
