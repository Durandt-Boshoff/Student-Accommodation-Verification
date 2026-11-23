const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('message')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)  
})
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/signup'));