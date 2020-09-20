import React, {useRef, useState, useEffect} from 'react';
import {SPEED} from '../constants/game';

import SnakeStore from '../elements/Snake';
import FoodStore from '../elements/Food';

import {Snake} from './Snake';
import {Food} from './Food';

import {equalPositions, getInputDirection, lastInputDirection, setInputDirection, isOver} from '../elements/Game';

import '../style/game.css';


export const Game = () => {
    const [move, setMove] = useState(0)
    
    const requestRef: any = useRef();
    const previousTimeRef: any = useRef();

    const animate = (time: number) => {
        requestRef.current = requestAnimationFrame(animate);
        const deltaTime: number = (time - previousTimeRef.current) / 1000;

        if (deltaTime < 1 / SPEED || isOver(SnakeStore)) 
            return;

        if (previousTimeRef?.current) {
            if (isOver(SnakeStore)) {
                alert('game over');
                return;
            }

            SnakeStore.updateSnakeBody(getInputDirection());

            if (equalPositions(FoodStore.food, SnakeStore.head)) {
                SnakeStore.expend();
                FoodStore.updateFood();
            }


            setMove(time);
        }
        
        previousTimeRef.current = time;
    }    

    useEffect(() => {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    });
    
    useEffect(() => {
        window.addEventListener('keydown', e => {
            const {x, y} = lastInputDirection;
            switch(e.key) {
                case 'ArrowUp':
                    if (x === 0)
                        setInputDirection({x: -1, y: 0});
                    break;
                case 'ArrowDown':
                    if (x === 0)
                        setInputDirection({x: 1, y: 0});
                    break;
                case 'ArrowLeft':
                    if (y === 0)
                        setInputDirection({x: 0, y: -1});
                    break;
                case 'ArrowRight':
                    if (y === 0)
                        setInputDirection({x: 0, y: 1});
                    break; 
                default: 
                    setInputDirection({x: 0, y: 0});
                break; 
            }
        })
    }, []);
    return (
        <div id="game-board">
            <Snake />
            <Food />
        </div>
    );
}
  