import express from 'express';
import protectedRoute from '../middlewire/auth.middlewire'
const router = express.Router();

import { addEmployee } from '../controllers/hospitaladmin.controller';

router.post('/add-employee',protectedRoute,addEmployee)