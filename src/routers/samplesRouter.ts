import { Router } from 'express';

import samplesControllers from '../controllers/samplesControllers'

const samplesRouter = Router();

samplesRouter.post('/sample', samplesControllers.sampleFunction);

export default samplesRouter;