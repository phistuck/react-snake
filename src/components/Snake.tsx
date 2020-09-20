import React from 'react';
import SnakeStore from '../modules/Snake';
import {equalPositions, Coordinates} from '../modules/Game';

export const Snake = () => {
    return (
        <>
        {
            SnakeStore.body.map(({x, y}: Coordinates) => {
                let partClass = 'snake';

                if (equalPositions(SnakeStore.head, {x, y})) {
                    partClass += ' head';
                }
                return <div className={partClass} style={{gridRowStart: x, gridColumnStart: y}}></div>
            })
        }
        </>
    )
}