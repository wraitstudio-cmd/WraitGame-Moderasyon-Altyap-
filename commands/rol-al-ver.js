const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rol')
        .setDescription('Kullanıcıya rol verir veya alır.')
        .addUserOption(opt => opt.setName('hedef').setDescription('İşlem yapılacak kullanıcı').setRequired(true))
        .addRoleOption(opt => opt.setName('rol').setDescription('Verilecek/Alınacak rol').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

    async execute(interaction) {
        const member = interaction.options.getMember('hedef');
        const role = interaction.options.getRole('rol');

        if (member.roles.cache.has(role.id)) {
            await member.roles.remove(role);
            return interaction.reply({ content: `✅ **${member.user.tag}** kullanıcısından <@&${role.id}> rolü alındı.`, ephemeral: true });
        } else {
            await member.roles.add(role);
            return interaction.reply({ content: `✅ **${member.user.tag}** kullanıcısına <@&${role.id}> rolü verildi.`, ephemeral: true });
        }
    }
};