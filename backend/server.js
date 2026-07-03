import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productsroutes.js';
dotenv.config();

const PORT = process.env.PORT || 5000;
console.log(PORT);
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // helps secure the app by setting various HTTP headers
app.use(morgan('dev')); // HTTP request logger middleware for node.js
app.use(express.json()); // built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// app.get('/hello',(req,res)=>{
//     // console.log(res.getHeaders());
//     res.send("Hello World");
// });

app.use('/api/products', productRoutes);

app.listen(PORT,()=>{
    console.log(`server has started on port ${PORT}`);
});
 