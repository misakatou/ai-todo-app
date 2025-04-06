const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const gptRoute = require('./routes/gpt');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/gpt', gptRoute);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
