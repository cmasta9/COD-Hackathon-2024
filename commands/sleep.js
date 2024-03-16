const {SlashCommandBuilder} = require('discord.js');
const {pets} = require('../database.js');
const {embed} = require('../embed.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sleep')
        .setDescription('Give your Disgotchi a rest!'),
    async execute(interaction){
        const userId  = interaction.user.id;
        const getPet = await pets.get(userId);
        let result = '';
        getPet.energy = 100;
        result = "Pet is sleeping!";
        await pets.set(userId,getPet)
        let petEmbed = await embed(interaction);
        await interaction.reply(result);
        await interaction.followUp(petEmbed);
    }
}