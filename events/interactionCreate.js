const { Events } = require('discord.js');
const { statusCheck } = require('../StatusCheck.js');
const {cooldownCheck} = require('../CooldownCheck.js');
const { pets } = require('../database.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			const has = await pets.has(interaction.user.id);
			if(has){
				const cd = await cooldownCheck(interaction.user.id);
				const status = await statusCheck(interaction.user.id,command.data.name,cd);
				if(status == -1){
					await interaction.reply('Your Disgotchi ran away to find a better home!');
				}else{
					if(status == 2){
						await interaction.channel.send(`<@${interaction.user.id}>, your pet leveled up!`);
					}
					if(cd <= 0 || command.data.name == "show"){
						await command.execute(interaction);
					}
					else{
						console.log(`cooldown: ${cd} seconds`);
						await interaction.reply(`You need to wait ${Math.round(cd)} seconds before you can do anything else.`);
					}
				}
			}
			else{
				if(command.data.name != 'adopt'){
					interaction.reply("You must adopt a pet before you can do anything else.");
				}
				else{
					await command.execute(interaction);
				}
			}
			
			
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};
