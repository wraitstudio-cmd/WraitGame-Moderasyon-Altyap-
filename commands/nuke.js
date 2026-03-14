const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('Kanalı siler ve aynı izinlerle yeniden oluşturur (Tüm mesajları temizler).')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const position = interaction.channel.position;
        const newChannel = await interaction.channel.clone();
        
        await interaction.channel.delete();
        await newChannel.setPosition(position);

        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('🚀 Kanal Nukelendi')
            .setDescription('Kanal başarıyla sıfırlandı ve tüm mesajlar temizlendi.')
            .setImage('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Y1bmticmticm9rYnJva2Jyb2ticm9rYnJva2Jyb2ticm9rYnJvJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/HhTXt43pk1I1W/giphy.gif')
            .setTimestamp();

        await newChannel.send({ embeds: [embed] });
    }
};