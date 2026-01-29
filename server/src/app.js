import express from 'express';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors'

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', productRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;