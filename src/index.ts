import express, {Express} from 'express';
import { studentRouter } from './routes/student.route';
import { db } from './lib/connectionDB';

const app: Express = express();

const port:number = 3000;

app.use(express.urlencoded({ extended: true}));
app.use("/students", studentRouter);

db.then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on ${port} port`);
    })
})

