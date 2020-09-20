import React from 'react';
import FoodStore from '../modules/Food';

export const Food = () => {
    return <div className="food" 
        style={{gridRowStart: FoodStore.food.x, gridColumnStart: FoodStore.food.y}}>
    </div>
}