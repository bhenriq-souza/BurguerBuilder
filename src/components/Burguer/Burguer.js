import React from 'react';
import style from './Burguer.css';
import BurguerIngredient from '../Burguer/BurguerIngredient/BurguerIngredient';

const burguer = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(
        key => {
            return (
                [...Array(props.ingredients[key])].map(
                    (_, i) => {
                        return <BurguerIngredient key={key + i} type={key} />;
                    }
                )
            );
        }
    )
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={style.Burguer}>
            <BurguerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurguerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burguer;

/**
 * Map()
 * O método map chama a função callback recebida por parâmetro para cada elemento do Array original, 
 * em ordem, e constrói um novo array com base nos retornos de cada chamada.
 * array.map(callback)
 * 
 * Reduce()
 * O método reduce() utiliza uma função sobre um acumulador (seria quase um sinônimo para array com 
 * elementos numéricos) e cada elemento do array (da esquerda para direita) ou de baixo pra cima, 
 * reduzindo-a a um único valor.
 * 
*/