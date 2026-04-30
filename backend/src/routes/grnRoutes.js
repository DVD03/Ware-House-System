import express from 'express';
import { createGrn, getGrns, getGrnById } from '../controllers/grnController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createGrnSchema } from '../validators/purchaseOrderValidator.js';

const router = express.Router();
router.use(protect);

router.route('/')
    .get(getGrns)
    .post(authorize('admin', 'manager', 'warehouse_staff'), validate(createGrnSchema), createGrn);

router.route('/:id').get(getGrnById);

export default router;