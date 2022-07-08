import express, { Express } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import course from './routes/course.routes';
import lodging from './routes/lodging.routes';
import healthCheckRoutes from './routes/health.routes';

dotenv.config();

const PORT = process.env.PORT || 3080;
const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://newgtj.golftripjunkie.com'
}));

app.use('/api/generic/course', course);
app.use('/api/generic/lodging', lodging);
app.use('/api/health', healthCheckRoutes);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));