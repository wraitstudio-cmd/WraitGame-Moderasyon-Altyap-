const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nick')
        .setDescription('Kullanıcının sunucu içi ismini değiştirir.')
        .addUserOption(opt => opt.setName('hedef').setDescription('Kullanıcı').setRequired(true))
        .addStringOption(opt => opt.setName('isim').setDescription('Yeni isim').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),

    async execute(interaction) {
        const member = interaction.options.getMember('hedef');
        const newNick = interaction.options.getString('isim');

        try {
            await member.setNickname(newNick);
            await interaction.reply({ content: `✅ **${member.user.tag}** ismi **${newNick}** olarak güncellendi.`, ephemeral: true });
        } catch {
            await interaction.reply({ content: '❌ Bu kullanıcının ismini değiştirmeye yetkim yetmiyor.', ephemeral: true });
        }
    }
};