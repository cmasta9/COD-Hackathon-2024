const {SlashCommandBuilder} = require('discord.js');
const {pets} = require('../database.js');
const {embed} = require('../embed.js');

const sleepCD = 1200000; //cooldown time in milliseconds

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sleep')
        .setDescription('Give your Disgotchi a rest!'),
    async execute(interaction){
        const userId  = interaction.user.id;
        const getPet = await pets.get(userId);
        getPet.energy = 100;
        getPet.cooldown = Date.now() + sleepCD;
        let result = "Pet is sleeping!";
        await pets.set(userId,getPet)
        let petEmbed = await embed(interaction);
        petEmbed.content = result;
        await interaction.reply(petEmbed);
    }
}
