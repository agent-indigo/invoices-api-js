import {hashSync} from 'bcryptjs'
import {
  Request,
  RequestHandler,
  Response
} from 'express'
import {Model} from 'sequelize'
import catchRequestErrors from '@/middleware/catchRequestErrors'
import userSqlModel from '@/models/userSqlModel'
import UserSqlRecord from '@/types/UserSqlRecord'
import NewUser from '@/types/NewUser'
/**
 * @name    addUser
 * @desc    Add a new user
 * @route   POST /users
 * @access  private/root
 */
const addUser: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<void> => {
  const {
    username,
    password,
    confirmPassword
  }: NewUser = JSON.parse(request.body)
  if (password !== confirmPassword) {
    response.status(400)
    throw new Error('Passwords do not match.')
  } else if (!username || !password || !confirmPassword) {
    response.status(400)
    throw new Error('At least one field is empty.')
  } else {
    const user: Model<UserSqlRecord> = await userSqlModel.create({
      username,
      password: hashSync(
        password,
        12
      ),
      role: 'user'
    })
    response.status(201).json({
      id: user.get('id'),
      username: user.get('username'),
      role: user.get('role'),
      createdAt: user.get('createdAt')
    })
  }
})
export default addUser