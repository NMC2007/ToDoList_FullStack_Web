import express from 'express';
import taskRoutes from './routes/tasksRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4321;

const app = express();



app.use(express.json());

app.use("/api/tasks", taskRoutes);

connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`server da chay tren cong ${PORT}`)
    })
});


