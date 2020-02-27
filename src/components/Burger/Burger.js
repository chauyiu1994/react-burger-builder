import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    // Object.keys() return array of keys of the object
    // Object.values() return array of values of the object
    // Object.entries() return array of entries (array of arrays of length two) of the object
    // Array.map(values, index) 
    let transformedIngredients = Object.keys(props.ingredients)
        .flatMap(igKey => {
            // [...Array(2)] construct array of space 2
            // map(a, i) second arg = index
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        // // if not using flatMap, the result should be flattened
        // // using reduce since array is muttable
        // // arr = root array, el = current element where the loop reaches, [] = initial array
        // .reduce((arr, el) => {
        //     return arr.concat(el);
        // }, []);
        
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;