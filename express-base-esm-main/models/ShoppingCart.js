import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'ShoppingCart', // 模型名稱
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // 在某些情況下，這可能被作為外鍵使用
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // 這也是一個索引
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // 這可能被作為外鍵或索引
      },
      product_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // 這也是一個索引
      },
      course_price: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // 默認值
      },
    },
    {
      tableName: 'shopping_cart', // 資料表名稱
      timestamps: false, // 禁用時間戳
      paranoid: false, // 無軟刪除
      underscored: false, // 保持camelCase
    }
  )
}
