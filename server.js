const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Prints page
app.get('/prints', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'prints.html'));
});

// Health check for Railway
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', app: 'Baroque Mirror' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚜ Baroque Mirror running on port ${PORT}`);
});
-e 
// Redeploy trigger: 2026-01-04T22:16:28Z
