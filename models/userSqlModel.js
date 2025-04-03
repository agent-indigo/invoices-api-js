import {DataTypes} from 'sequelize'
import createId from '../utilities/createId.js'
import sequelize from '../utilities/sequelize.js'
const userSqlModel = sequelize.models.User ?? sequelize.define(
  'User', {
    ...createId(),
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notContains: {
          args: [
            ' '
          ],
          msg: 'Spaces prohibited.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.ENUM(
        'root',
        'user'
      )),
      allowNull: false,
      defaultValue: ['user']
    },
    authorities: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    account_non_expired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    account_non_locked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    credentials_non_expired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async user => {
        if (user.get('role') === 'root') if (await userSqlModel.findOne({
          where: {
            role: 'root'
          }
        })) throw new Error('The root user already exists.')
      },
      beforeDestroy: async user => {
        if (user.get('role') === 'root') throw new Error('The root user shouldn\'t be deleted.')
      }
    }
  }
)
export default  userSqlModel