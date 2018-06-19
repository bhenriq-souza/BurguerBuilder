import React from 'react';
import style from './InputElement.css';

const inputElement = (props) => {
    let input = null;
    const inputStyle = [style.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputStyle.push(style.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            input = <input 
                className={inputStyle.join(' ')} 
                {...props.elementConfig} 
                onChange={props.changed}
                value={props.value} />
            break;
        case ('textarea'):
            input = <textarea 
                className={inputStyle.join(' ')} 
                {...props.elementConfig} 
                onChange={props.changed}
                value={props.value} />
            break;
        case ('select'):
            input = (
                <select
                    className={inputStyle.join(' ')}
                    value={props.value}
                    onChange={props.changed} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value} >
                            {option.displayValue}
                        </option>
                    ))}
                </select>
                    );
            break;
        default: 
            input = <input 
                className={inputStyle.join(' ')} 
                {...props.elementConfig} 
                value={props.value} />
    }

    return(
        <div className={style.Input} >
            <label className={style.Label}> { props.label } </label>
            { input }
        </div>
    );
}

export default inputElement;