import express from 'express';
import dagora from './dagora';
import post from './system';
import interaction from './interaction';
import report from './amberReport';

const router = express.Router();
router.use('/dagora', dagora);
router.use('/post', post);
router.use('/interaction', interaction);
router.use('/report', report);

export default router;
