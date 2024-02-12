require('dotenv').config({ path: './.env'})

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

// Path du dossier 'commands'
const foldersPath = path.join(__dirname, 'commands');

// Lecture du dossier 'commands'
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // Lecture uniquement des fichiers JS
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file); // Ajout du chemin entier vers chaque fichier de commande
		const command = require(filePath); // Récupération de chaque commande
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command) // Ajout de la commande dans la collection
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
		}
	}
}

// Chemin du dossier 'events'
const eventsPath = path.join(__dirname, 'events')

// Lecture uniquement des fichiers JS dans le dossier 'events'
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file) // Ajout du chemin entier vers chaque fichier d'events
	const event = require(filePath) // Récupération de chaque commande

	// Condition si l'event doit se réaliser une seule fois ou non
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args)) // Execution de l'event
	} else {
		client.on(event.name, (...args) => event.execute(...args)) // Execution de l'event
	}
}

// Connexion du Bot sur Discord
client.login(process.env.CLIENT_TOKEN);