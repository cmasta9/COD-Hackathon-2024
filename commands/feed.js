const {SlashCommandBuilder} = require('discord.js');
const {pets} = require('../database.js');
const {embed} = require('../embed.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feed')
        .setDescription('Feed your Disgotchi!')
        .addIntegerOption(option =>
            option
            .setName('amount')
            .setDescription('Amount to feed your Disgotchi')
            .setRequired(true)),

    async execute(interaction){
        const amount = interaction.options.getInteger('amount');
        const userId  = interaction.user.id;
        let getPet = await pets.get(userId);
        let result = '';

        if(getPet.food >= amount){
            getPet.hunger += amount;
            getPet.food -= amount;
            getPet.cleanliness -= 1
            let tooFull = false;
            if(getPet.hunger > 10){
                getPet.happiness -= 1;
                result = "Your pet is too full!";
            }
            else{
                result = "Pet has been fed!";
            }
            await pets.set(userId,getPet);
        }
        else{
            result = "You don't have enough food! Use the gather command to get more";
        }

        let petEmbed = await embed(interaction);
        petEmbed.content = result;
        await interaction.reply(petEmbed);
    }
}