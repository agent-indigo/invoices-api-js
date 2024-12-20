import jwt from 'jsonwebtoken'
const createToken = (
  response,
  id
) => {
  const token = jwt.sign({
    id
  },
  process.env.JWT_SECRET ?? '', {
    expiresIn: '30d'
  })
  response.cookie(
    'token',
    token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  )
  return token
}
export default createToken