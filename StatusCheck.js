const { pets } = require('./database.js');
async function check(userId){
    let inPet = await pets.get(userId);
    if(inPet.exp >= 100){
        inPet.lvl+=1;
    }else{
        inPet.exp+=15;
    }
    if(inPet.happiness<=-5 && (inPet.hunger<=0 || inPet.thirst<=0 || inPet.energy<=-50)){
        await pets.delete(userId);
        return -1;
    }
    return 1;
}

module.exports = {check};