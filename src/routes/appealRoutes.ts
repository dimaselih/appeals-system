import { Router } from 'express';
import * as appealController from '../controllers/appealController';

const router = Router();

// 1) Создать обращение
router.post('/', appealController.createAppeal);

// 2) Взять обращение в работу
router.put('/:id/progress', appealController.takeAppealInProgress);

// 3) Завершить обработку обращения
router.put('/:id/complete', appealController.completeAppeal);

// 4) Отмена обращения
router.put('/:id/cancel', appealController.cancelAppeal);

// 5) Получить список обращений с фильтрацией по датам
router.get('/', appealController.getAppeals);

// 6) Отменить все обращения в статусе "в работе"
router.post('/cancel-all-in-progress', appealController.cancelAllInProgressAppeals);

export default router;
