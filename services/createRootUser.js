import bcrypt from 'bcryptjs'
import catchRequestErrors from '../middleware/catchRequestErrors.js'
import userSqlModel from '../models/userSqlModel.js'
/**
 * @name    createRootUser
 * @desc    Create the root user
 * @route   POST /config/root
 * @access  public
 */
const createRootUser = catchRequestErrors(async (
  request,
  response
) => {
  const {
    password,
    confirmPassword
  } = await request.json()
  if (password !== confirmPassword) {
    response.status(400)
    throw new Error('Passwords do not match.')
  } else if (!password || !confirmPassword) {
    response.status(400)
    throw new Error('At least one field is empty.')
  } else {
    await userSqlModel.create({
      username: 'root',
      password: await bcrypt.hash(
        password,
        12
      ),
      roles: [
        'root',
        'user'
      ]
    })
    response.status(201).json({
      message: 'User "root" created.'
    })
  }
})
export default createRootUser