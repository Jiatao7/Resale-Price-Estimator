//Imports
import express from 'express';
import cors from 'cors';
import estimatesRoutes from './routes/estimates.js';

//Create app
const app = express();

//Define port
const PORT = 4000;

//Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//Routes
app.use('/api/estimates', estimatesRoutes);

//Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});