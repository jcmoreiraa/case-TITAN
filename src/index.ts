import express, { Router } from 'express';
import userRouter from './email/email';


const port = Number(process.env.EXPRESS_PORT) || 3002;

const app = express();

app.use(express.json());


app.use(userRouter);
app.get('/', (_req, res) => {
    res.send('Hello World!')
  })
  
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

