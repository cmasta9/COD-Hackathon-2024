const { pets } = require('./database.js');

//various maintenance functions before any command executes
async function statusCheck(userId,command,cooldown){
    let inPet = await pets.get(userId);
    if(inPet.happiness<=-5 && (inPet.hunger<=0 || inPet.thirst<=0 || inPet.energy<=-50)){
        await pets.delete(userId);
        return -1;
    }
    if(inPet.cleanliness <= 0){
        inPet.happiness -= 1;
        await pets.set(userId,inPet);
    }
    if(command != 'show' && cooldown <= 0){
        inPet.exp += 10; //only gives exp when pet is ready to perform an action
        await pets.set(userId,inPet);
    }
    if(inPet.exp >= 100){
        inPet.lvl+=1;
        inPet.exp -= 100;
        await pets.set(userId,inPet);
        return 2;
    }
    return 1;
}

module.exports = {statusCheck};
