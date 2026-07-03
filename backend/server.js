import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { sql } from './config/db.js';
import productRoutes from './routes/productsRoutes.js';
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

async function initialdb() {
    try
    {
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255),
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
        `;
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

initialdb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

