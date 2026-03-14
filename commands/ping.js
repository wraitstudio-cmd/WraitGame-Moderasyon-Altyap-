    const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, version } = require('discord.js');
    const os = require('os');
    const config = require('../config.json');

    module.exports = {
        data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Botun ve sistemin teknik detaylarını gösterir.'),

        async execute(interaction, client) {
            const sent = await interaction.reply({ content: '📊 Veriler toplanıyor...', fetchReply: true });

            const totalRAM = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
            const freeRAM = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
            const usedRAM = (totalRAM - freeRAM).toFixed(2);
            const cpuModel = os.cpus()[0].model.split(' ')[0];
            
            const uptime = process.uptime();
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);

            const apiPing = client.ws.ping;
            const msgPing = sent.createdTimestamp - interaction.createdTimestamp;

            const embed = new EmbedBuilder()
                .setColor(apiPing < 150 ? config.embedColor : '#ff0000')
                .setTitle(`🚀 ${client.user.username} - Teknik Analiz`)
                .setThumbnail(client.user.displayAvatarURL())
                .addFields(
                    { name: '📡 Gecikme Verileri', value: `> **API:** \`${apiPing}ms\`\n> **Mesaj:** \`${msgPing}ms\``, inline: true },
                    { name: '⚙️ Sistem Bilgisi', value: `> **CPU:** \`${cpuModel}\`\n> **Bellek:** \`${usedRAM} / ${totalRAM} GB\``, inline: true },
                    { name: '⏱️ Çalışma Süresi', value: `\`${hours} saat, ${minutes} dakika, ${seconds} saniye\``, inline: false },
                    { name: '📦 Yazılım Sürümleri', value: `> **Discord.js:** \`v${version}\`\n> **Node.js:** \`${process.version}\``, inline: false }
                )
                .setFooter({ text: `Geliştirici: WraitGame`, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Yenile')
                        .setCustomId('refresh_stats')
                        .setEmoji('🔄')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setLabel('Destek Sunucusu')
                        .setURL('https://discord.gg/davet-linkin')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.editReply({
                content: null,
                embeds: [embed],
                components: [row]
            });
        },
    };