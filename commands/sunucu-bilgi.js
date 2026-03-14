const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sunucu-bilgi')
        .setDescription('Sunucu hakkında detaylı bilgi verir.'),

    async execute(interaction) {
        const guild = interaction.guild;
        
        const embed = new EmbedBuilder()
            .setColor('#5865f2')
            .setTitle(`${guild.name} - Sunucu Bilgileri`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '👑 Sahip', value: `<@${guild.ownerId}>`, inline: true },
                { name: '👥 Üye Sayısı', value: `\`${guild.memberCount}\``, inline: true },
                { name: '🛡️ Güvenlik Seviyesi', value: `\`${guild.verificationLevel}\``, inline: true },
                { name: '💬 Kanal Sayısı', value: `\`${guild.channels.cache.size}\``, inline: true },
                { name: '✨ Takviye Sayısı', value: `\`${guild.premiumSubscriptionCount || 0}\``, inline: true },
                { name: '📅 Kuruluş', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true }
            )
            .setFooter({ text: `ID: ${guild.id}` });

        await interaction.reply({ embeds: [embed] });
    }
};