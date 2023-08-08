import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv' 
import router from './router';
dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const port = 8080;

server.listen(port, ()=> {
    console.log(`Server running on http://localhost:${port}`)
});

//connecting to the database
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.db_URI)
        console.log("Connected to database")
        //listen to forwarded requests from Microservices APIs if Connection succeed 

} catch (error) {
        console.log("Error connecting to the database")
    }
};

connectDB();


app.use('/', router());
