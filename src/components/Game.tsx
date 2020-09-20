import React, {useRef, useState, useEffect} from 'react';
import {SPEED} from '../constants/game';

import SnakeStore from '../modules/Snake';
import FoodStore from '../modules/Food';

import {Snake} from './Snake';
import {Food} from './Food';
import {insults} from '../constants/game';

import {equalPositions, getInputDirection, lastInputDirection, setInputDirection, isOver, reset, setHighScore} from '../modules/Game';

import '../style/game.css';


export const Game = () => {
    const [move, setMove] = useState(0)
    
    const requestRef: any = useRef();
    const previousTimeRef: any = useRef();
    const isNoteDone: any = useRef();
    const currentNote: any = useRef(-1);
    
    const animate = async (time: number) => {
        requestRef.current = requestAnimationFrame(animate);
        const deltaTime: number = (time - previousTimeRef.current) / 1000;


        if (deltaTime < 1 / SPEED) 
            return;


        if (previousTimeRef?.current) {
            if ((SnakeStore.body.length -1) % 5 === 0 && !isNoteDone.current) {
                isNoteDone.current = true;
                ++currentNote.current;

            } else if ((SnakeStore.body.length -1) % 5 !== 0) {
                isNoteDone.current = false;
            }

            SnakeStore.updateSnakeBody(getInputDirection());

            if (equalPositions(FoodStore.food, SnakeStore.head)) {
                SnakeStore.expend();
                FoodStore.updateFood();
            }

            if (isOver(SnakeStore)) {                
                reset(SnakeStore, FoodStore);
                currentNote.current = -1;
            }
            
            setHighScore(SnakeStore);
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
        <>
        <div className="note">
            {insults[currentNote.current]}
        </div>
        <div className="score">
            <div className="current-score">
                Score: {SnakeStore.body.length - 1}
            </div>
            <div className="insult">
                Insult Snake
            </div>
            <div className="high-score">
                Highscore: {localStorage.getItem('highScore')}
            </div>
        </div>

        <div id="game-board">

            <Snake />
            <Food />
        </div>
        </>
    );
}
  