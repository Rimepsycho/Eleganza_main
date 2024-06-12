import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Comment',
    {
      comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comment_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      comment_star: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comment_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users', // 設定對應的表格名稱
          key: 'id',
        },
      },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 允許null值
        references: {
          model: 'articles', // 設定對應的表格名稱
          key: 'article_id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 允許null值
        references: {
          model: 'products', // 設定對應的表格名稱
          key: 'id',
        },
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 允許null值
        references: {
          model: 'courses', // 設定對應的表格名稱
          key: 'id',
        },
      },
    },
    {
      tableName: 'comment',
      timestamps: false,
      underscored: true,
    }
  )
}
