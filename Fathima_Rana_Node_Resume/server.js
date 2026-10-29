const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve Rana's original resume files without changing their design.
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Resume app running at http://localhost:${PORT}`);
});
