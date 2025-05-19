import { Op } from 'sequelize';
import Appeal, { AppealStatus } from '../models/Appeal';

export const createAppeal = async (title: string, text: string): Promise<Appeal> => {
  return await Appeal.create({
    title,
    text,
    status: AppealStatus.NEW
  });
};

export const takeAppealInProgress = async (appealId: number): Promise<Appeal | null> => {
  const appeal = await Appeal.findByPk(appealId);
  
  if (!appeal) {
    return null;
  }
  
  appeal.status = AppealStatus.IN_PROGRESS;
  await appeal.save();
  
  return appeal;
};

export const completeAppeal = async (appealId: number, solution: string): Promise<Appeal | null> => {
  const appeal = await Appeal.findByPk(appealId);
  
  if (!appeal) {
    return null;
  }
  
  appeal.status = AppealStatus.COMPLETED;
  appeal.solution = solution;
  await appeal.save();
  
  return appeal;
};

export const cancelAppeal = async (appealId: number, cancellationReason: string): Promise<Appeal | null> => {
  const appeal = await Appeal.findByPk(appealId);
  
  if (!appeal) {
    return null;
  }
  
  appeal.status = AppealStatus.CANCELLED;
  appeal.cancellationReason = cancellationReason;
  await appeal.save();
  
  return appeal;
};

export const getAppeals = async (
  startDate?: Date,
  endDate?: Date,
  specificDate?: Date
): Promise<Appeal[]> => {
  let whereClause = {};
  
  if (specificDate) {
    const start = new Date(specificDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(specificDate);
    end.setHours(23, 59, 59, 999);
    
    whereClause = {
      createdAt: {
        [Op.between]: [start, end]
      }
    };
  } else if (startDate && endDate) {
    whereClause = {
      createdAt: {
        [Op.between]: [startDate, endDate]
      }
    };
  }
  
  return await Appeal.findAll({
    where: whereClause,
    order: [['createdAt', 'DESC']]
  });
};

export const cancelAllInProgressAppeals = async (): Promise<number> => {
  const [affectedCount] = await Appeal.update(
    { 
      status: AppealStatus.CANCELLED,
      cancellationReason: 'Массовая отмена обращений в работе'
    },
    { 
      where: { status: AppealStatus.IN_PROGRESS }
    }
  );
  
  return affectedCount;
};
