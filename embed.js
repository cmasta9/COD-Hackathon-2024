const {AttachmentBuilder, EmbedBuilder} = require('discord.js');
const { pets } = require('./database.js');

async function embed(interaction){
    const userID = interaction.user.id;
    const pet = await pets.get(userID);

    // Choose picture
    let petPicturePath = `Assets/${pet.type}/`;
    let petPictureFile = '';

    if( pet.lvl >= 20 ){
        petPictureFile += 'adult';
    }else if( pet.lvl >= 10 ){
        petPictureFile += 'juv';
    }else{
        petPictureFile += 'baby';
    }

    petPictureFile += `${pet.color}.jpg`
    
    const petPicture = new AttachmentBuilder(petPicturePath + petPictureFile);

    let busy = Math.round((pet.cooldown - Date.now())/1000);
    if(busy < 0){
        busy = 0;
    }

    //Build embed
    const petEmbed = new EmbedBuilder()
	.setColor(0x1100EE)
	.setTitle(pet.nickname)
	.addFields(
        { name: "Exp", value: `${pet.exp}`, inline: true},
		{ name: 'Level', value: `${pet.lvl}`, inline: true},
        { name: "busy", value: `${busy} seconds`, inline: true},

		{ name: 'Fullness', value: `${pet.hunger}`, inline: true },
		{ name: 'Hydration', value: `${pet.thirst}`, inline: true },
        { name: 'Energy', value: `${pet.energy}`, inline: true},

        { name: 'Happiness', value: `${pet.happiness}`, inline: true},
        { name: "Cleanliness", value: `${pet.cleanliness}`, inline: true},

        { name: "Food", value: `${pet.food}`, inline: true},
        { name: "Water", value: `${pet.water}`, inline: true},
	)
	.setImage(`attachment://${petPictureFile}`);

    return {embeds: [ petEmbed ], files: [petPicture]};
}

module.exports = {embed};
