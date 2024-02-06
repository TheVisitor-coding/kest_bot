const { SlashCommandBuilder } = require("discord.js");

/**
 * Commande /hello qui renvoie un message composé du nom de l'utilisateur ainsi que sa date d'entrée sur le serveur
 */

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("Replies with Pong"),
    async execute(interaction) {
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`)
    }
}