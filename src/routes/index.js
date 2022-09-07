import express from 'express'
import UserRoutes from './userRoutes'
import route2 from './route2'
const router =express.Router()
router.use("/user",UserRoutes);
router.use("/route2",route2);
export default router;