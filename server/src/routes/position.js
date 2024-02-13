const express = require('express');
const router = express.Router();
const User = require('../models/users');
const data = require('../data/departements.json');

router.get('/', async (req, res) =>
{   
    
})

router.post('/', async (req, res) =>
{
    const id = req.query.id;
    const position = req.query.position;
    
    const result = await User.updateOne({ discordID : id }, {
        $set : {
            position : position,
        }
    })
    
    res.send(result);
})

module.exports = router;