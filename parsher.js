const { Client, Intents } = require('discord.js');
const config = require('./config.js');

global.client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

require('./src/loader');

client.login(config.token);