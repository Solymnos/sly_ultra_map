const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/users');
const { sign } = require('jsonwebtoken');

require('dotenv').config();

router.get('/login', async(req, res) =>
{
    const url = 'https://discord.com/api/oauth2/authorize?client_id=1185294240805298277&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds';
    res.redirect(url);
})

router.get('/update', async(req, res) =>
{
    const id = req.query.id;
    const user = await User.findOne({ discordID : id });

    const guildResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers : {
            Authorization : `Bearer ${user.lastToken}`
        }
    })
    
    let guilds = guildResponse.data;
    let isOnServer = guilds.some(guild => guild.id === '752087525216223334');
    
    await User.updateOne(
    { discordID : id },
        {
            $set : {
                isOnServer : isOnServer,
            }
        }
    )
    let updateUser = await User.findOne({ discordID : id });
    console.log('Auth discord updated !');
    console.log(updateUser);
    res.locals.user = updateUser;
    res.send(updateUser);
}) 

router.get('/callback', async(req, res) => 
{
    //throw error if no code
    const code = req.query.code;
    
    const params = new URLSearchParams({
        client_id : process.env.DISCORD_CLIENT_ID,
        client_secret : process.env.DISCORD_CLIENT_SECRET,
        grant_type : 'authorization_code',
        code,
        redirect_uri : process.env.DISCORD_REDIRECT_URI
    })
    
    const headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Accept-Encoding' : 'application/x-www-form-urlencoded'
    }
    
    const response = await axios.post('https://discord.com/api/oauth2/token', params, { headers });
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
        headers : {
            Authorization : `Bearer ${response.data.access_token}`
        }
    });
    
    const guildResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers : {
            Authorization : `Bearer ${response.data.access_token}`
        }
    })
    
    let guilds = guildResponse.data;
    let isOnServer = guilds.some(guild => guild.id === '752087525216223334');
    
    try {
        const exist = await User.findOne({ discordID : userResponse.data.id });
        if (exist) {
            const updateUser = await User.updateOne(
            { discordID : userResponse.data.id },
            {
                $set : {
                    name : userResponse.data.global_name,
                    discordPP : userResponse.data.avatar,
                    isOnServer : isOnServer,
                    lastToken : response.data.access_token,
                }
            })
            console.log('Update user ' + updateUser.name);
        } else {
            const newUser = new User(
            {
                discordID : userResponse.data.id,
                discordPP : userResponse.data.avatar,
                name : userResponse.data.global_name,
                isOnServer : isOnServer,
                lastToken : response.data.access_token,
                position : null
            })
            await newUser.save();
            console.log('Create new user ' + newUser.name);
        }
    } catch (error) {
        console.error('Error : ', error);
    }
    
    const token = sign({ sub : userResponse.data.id }, process.env.JWT_SECRET, { expiresIn :  '60d'});
    res.cookie('token', token);
    res.redirect(process.env.CLIENT_REDIRECT_URL);
})

module.exports = router;