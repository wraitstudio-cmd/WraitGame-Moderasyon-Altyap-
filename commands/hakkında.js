const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hakkında')
        .setDescription('Botun yapımcısı ve amacı hakkında detaylı bilgi verir.'),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setAuthor({ 
                name: `${client.user.username} | Proje Detayları`, 
                iconURL: client.user.displayAvatarURL({ dynamic: true }) 
            })
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription('Bu bot, sunucu yönetimini profesyonelleştirmek ve gelişmiş moderasyon araçlarını tek bir noktada toplamak amacıyla geliştirilmiştir.\n\nGüvenli, düzenli ve hızlı bir topluluk deneyimi sunmayı hedefler.')
            .addFields(
                { name: '👨‍💻 Geliştirici', value: `\`WraitGame\``, inline: true },
                { name: '🎯 Amacım', value: `Gelişmiş Moderasyon & Sunucu Düzeni`, inline: true },
                { name: '🛠️ Altyapı', value: `\`Discord.js v14\``, inline: true }
            )
            .setFooter({ text: 'WraitGame Özel Projesi - Tüm hakları saklıdır.' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('YouTube Kanalı')
                    .setEmoji('📺')
                    .setURL('https://www.youtube.com/@WraitGameOfficial')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setLabel('Abone Ol')
                    .setEmoji('🔔')
                    .setURL('https://www.youtube.com/@WraitGameOfficial?sub_confirmation=1')
                    .setStyle(ButtonStyle.Link)
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    },
};