const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sustur')
        .setDescription('Bir kullanıcıyı belirli bir süre susturur (Timeout).')
        .addUserOption(opt => opt.setName('hedef').setDescription('Susturulacak kullanıcı').setRequired(true))
        .addStringOption(opt => opt.setName('süre').setDescription('Süre (1dk, 1sa, 1g)').setRequired(true)
            .addChoices(
                { name: '60 Saniye', value: '60000' },
                { name: '5 Dakika', value: '300000' },
                { name: '10 Dakika', value: '600000' },
                { name: '1 Saat', value: '3600000' },
                { name: '1 Gün', value: '86400000' },
                { name: '1 Hafta', value: '604800000' }
            ))
        .addStringOption(opt => opt.setName('sebep').setDescription('Susturma sebebi'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const target = interaction.options.getMember('hedef');
        const duration = parseInt(interaction.options.getString('süre'));
        const reason = interaction.options.getString('sebep') || 'Belirtilmedi';

        if (!target) return interaction.reply({ content: 'Kullanıcı bulunamadı.', ephemeral: true });
        if (!target.moderatable) return interaction.reply({ content: 'Bu kullanıcıyı susturmaya yetkim yetmiyor.', ephemeral: true });

        const embed = new EmbedBuilder()
            .setColor('#ff9900')
            .setTitle('🔇 Kullanıcı Susturuldu')
            .addFields(
                { name: 'Kullanıcı', value: `${target.user.tag}`, inline: true },
                { name: 'Süre', value: `${interaction.options.data.find(d => d.name === 'süre').value === '60000' ? '1 Dakika' : 'Seçilen Süre'}`, inline: true },
                { name: 'Yetkili', value: `${interaction.user.tag}`, inline: true },
                { name: 'Sebep', value: `\`${reason}\`` }
            )
            .setTimestamp();

        await target.timeout(duration, reason);
        await interaction.reply({ embeds: [embed] });
    }
};