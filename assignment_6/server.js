const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the original portfolio website files from the public folder.
app.use(express.static(path.join(__dirname, 'public')));

// Open the home page when visiting the root URL.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Personal website is running at http://localhost:${PORT}`);
});
