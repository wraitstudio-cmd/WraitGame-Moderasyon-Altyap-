const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banlist')
        .setDescription('Sunucudaki yasaklı kullanıcıları listeler.')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        try {
            const bans = await interaction.guild.bans.fetch();

            if (bans.size === 0) {
                return interaction.reply({ content: '🛡️ Sunucuda yasaklı kullanıcı bulunmuyor.', ephemeral: true });
            }

            const list = bans.map(b => `\`${b.user.id}\` | **${b.user.tag}**`).join('\n');

            const description = list.length > 4000 ? list.substring(0, 4000) + "..." : list;

            const embed = new EmbedBuilder()
                .setColor('#2b2d31')
                .setTitle(`🚫 Yasaklı Listesi (${bans.size} Kullanıcı)`)
                .setDescription(description)
                .setFooter({ text: `${interaction.guild.name} Yönetim Sistemi` })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Yasaklılar listesi alınırken bir hata oluştu.', ephemeral: true });
        }
    },
};