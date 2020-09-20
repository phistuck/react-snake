
import {Coordinates} from './Game';
import {randomGridPosition, equalPositions} from './Game';

export class Food {
    food: Coordinates;

    constructor() {
        this.food = {x: 5, y: 5};
    }

    updateFood() {
        this.food = randomGridPosition();
    }

    reset() {
        this.food = {x: 5, y: 5};
    }

    getRandomFoodPosition(): Coordinates {
        let newFoodPosition: Coordinates | null = null;
        while (newFoodPosition == null || equalPositions(newFoodPosition, this.food)) {
            newFoodPosition = randomGridPosition();
        }
    
        return newFoodPosition;
    }
}

export default new Food()