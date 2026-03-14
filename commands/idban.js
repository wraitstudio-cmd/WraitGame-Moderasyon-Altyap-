const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('idban')
        .setDescription('ID ile sunucuda olmayan birini yasaklar.')
        .addStringOption(opt => opt.setName('id').setDescription('Kullanıcı ID').setRequired(true))
        .addStringOption(opt => opt.setName('sebep').setDescription('Yasaklama sebebi'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction, client) {
        const userId = interaction.options.getString('id');
        const reason = interaction.options.getString('sebep') || 'ID Ban - Belirtilmedi';

        try {
            await interaction.guild.members.ban(userId, { reason });
            const user = await client.users.fetch(userId).catch(() => ({ tag: userId }));

            const embed = new EmbedBuilder()
                .setColor('#000000')
                .setTitle('🆔 Force Ban Atıldı')
                .setDescription(`**${user.tag}** sunucudan yasaklandı.`)
                .setFields({ name: 'Sebep', value: reason })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch {
            await interaction.reply({ content: 'ID bulunamadı veya işlem başarısız.', ephemeral: true });
        }
    }
};