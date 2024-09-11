import express from 'express'
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobContoller, getAllJobsController, updateJobsController } from '../controllers/jobsController.js';

const router = express.Router();

// create Job, || post
router.post('/create-job',userAuth,createJobController)
// getJob || get

router.get('/get-jobs',userAuth,getAllJobsController)

// update \put
router.patch('/update-job/:id',userAuth,updateJobsController)

//DELTE
router.delete('/delete-job/:id',userAuth,deleteJobContoller)

export default router