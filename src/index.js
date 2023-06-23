import express, { Router } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = new Router();

router.get('/', (req, res)=>{
    return res.status(200).send ({message: 'hello world'})
});

console.log('Servidor rodando no Link http://localhost:${port}');
app.listen(port);
