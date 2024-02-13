const express = require('express');
const router = express.Router();
const User = require('../models/users');

// Getting All

router.get('/deconnexion', (req, res) =>
{
    console.log('Someone deconnected');
    res.clearCookie('token');
    res.locals.user = null;
    res.end();
})

router.get('/me', (req, res) => {
    res.send(res.locals.user)
})

// Getting One

router.get('/:id', (req, res) => {

})

// Creating One

router.post('/', (req, res) => {

})

// Updating One

router.patch('/:id', (req, res) => {

})

// Deleting One

router.delete('/:id', (req, res) => {

})

module.exports = router;