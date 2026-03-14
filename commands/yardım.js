const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('Sistemdeki tüm komutları ve bot durumunu gösterir.'),

    async execute(interaction, client) {
        const commandsPath = __dirname;
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        const commandDisplay = commandFiles.map(file => {
            const command = require(path.join(commandsPath, file));
            return `> **\`/${command.data.name}\`**`;
        }).join(' ');

        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);

        const embed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setAuthor({ 
                name: `${client.user.username} - Sistem Komutları`, 
                iconURL: client.user.displayAvatarURL({ dynamic: true }) 
            })
            .setDescription(`Aşağıda botun sahip olduğu tüm yetenekler listelenmiştir. Komutları kullanmak için başlarına \`/\` eklemeniz yeterlidir.\n\n${commandDisplay}`)
            .addFields(
                { 
                    name: '🛠️ Teknik Detaylar', 
                    value: `**Komut Sayısı:** \`${commandFiles.length}\`\n**Gecikme:** \`${client.ws.ping}ms\``, 
                    inline: true 
                },
                { 
                    name: '⏳ Çalışma Süresi', 
                    value: `\`${hours}s ${minutes}d\` süredir aktif.`, 
                    inline: true 
                },
                { 
                    name: '🛡️ Yetki Durumu', 
                    value: interaction.member.permissions.has('Administrator') ? '`Yönetici`' : '`Standart Kullanıcı`', 
                    inline: true 
                }
            )
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setFooter({ text: `Komutları detaylı görmek için yazmayı deneyin.`, iconURL: interaction.guild.iconURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};