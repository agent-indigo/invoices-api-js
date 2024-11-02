import bcrypt from 'bcryptjs'
import catchRequestErrors from '../../middleware/catchRequestErrors.js'
import UserModel from '../../models/UserModel.js'
/**
 * @name    addUser
 * @desc    Add a new user
 * @route   POST /api/users
 * @access  private/root
 */
const addUser = catchRequestErrors(async (
  request,
  response
) => {
  const {
    name,
    password,
    confirmPassword
  } = request.body
  if (password !== confirmPassword) {
    response.status(400)
    throw new Error('Passwords do not match.')
  } else if (!name || !password || !confirmPassword) {
    response.status(400)
    throw new Error('At least one field is empty.')
  } else {
    await UserModel.create({
      name,
      shadow: await bcrypt.hash(
        password,
        10
      ),
      role: 'user'
    })
    response.status(201).json({
      message: 'User created.'
    })
  }
})
export default addUser