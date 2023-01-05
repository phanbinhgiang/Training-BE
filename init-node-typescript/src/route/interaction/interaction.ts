import express from 'express';
import Interaction from '../../worker/interaction/interaction';

const router = express.Router();

router.get('/count', Interaction.getView);

export default router;
