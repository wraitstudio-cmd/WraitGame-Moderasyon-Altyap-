const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Bir kullanıcının yasaklamasını ID ile kaldırır.')
        .addStringOption(opt => opt.setName('id').setDescription('Yasağı kaldırılacak kullanıcı ID').setRequired(true))
        .addStringOption(opt => opt.setName('sebep').setDescription('Yasak kaldırma sebebi'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const userId = interaction.options.getString('id');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi.';

        try {
            await interaction.guild.members.unban(userId, reason);
            
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('🔓 Yasak Kaldırıldı')
                .setDescription(`<@${userId}> kullanıcısının yasağı başarıyla kaldırıldı.`)
                .addFields(
                    { name: 'Kullanıcı ID', value: `\`${userId}\``, inline: true },
                    { name: 'Yetkili', value: `${interaction.user.tag}`, inline: true },
                    { name: 'Sebep', value: `\`${reason}\`` }
                )
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: '❌ Bu ID ile yasaklı bir kullanıcı bulunamadı veya bir hata oluştu.', ephemeral: true });
        }
    }
};