const { Events, REST, Routes } = require('discord.js');
const config = require('../config.json');
const chalk = require('chalk');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        const rest = new REST({ version: '10' }).setToken(config.token);
        const slashCommands = client.commands.map(command => command.data.toJSON());

        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: slashCommands },
            );

            console.log(chalk.green(`[SİSTEM] ${client.user.tag} aktif edildi!`));

            client.user.setPresence({
                activities: [{ name: config.activity }],
                status: config.status
            });

        } catch (error) {
          
            console.error(chalk.red(`[HATA] Komutlar yüklenemedi!`));
        }
    },
};