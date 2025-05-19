import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';

export enum AppealStatus {
  NEW = 'Новое',
  IN_PROGRESS = 'В работе',
  COMPLETED = 'Завершено',
  CANCELLED = 'Отменено'
}

// Атрибуты обращения
interface AppealAttributes {
  id: number;
  title: string;
  text: string;
  status: AppealStatus;
  solution?: string;
  cancellationReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Атрибуты при создании обращения (ID может быть опциональным)
interface AppealCreationAttributes extends Optional<AppealAttributes, 'id'> {}

// Определение модели обращения
class Appeal extends Model<AppealAttributes, AppealCreationAttributes> implements AppealAttributes {
  public id!: number;
  public title!: string;
  public text!: string;
  public status!: AppealStatus;
  public solution?: string;
  public cancellationReason?: string;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Appeal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(AppealStatus)),
      allowNull: false,
      defaultValue: AppealStatus.NEW,
    },
    solution: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cancellationReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Appeal',
    tableName: 'appeals',
  }
);

export default Appeal;
