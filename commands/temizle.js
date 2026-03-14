const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('temizle')
        .setDescription('Belirtilen miktarda mesajı kanaldan siler.')
        .addIntegerOption(opt => opt.setName('miktar').setDescription('Silinecek mesaj sayısı (1-100)').setRequired(true).setMinValue(1).setMaxValue(100))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        const amount = interaction.options.getInteger('miktar');

        const deleted = await interaction.channel.bulkDelete(amount, true);

        const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setDescription(`🧹 **${deleted.size}** adet mesaj başarıyla temizlendi.`)
            .setFooter({ text: '14 günden eski mesajlar Discord kısıtlaması nedeniyle silinemez.' });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};