import {EXPEND_RATE} from '../constants/game';
import {Coordinates} from './Game';

export class Snake {
    body: Coordinates[];

    constructor() {
        this.body = [{x: 10, y: 12}];  
    }

    get head(): Coordinates {
        return this.body[0];
    }

    expend() {
        for (let i = 0; i < EXPEND_RATE; i++) {
            this.body.push({...this.body[this.body.length - 1]});
        }
    }

    reset() {
        this.body = [{x: 10, y: 12}];  
    }

    updateSnakeBody(direction: Coordinates) {
        const snake = this.body;
        for (let i = snake.length - 2; i >= 0; i--) {
            snake[i + 1] = { ...snake[i] }
        }

        snake[0].x += direction.x;
        snake[0].y += direction.y;
    }
}

export default new Snake()