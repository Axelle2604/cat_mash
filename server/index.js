const express = require('express');
const route = require('./routes');
const app = express();

app.use('/api/v1', route);

app.use('/', express.static(`${__dirname}/../client/build/`));

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${server.address().port}`);
});
