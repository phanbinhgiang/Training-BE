import express from 'express';
import Report from '../../worker/amberReport/report';

const router = express.Router();

router.post('/', Report.getReport);

export default router;
