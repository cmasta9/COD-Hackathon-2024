const {SlashCommandBuilder} = require('discord.js');
const {pets} = require('../database.js');
const {embed} = require('../embed.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gather')
        .setDescription('Send your Disgotchi out to gather food or water!')
        .addStringOption(option =>
            option
            .setName('resource-type')
            .setDescription('The type of resource to be gathered.')
            .setRequired(true)
            .addChoices({name: "Food", value: "food"},
                        {name: "Water", value: "water"})

            ),

    // Check if it's getting food or drink
    // Get exp for completing the task
    // Increase food or drink attribute
    async execute(interaction){
        const rscType = interaction.options.getString('resource-type');
        const userId  = interaction.user.id;
        const getPet = await pets.get(userId);
        let randNum = Math.floor(Math.random()*3);

        
        if (rscType === 'food') {
            getPet.energy -= 15;
            await interaction.reply('Gathering food...');
            getPet.food += randNum;
            await interaction.followUp(`${getPet.nickname} has gathered ${randNum} food.`);
            getPet.cleanliness -= 1

            getPet.exp += 10;
            await pets.set(userId,getPet);

        } else if (rscType === 'water') {
            getPet.energy -= 15;
            await interaction.reply('Gathering water...');
            getPet.water += randNum;
            await interaction.followUp(`${getPet.nickname} has gathered ${randNum} water.`);
            getPet.exp += 10;
            getPet.cleanliness -= 1

            getPet.exp += 10;
            await pets.set(userId,getPet);

        } else {
            await interaction.reply('Invalid resource type. Please specify either food or water.');
        }
    }
};