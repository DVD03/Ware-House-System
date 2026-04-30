import express from 'express';
import {
    createPayment, getPayments, getPaymentById,
} from '../controllers/paymentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router
    .route('/')
    .get(getPayments)
    .post(authorize('admin', 'manager', 'accountant'), createPayment);

router.route('/:id').get(getPaymentById);

export default router;