import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import userRoutes from './routes/userRoute.js';
import errorHandling from './middlewares/errorHandler.js';
import createUserTable from './data/createUserTable.js';
import { port } from './config/env.js';
import projectRoutes from './routes/projectRoute.js';
import { verifyToken } from './middlewares/authentication.js';

dotenv.config();

const app = express();
//const port = process.env.PORT || 3001;

//Middlewares
app.use(express.json());
app.use(cors())

//Routes 
app.use("/user", userRoutes);
app.use("/project", projectRoutes);

//Error handling middleware
app.use(errorHandling);

//Create table before starting server
createUserTable();

//Testing Postgres Connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`Connected to database: ${result.rows[0].current_database}`);
});

// Server running
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});