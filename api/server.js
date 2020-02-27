const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./config/mongoose');
const logger = require('morgan');
const apiRouter = require('./routes/index');
const apiResponse = require('./helper/api_response');

mongoose.connect();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', apiRouter);

// throw 404 if url not found
app.all('*', (req, res) => {
	return apiResponse.notFoundResponse(res, 'page not found');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log('Starting...');
	console.log(`Server started on http://localhost:${PORT}`);
});

module.exports = app;