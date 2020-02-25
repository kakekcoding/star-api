const express = require('express');
const router = express.Router();
const authRoute = require('./auth_route');

router.get('/', (req, res) => res.send('Welcome'));

router.get('/status', (req, res) => res.send('Server is up'));

router.use('/auth/user', authRoute);

module.exports = router;