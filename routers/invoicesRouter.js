import {Router} from 'express'
import addInvoice from '../services/invoices/addInvoice.js'
import deleteInvoice from '../services/invoices/deleteInvoice.js'
import editinvoice from '../services/invoices/editInvoice.js'
import listInvoices from '../services/invoices/listInvoices.js'
import authenticate from '../middleware/authenticate.js'
import authorize from '../middleware/authorize.js'
const invoicesRouter = Router()
invoicesRouter.use(authenticate)
invoicesRouter.use(authorize(
  'user',
  'root'
))
invoicesRouter.get(
  '/',
  listInvoices
)
invoicesRouter.post(
  '/',
  addInvoice
)
invoicesRouter.patch(
  '/:id',
  editinvoice
)
invoicesRouter.delete(
  '/:id',
  deleteInvoice
)
export default invoicesRouter