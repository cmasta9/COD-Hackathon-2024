const {SlashCommandBuilder} = require('discord.js');
const {pets} = require('../database.js');
const {embed} = require('../embed.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play with your Disgotchi!'),
    async execute(interaction){
        const userId  = interaction.user.id;
        let pet = await pets.get(userId);
        let result = "";
        if(pet.energy >= 10){
            pet.energy -= 10;
            pet.exp += 5;
            pet.happiness += 1;
            result = `${pet.nickname} had fun playing with you!`;
            pets.set(interaction.user.id,pet);
        }
        else{
            result = `${pet.nickname} is too tired to play.`;
        }
        
        let petEmbed = await embed(interaction);
        await interaction.reply(result);
        await interaction.followUp(petEmbed);
    }
}