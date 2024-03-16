const {SlashCommandBuilder} = require('discord.js');
const {pets} = require('../database.js');
const {embed} = require('../embed.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('hydrate')
        .setDescription('Keep your Disgotchi hydrated!')
        .addIntegerOption(option =>
            option
            .setName('amount')
            .setDescription('Amount to hydrate your Disgotchi')
            .setRequired(true)),
    async execute(interaction){
        const amount = interaction.options.getInteger('amount');
        const userId  = interaction.user.id;
        const getPet = await pets.get(userId);
        if(getPet.water>=amount){
            getPet.thirst += amount;
            getPet.cleanliness -= 1
            getPet.water -= amount;
            
            if(getPet.thirst > 10){
                getPet.happiness -= 1;
                result = "Your pet is overhydrated!";
            }
            await pets.set(userId,getPet)
            result = 'Pet hydrated!';
        }else{
            result = "You dont have enough water! Use the gather command to get more! "
        }
        
        let petEmbed = await embed(interaction);
        petEmbed.content = result;
        await interaction.reply(petEmbed);
    }
}