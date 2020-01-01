import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const app: Application = express();

//SETTINGS
app.set('port', 4000);

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({credentials: true, origin: true}));

//ROUTES
app.use('/auth', authRoutes);
app.use('/', userRoutes);

export default app;
