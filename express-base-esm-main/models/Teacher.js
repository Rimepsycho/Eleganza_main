import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Teacher', // 模型名稱
    {
      teacher_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // 自動增量
      },
      t_name: {
        type: DataTypes.STRING(255),
        allowNull: false, // 不可為空
      },
      onsite_teacher: {
        type: DataTypes.TINYINT(1),
        allowNull: true, // 可以為空
      },
      t_img: {
        type: DataTypes.STRING(255),
        allowNull: true, // 可以為空
      },
      t_years: {
        type: DataTypes.INTEGER,
        allowNull: true, // 可以為空
      },
      education: {
        type: DataTypes.TEXT,
        allowNull: true, // 可以為空
      },
      courses: {
        type: DataTypes.TEXT,
        allowNull: true, // 可以為空
      },
      introduction: {
        type: DataTypes.TEXT,
        allowNull: true, // 可以為空
      },
      experience: {
        type: DataTypes.TEXT,
        allowNull: true, // 可以為空
      },
    },
    {
      tableName: 'teacher', // 資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 無軟刪除
      underscored: false, // 使用snake_case
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
