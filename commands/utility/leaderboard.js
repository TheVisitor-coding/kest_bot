const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getLeaderboard } = require("../../services/getLeaderboard");

/**
 * Commande permettant d'afficher le classement des membres
 */


module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Affiche le classement des membres"),
  async execute(interaction) {
    const leaderboard = await getLeaderboard();
    const embed = new EmbedBuilder()
      .setTitle("Classement des membres")
      .setDescription("Voici le classement des membres de la communauté")
      .setThumbnail("https://freeimage.host/i/J1DKPgj")
      .setColor("#0099ff")
      .setTimestamp();

    embed.addFields(
      { name: "Classement", value: " ", inline: true },
      { name: "Pseudo", value: " ", inline: true },
      { name: "XP", value: " ", inline: true }
    );

    leaderboard.leaderboard.forEach((user, index) => {
      embed.addFields(
        {
          name: " ",
          value: `${index + 1}`,
          inline: true,
        },
        {
          name: " ",
          value: `${user.name}`,
          inline: true,
        },
        {
          name: " ",
          value: `${user.xp} XP`,
          inline: true,
        }
      );
    });

    embed.setFooter({ text: "Bot créé par Mattéo ROSSI", iconURL: 'https://freeimage.host/i/J1DKPgj'})
   
    await interaction.reply({ embeds: [embed] });
  },
};
