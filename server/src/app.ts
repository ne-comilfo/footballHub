import express from 'express';
import morgan from 'morgan';

const app = express();


app.use(morgan("dev")); // middleware для логирования данных
app.use(express.json());

export default app;