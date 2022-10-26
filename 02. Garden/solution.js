class Garden {
    constructor(spaceAvailable){
        this.spaceAvailable = spaceAvailable;
        this.plants = [];
        this.storage = [];

    }
    addPlant (plantName, spaceRequired){
        
        //	If there is not enough space in the garden for the new plant, throw an Error:
       //"Not enough space in the garden."
        if (spaceRequired > this.spaceAvailable){
            throw new Error("Not enough space in the garden.")
        }
        	// Otherwise, this function should add the plant with the properties:
            //  plantName, spaceRequired, ripe: default false, quantity: 
            //  default 0 to the plants array, reduce the space available 
            //  with the space required by the plant, and return:

        let currentPlant = {
            plantName,
            spaceRequired,
            rip: false,
            quantity: 0,
        }
        this.plants.push(currentPlant);
        this.spaceAvailable -= spaceRequired;

        //"The {plantName} has been successfully planted in the garden."
        return `The ${plantName} has been successfully planted in the garden.`
        
    }
    ripenPlant(plantName, quantity){

        // The quantity is of type number.
        // •	If the plant is not found, throw an Error:
        let currentPlant = this.plants.find(plant=>plant.plantName===plantName)

        // "There is no {plantName} in the garden."
        if (!currentPlant){

            throw new Error `The ${plantName} is already ripe.`
        }
        // •	If the plant is already ripe, throw an Error:
        // "The {plantName} is already ripe."
        if(currentPlant.ripe){
            throw new Error(`The ${plantName} is already ripe.`)
        }
        // •	If the received quantity is less than or equal to 0, throw an Error:
        // "The quantity cannot be zero or negative."
        if(quantity <= 0){
            throw new Error("The quantity cannot be zero or negative.")
        }
        // •	Otherwise, this function should set the ripe property of the particular 
        // plant to true and add the quantity to the quantity property of the plant. 
            currentPlant.ripe = true;
            currentPlant.quantity = quantity;
            // If the quantity passed as a parameter is 1, return:
            let returnMsg = quantity === 1 ?
            // "{quantity} {plantName} has successfully ripened."
            `${quantity} ${plantName} has successfully ripened.` :
            // If the quantity parameter is greater than 1, return:
            // "{quantity} {plantName}s have successfully ripened."
            `${quantity} ${plantName}s have successfully ripened.`

            return returnMsg;
        
    }
    harvestPlant(plantName) {

        // •If the plant is not found, throw an Error:
        // "There is no {plantName} in the garden."
        let currentPlant = this.plants.find(plant=>plant.plantName===plantName)
        if(!currentPlant){
        throw new Error `There is no ${plantName} in the garden.`
        }
        // •If the plant is not ripe, throw an Error:
        // "The {plantName} cannot be harvested before it is ripe."
        if(!currentPlant.ripe){
            `The ${plantName} cannot be harvested before it is ripe.`
        }
        // •Otherwise, this function should remove the plant from the plants array, 
        // add it to storage with properties plantName and quantity, 
        this.plants.filter(plant=>plant.plantName!==plantName)
        this.storage.push({
            plantName: currentPlant.plantName,
            quantity: currentPlant.quantity
        })
        this.spaceAvailable += currentPlant.spaceRequired;
        return `The ${plantName} has been successfully harvested.`
        // free up the total space that the plant required, and return:
        // "The {plantName} has been successfully harvested."
        
    }
    generateReport(){
        // This method should return the complete information about the garden: 
        let buff = ""; 
        // •	On the first line:
        // "The garden has { spaceAvailable } free space left."
        buff += `The garden has ${this.spaceAvailable} free space left. \n`
        // •	On the second line list all plants that are in the garden
        // ordered alphabetically by plant name ascending in the format:
        buff+= "Plants in the garden: ";
        this.plants.sort((a,b) => a.plantName.localeCompare(b.plantName))
        .forEach(plant=>buff+= `${plant.plantName}, `);
        buff = buff.substring(0,buff.length-2);
        // "Plants in the garden: {plant1Name}, {plant2Name}, {…}"
        // •	On the third line add:
        buff+=`\n`;
        // 	If there are no plants in the storage, print:
        // "Plants in storage: The storage is empty."
        // If there are plants in the storage list them in the format:
        // "Plants in storage: {plant1Name} ({plant1Quantity}), {plant2Name}, ({plant2Quantity}), {…}"
        if(!this.storage.length){
            buff += "Plants in storage: The storage is empty."
        }
        else{
            buff += "Plants in storage: "
            this.storage.forEach(plant=> buff+= `${plant.plantName} (${plant.quantity}), `)
        }
        buff = buff.substring(0,buff.length-2)

        return buff;
    }
}


const myGarden = new Garden(250)
console.log(myGarden.addPlant('apple', 20));
console.log(myGarden.addPlant('orange', 200));
console.log(myGarden.addPlant('raspberry', 10));
console.log(myGarden.ripenPlant('apple', 10));
console.log(myGarden.ripenPlant('orange', 1));
console.log(myGarden.harvestPlant('orange'));
console.log(myGarden.generateReport());



