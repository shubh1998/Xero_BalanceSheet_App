import cors from 'cors';
import axios from 'axios';
import express from 'express';
import { XERO_API_URL } from './config/app.config';
import corsOptions from './config/cors.config';

const app = express();
const PORT = 3001;

app.use(cors(corsOptions))

app.get('/balance-sheet', async (req, res) => {
    try {
        const response = await axios.get(XERO_API_URL);
        res.json(response.data);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Error in fetching balance sheet data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
