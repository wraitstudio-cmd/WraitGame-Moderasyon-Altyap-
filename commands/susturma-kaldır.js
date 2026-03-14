const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('susturma-kaldır')
        .setDescription('Bir kullanıcının susturmasını (timeout) kaldırır.')
        .addUserOption(opt => opt.setName('hedef').setDescription('Susturması kaldırılacak kullanıcı').setRequired(true))
        .addStringOption(opt => opt.setName('sebep').setDescription('İşlem sebebi'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const target = interaction.options.getMember('hedef');
        const reason = interaction.options.getString('sebep') || 'Belirtilmedi';

        if (!target) return interaction.reply({ content: 'Kullanıcı bulunamadı.', ephemeral: true });
        
        if (!target.communicationDisabledUntilTimestamp) {
            return interaction.reply({ content: 'Bu kullanıcının zaten aktif bir susturması yok.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('🔊 Susturma Kaldırıldı')
            .setDescription(`${target.user.tag} artık konuşabilir.`)
            .addFields(
                { name: 'Yetkili', value: `${interaction.user.tag}`, inline: true },
                { name: 'Sebep', value: `\`${reason}\``, inline: true }
            )
            .setTimestamp();

        await target.timeout(null, reason); // Timeout'u null yapmak susturmayı kaldırır.
        await interaction.reply({ embeds: [embed] });
    }
};