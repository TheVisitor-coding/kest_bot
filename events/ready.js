const { Events } = require("discord.js");

/**
 * Evènement déclenché lors de la connexion du bot 
*/

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client){
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
}