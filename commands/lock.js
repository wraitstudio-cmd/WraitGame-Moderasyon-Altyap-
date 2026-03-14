const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kilitle')
        .setDescription('Kanalı üyelerin mesaj atmasına kapatır veya açar.')
        .addStringOption(opt => opt.setName('durum').setDescription('Kilit durumu').setRequired(true)
            .addChoices(
                { name: 'Kilitle', value: 'lock' },
                { name: 'Kilidi Aç', value: 'unlock' }
            ))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const choice = interaction.options.getString('durum');
        const channel = interaction.channel;

        if (choice === 'lock') {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
            await interaction.reply({ content: '🔒 Kanal başarıyla **kilitlendi**. Sadece yetkililer mesaj atabilir.' });
        } else {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true });
            await interaction.reply({ content: '🔓 Kanalın kilidi **açıldı**. Artık herkes mesaj atabilir.' });
        }
    }
};