import {BOARD_SIZE} from '../constants/game';
import {Snake} from './Snake';

export type Coordinates = {x: number, y: number};

export let inputDirection: Coordinates = {x: 0, y: 0};
export let lastInputDirection: Coordinates = {x: 0, y: 0};

export const randomGridPosition = () => {
    return {
      x: Math.floor(Math.random() * BOARD_SIZE) + 1,
      y: Math.floor(Math.random() * BOARD_SIZE) + 1
    }
}

export const equalPositions = (p1: Coordinates, p2: Coordinates) => {
    return p1.x === p2.x && p1.y === p2.y;
}

export const getInputDirection = () => {
    lastInputDirection = inputDirection
    return inputDirection;
}

export const setInputDirection = (input: Coordinates) => {
    inputDirection = input;
}

export const isOver = (Snake: Snake): boolean => {
    return outside(Snake.head) // || Snake.body.slice(1).some((bodyPart) => equalPositions(Snake.head, bodyPart));
}

export const outside = (position: Coordinates) => {
    return position.x < 1 || position.x > BOARD_SIZE || position.y < 1 || position.y > BOARD_SIZE;
}