import express from 'express';
import {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask
} from '../controller/tasksController.js';

const router = express.Router();

router.get('/', getAllTasks);

router.post('/', createTask);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

export default router;