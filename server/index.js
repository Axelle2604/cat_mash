const express = require('express');
const route = require('./routes');
const app = express();

app.use('/api/v1', route);

const server = app.listen(8080, () => {
  console.log(`Server started on port ${server.address().port}`);
});
