const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

process.removeAllListeners('warning');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

process.on('unhandledRejection', (reason, promise) => { console.error(' [Anti-Crash] Rejection:', reason); });
process.on('uncaughtException', (err, origin) => { console.error(' [Anti-Crash] Exception:', err); });

const foldersPath = path.join(__dirname, 'commands');
const commandItems = fs.readdirSync(foldersPath);

for (const item of commandItems) {
    const itemPath = path.join(foldersPath, item);
    const stat = fs.lstatSync(itemPath);

    if (stat.isDirectory()) {
      
        const commandFiles = fs.readdirSync(itemPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(itemPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            }
        }
    } else if (item.endsWith('.js')) {
        
        const command = require(itemPath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

client.login(config.token);