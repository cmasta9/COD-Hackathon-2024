const {SlashCommandBuilder} = require('discord.js');
const {pets} = require('../database.js');
var PetObj = require('../Pet.js');
const {embed} = require('../embed.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clean')
        .setDescription('Give your Disgotchi a bath!'),
    async execute(interaction){
        const userId  = interaction.user.id;
        const getPet = await pets.get(userId);
        let result = '';
        getPet.cleanliness = 10;
        result = "Pet has been washed!";
        await pets.set(userId,getPet)
        let petEmbed = await embed(interaction);
        await interaction.reply(result);
        await interaction.followUp(petEmbed);
    }
}