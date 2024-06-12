import { DataTypes } from 'sequelize'
// 加密密碼字串用
import { generateHash } from '#db-helpers/password-hash.js'

export default async function (sequelize) {
  return sequelize.define(
    'User',
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING(10), // 字符串最大长度10
        allowNull: false,
      },
      user_account: {
        type: DataTypes.STRING(20), // 字符串最大长度20
        allowNull: false,
      },
      user_password: {
        type: DataTypes.STRING(20), // 字符串最大长度20
        allowNull: false,
      },
      user_phone: {
        type: DataTypes.STRING(10), // 字符串最大长度10
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING(30), // 字符串最大长度30
        allowNull: false,
      },
      user_level: {
        type: DataTypes.STRING(10), // 字符串最大长度10
        allowNull: false,
      },
      user_track: {
        type: DataTypes.STRING(30), // 字符串最大长度30
        allowNull: true,
      },
      user_birth: {
        type: DataTypes.DATEONLY, // 仅需要日期
        allowNull: false,
      },
      user_blacklist: {
        type: DataTypes.INTEGER(1), // 0 或 1
        allowNull: false,
      },
    },
    {
      hooks: {
        // 在创建或更新用户时加密密码
        beforeCreate: async (user) => {
          if (user.user_password) {
            user.user_password = await generateHash(user.user_password)
          }
        },
        beforeUpdate: async (user) => {
          if (user.user_password) {
            user.user_password = await generateHash(user.user_password)
          }
        },
      },
      tableName: 'users', // 指定数据表名称
      timestamps: false, // 开启时间戳
      createdAt: 'created_at', // 创建时间戳字段
      updatedAt: 'updated_at', // 更新时间戳字段
    }
  )
}
