import { Router } from 'express'
import { getMeHandler } from '../controllers/user.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'

const router = Router()
router.use(deserializeUser, requireUser)

// Admin Get Users route
// Haven't decided to customize the admin role yet.
// router.get('/', restrictTo('admin'), getAllUsersHandler);

// Get my info route
router.get('/me', getMeHandler)

export default router