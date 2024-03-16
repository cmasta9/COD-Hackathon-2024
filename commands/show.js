const {SlashCommandBuilder} = require('discord.js');
const {embed} = require('../embed.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('show')
        .setDescription('Take a look at your Disgotchi!'),
    async execute(interaction){
        let petEmbed = await embed(interaction);
        await interaction.reply(petEmbed);
    }
}