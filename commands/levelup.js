const {SlashCommandBuilder} = require('discord.js');
const {pets} = require('../database.js');
const {embed} = require('../embed.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('levelup')
        .setDescription('This is a development command not avaiable in the final version'),
    async execute(interaction){
        let pet = await pets.get(interaction.user.id);
        let result = "You have been given 5 levels!";
        pet.lvl += 5;
        await pets.set(interaction.user.id,pet);

        // output embed
        let petEmbed = await embed(interaction);
        petEmbed.content = result;
        await interaction.reply(petEmbed);
    }
}