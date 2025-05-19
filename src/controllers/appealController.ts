import { Request, Response } from 'express';
import * as appealService from '../services/appealService';

export const createAppeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, text } = req.body;
    
    if (!title || !text) {
      res.status(400).json({ message: 'Необходимо указать тему и текст обращения' });
      return;
    }
    
    const appeal = await appealService.createAppeal(title, text);
    res.status(201).json(appeal);
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка при создании обращения', error: error.message || String(error) });
  }
};

export const takeAppealInProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      res.status(400).json({ message: 'Некорректный ID обращения' });
      return;
    }
    
    const appeal = await appealService.takeAppealInProgress(id);
    
    if (!appeal) {
      res.status(404).json({ message: 'Обращение не найдено' });
      return;
    }
    
    res.status(200).json(appeal);
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка при взятии обращения в работу', error: error.message || String(error) });
  }
};

export const completeAppeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { solution } = req.body;
    
    if (isNaN(id)) {
      res.status(400).json({ message: 'Некорректный ID обращения' });
      return;
    }
    
    if (!solution) {
      res.status(400).json({ message: 'Необходимо указать решение проблемы' });
      return;
    }
    
    const appeal = await appealService.completeAppeal(id, solution);
    
    if (!appeal) {
      res.status(404).json({ message: 'Обращение не найдено' });
      return;
    }
    
    res.status(200).json(appeal);
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка при завершении обращения', error: error.message || String(error) });
  }
};

export const cancelAppeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { cancellationReason } = req.body;
    
    if (isNaN(id)) {
      res.status(400).json({ message: 'Некорректный ID обращения' });
      return;
    }
    
    if (!cancellationReason) {
      res.status(400).json({ message: 'Необходимо указать причину отмены' });
      return;
    }
    
    const appeal = await appealService.cancelAppeal(id, cancellationReason);
    
    if (!appeal) {
      res.status(404).json({ message: 'Обращение не найдено' });
      return;
    }
    
    res.status(200).json(appeal);
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка при отмене обращения', error: error.message || String(error) });
  }
};

export const getAppeals = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate, date } = req.query;
    
    let startDateObj: Date | undefined;
    let endDateObj: Date | undefined;
    let specificDateObj: Date | undefined;
    
    if (date) {
      specificDateObj = new Date(date as string);
    } else if (startDate && endDate) {
      startDateObj = new Date(startDate as string);
      endDateObj = new Date(endDate as string);
    }
    
    const appeals = await appealService.getAppeals(startDateObj, endDateObj, specificDateObj);
    res.status(200).json(appeals);
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка при получении списка обращений', error: error.message || String(error) });
  }
};

export const cancelAllInProgressAppeals = async (_req: Request, res: Response): Promise<void> => {
  try {
    const count = await appealService.cancelAllInProgressAppeals();
    res.status(200).json({ message: `Отменено ${count} обращений в работе` });
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка при массовой отмене обращений', error: error.message || String(error) });
  }
};
