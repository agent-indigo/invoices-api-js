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
 * @name    createRootUser
 * @desc    Create the root user
 * @route   POST /config/root
 * @access  public
 */
const createRootUser: RequestHandler = catchRequestErrors(async (
  request: Request,
  response: Response
): Promise<void> => {
  const {
    password,
    confirmPassword
  }: NewUser = JSON.parse(request.body)
  if (password !== confirmPassword) {
    response.status(400)
    throw new Error('Passwords do not match.')
  } else if (!password || !confirmPassword) {
    response.status(400)
    throw new Error('At least one field is empty.')
  } else {
    const root: Model<UserSqlRecord> = await userSqlModel.create({
      username: 'root',
      password: hashSync(
        password,
        12
      ),
      role: 'root'
    })
    response.status(201).json({
      id: root.get('id'),
      username: 'root',
      role: 'root',
      createdAt: root.get('createdAt')
    })
  }
})
export default createRootUser