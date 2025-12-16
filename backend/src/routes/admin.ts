import { Router } from 'express';
import { getAnalytics, getUsers, getAllQueries } from '../controllers/adminController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// All routes require admin authentication
router.use(authenticateToken);
router.use(requireAdmin);

router.get('/analytics', getAnalytics);
router.get('/users', getUsers);
router.get('/queries', getAllQueries);

export default router;
