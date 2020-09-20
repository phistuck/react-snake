import React from 'react';
import SnakeStore from '../elements/Snake';

export const Snake = () => {
    return (
        <>
        {
            SnakeStore.body.map(({x, y}: any) => {
                return <div className="snake" style={{gridRowStart: x, gridColumnStart: y}}></div>
            })
        }
        </>
    )
}