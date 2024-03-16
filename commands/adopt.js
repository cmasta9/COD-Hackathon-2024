const {SlashCommandBuilder} = require('discord.js');
const {pets} = require('../database.js');
var PetObj = require('../Pet.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adopt')
        .setDescription('Adopt a new friend and give them a name!')
        .addStringOption(option => 
            option
                .setName('name')
                .setDescription('Disgotchi nickname')
                .setRequired(true)
                ),

    async execute(interaction){
        if (await pets.has(interaction.user.id)){
            await interaction.reply('You already have a pet.')
        }
        else{
            const petNickname = interaction.options.getString('name') ?? 'no name provided';
            const newPet = new PetObj(Math.floor(Math.random()*4+1),petNickname);
            await pets.set(interaction.user.id,newPet);
            await interaction.reply('Pet sucessfully adopted!')
        }
    }
}