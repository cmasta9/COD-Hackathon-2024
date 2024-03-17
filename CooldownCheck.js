const {pets} = require('./database.js');

//returns the number of seconds until time stored in cooldown
async function cooldownCheck(userID){
    const pet = await pets.get(userID);
    return (pet.cooldown - Date.now()) / 1000;
}

module.exports = {cooldownCheck};
