import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Article',
    {
      article_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      article_class_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      article_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      article_img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      article_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      article_content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },

    {
      tableName: 'article', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
