const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { verify } = require('jsonwebtoken');
const usersRoutes = require('./src/routes/users');
const authRoutes = require('./src/routes/auth');
const departementsRoutes = require('./src/routes/departements');
const positionsRoutes = require('./src/routes/position');
const cookieParser = require('cookie-parser');
const User = require('./src/models/users');
const cors = require('cors');

require('dotenv').config();

app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true,
}));

mongoose.connect(process.env.MONGO_URL).then(() => 
{
    console.log('Connexion à la base de données réussie !')
}).catch(() => {
    console.log('Echec de la connexion à la base de données.')
})

app.use(express.json());
app.use(cookieParser());

const auth = async (req, res, next) => {
    const token = req.cookies.token;
    
    try {
        const { sub } = verify(token, process.env.JWT_SECRET);
        let user = await User.findOne({ discordID : sub });
        res.locals.user = user;
    } catch(error) {
        res.locals.user = null;
    }
    next();
}

app.use(auth)

app.use('/user/', usersRoutes);
app.use('/auth/discord/', authRoutes);
app.use('/departements', departementsRoutes);
app.use('/position/', positionsRoutes);

app.listen(4000, () => console.log('Server started !'));