import { Router } from 'express';
import { submitQuery, getQueryHistory, getQueryById } from '../controllers/queryController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', submitQuery);
router.get('/history', getQueryHistory);
router.get('/:id', getQueryById);

export default router;
