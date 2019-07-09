const express = require('express');
const route = require('./routes');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', route);
app.use('/', express.static(`${__dirname}/../client/build/`));

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${server.address().port}`);
});
