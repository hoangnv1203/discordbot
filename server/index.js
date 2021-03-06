import express from 'express';
import morgan from 'morgan';
import {
    SERVER_PORT,
    CHANNELS,
    TOKENS
} from 'config/config';
import mongoose from 'mongoose';
import api from 'modules/api';
import bodyParser from 'body-parser';
import {
    pullmessage,
    getMessages
} from 'modules/web';
import {
    verifyEmail
} from 'modules/web/verify';
import {
    bot
} from 'modules/bot'
import {
    botPerson
} from 'modules/bot/user'

const system = express();

system.use(bodyParser.json());
system.use(bodyParser.urlencoded({
    extended: true
}));
system.use('/api', api);
system.get('/', (req, res, next) => {
    res.json('Landing pages');
});
system.get('/messages', getMessages);
system.get('/verify/:activeId', verifyEmail);

setInterval(() => {
    CHANNELS.forEach((channel) => {
        pullmessage(channel);
    });
}, 6000);
bot();
TOKENS.forEach((token) => {
    botPerson(token);
});

system.use(morgan('dev'));
system.listen(SERVER_PORT, () => console.log(`Server listen to :${SERVER_PORT}`));
