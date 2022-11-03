require('dotenv').config()
import express, { json, urlencoded } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import indexRouter from './router/index';
const app = express()
const url = process.env.DB_URL
connect(url).then((res) => console.log("connect Data base"));
const port = 8000;
import path from 'path';

app.use(json());
app.use(urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));
//To allow cross-origin requests
app.use(cors());
app.use("/", indexRouter);
app.listen(port, () => console.log(`running on ports ${port}`))
