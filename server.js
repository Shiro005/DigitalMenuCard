// server.js
const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const app = express();

// Set up the JSON Server
const apiRouter = jsonServer.router('db.json');
app.use('/api', apiRouter);

// Serve the Vite build
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
