const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Kullanıcıyı sunucudan yasaklar.')
        .addUserOption(opt => opt.setName('hedef').setDescription('Yasaklanacak kişi').setRequired(true))
        .addStringOption(opt => opt.setName('sebep').setDescription('Yasaklama sebebi'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const target = interaction.options.getMember('hedef');
        const reason = interaction.options.getString('sebep') || 'Belirtilmedi';

        if (!target?.bannable) return interaction.reply({ content: 'Bu kullanıcıyı yasaklayamam.', ephemeral: true });

        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('🔨 Yasaklama İşlemi')
            .addFields(
                { name: 'Kullanıcı', value: `${target.user.tag}`, inline: true },
                { name: 'Yetkili', value: `${interaction.user.tag}`, inline: true },
                { name: 'Sebep', value: `\`${reason}\`` }
            )
            .setTimestamp();

        await target.ban({ reason });
        await interaction.reply({ embeds: [embed] });
    }
};