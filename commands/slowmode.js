const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Kanalın yavaş mod süresini ayarlar.')
        .addIntegerOption(opt => opt.setName('saniye').setDescription('Yavaş mod süresi (0 kapatır)').setRequired(true).setMinValue(0).setMaxValue(21600))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const second = interaction.options.getInteger('saniye');

        await interaction.channel.setRateLimitPerUser(second);

        const embed = new EmbedBuilder()
            .setColor('#f1c40f')
            .setTitle('⏳ Yavaş Mod Ayarlandı')
            .setDescription(second === 0 ? 'Yavaş mod bu kanal için **kapatıldı**.' : `Bu kanalda artık her kullanıcı **${second}** saniyede bir mesaj atabilir.`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};