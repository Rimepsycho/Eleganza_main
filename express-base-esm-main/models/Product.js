import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Product', // 模型名稱
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // 這是一個必要的欄位
      },
      product_name: {
        type: DataTypes.STRING(50),
        allowNull: false, // 這也是必要的
      },
      brand: {
        type: DataTypes.STRING(30),
        allowNull: false, // 不可為空
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: true, // 可以為空
      },
      top: {
        type: DataTypes.STRING(10),
        allowNull: true, // 可以為空
      },
      back_and_sides: {
        type: DataTypes.STRING(10),
        allowNull: true, // 可以為空
      },
      neck: {
        type: DataTypes.STRING(10),
        allowNull: true, // 可以為空
      },
      fingerboard: {
        type: DataTypes.STRING(10),
        allowNull: true, // 可以為空
      },
      bow: {
        type: DataTypes.STRING(10),
        allowNull: true, // 可以為空
      },
      strings: {
        type: DataTypes.STRING(10),
        allowNull: true, // 可以為空
      },
      num: {
        type: DataTypes.INTEGER,
        allowNull: false, // 不可為空
      },
      product_price: {
        type: DataTypes.INTEGER,
        allowNull: false, // 不可為空
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false, // 不可為空
      },
      img: {
        type: DataTypes.STRING(20),
        allowNull: true, // 可以為空
      },
      introduction: {
        type: DataTypes.STRING(150),
        allowNull: false, // 不可為空
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 可以為空
      },
    },
    {
      tableName: 'product', // 資料表名稱
      timestamps: false, // 開啟時間戳
      paranoid: false, // 禁用軟刪除
      underscored: false, // 使用snake_case
      createdAt: 'created_at', // 建立時間戳
      updatedAt: 'updated_at', // 更新時間戳
    }
  )
}
