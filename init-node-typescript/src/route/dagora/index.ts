import express from 'express';
import Card from './card';

const router = express.Router();

router.use('/card', Card);

export default router;
