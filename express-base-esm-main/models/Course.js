import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Course', // 模型名稱
    {
      course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // 自動增量
      },
      course_class_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 可以為空
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 可以為空
      },
      course_name: {
        type: DataTypes.STRING(255),
        allowNull: true, // 可以為空
      },
      course_img: {
        type: DataTypes.STRING(25),
        allowNull: true, // 可以為空
      },
      course_price: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true, // 可以為空
      },
      course_style: {
        type: DataTypes.STRING(100),
        allowNull: true, // 可以為空
      },
      course_description: {
        type: DataTypes.TEXT,
        allowNull: true, // 可以為空
      },
      quota: {
        type: DataTypes.INTEGER,
        allowNull: true, // 可以為空
      },
    },
    {
      tableName: 'course', // 資料表名稱
      timestamps: false, // 使用時間戳
      underscored: false, // 使用snake_case
      paranoid: false, // 禁用軟刪除
      createdAt: 'created_at', // 建立時間戳
      updatedAt: 'updated_at', // 更新時間戳
    }
  )
}
