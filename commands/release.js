const {SlashCommandBuilder} = require('discord.js');
const {pets} = require('../database.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('release')
        .setDescription('Let your pet run out into the wild!'),

    async execute(interaction){
        if (await pets.has(interaction.user.id)){
            await pets.delete(interaction.user.id);
            await interaction.reply('Your pet ran away... Never to look back')
        }
        else{
            await interaction.reply('You dont have a pet to throw into the forest.')
        }
    }
}