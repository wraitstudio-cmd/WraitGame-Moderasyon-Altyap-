const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Bir kullanıcıyı sunucudan atar.')
        .addUserOption(option => 
            option.setName('hedef')
                .setDescription('Sunucudan atılacak kullanıcı')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('sebep')
                .setDescription('Atılma sebebi')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {
        const target = interaction.options.getMember('hedef');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi.';

        if (!target) {
            return interaction.reply({ content: '❌ Kullanıcı bu sunucuda bulunamadı.', ephemeral: true });
        }

        if (!target.kickable) {
            return interaction.reply({ 
                content: '❌ Bu kullanıcıyı atmak için yetkim yetmiyor (Rolü benden üstte olabilir).', 
                ephemeral: true 
            });
        }

        if (target.id === interaction.user.id) {
            return interaction.reply({ content: '❌ Kendini sunucudan atamazsın.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor('#ffa500')
            .setTitle('👢 Kullanıcı Sunucudan Atıldı')
            .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Kullanıcı', value: `\`${target.user.tag}\` (${target.id})`, inline: true },
                { name: 'Yetkili', value: `\`${interaction.user.tag}\``, inline: true },
                { name: 'Sebep', value: `\`${reason}\``, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: `Sunucu: ${interaction.guild.name}` });

        try {

            await target.kick(`${interaction.user.tag}: ${reason}`);
            
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Kullanıcıyı atarken teknik bir hata oluştu.', ephemeral: true });
        }
    },
};