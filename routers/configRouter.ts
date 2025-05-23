import {Router} from 'express'
import getConfigStatus from '@/services/getConfigStatus'
import createRootUser from '@/services/createRootUser'
const configRouter: Router = Router()
configRouter.get(
  '/status',
  getConfigStatus
)
configRouter.post(
  '/rootPassword',
  createRootUser
)
export default configRouter