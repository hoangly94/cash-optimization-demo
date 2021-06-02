import * as React from 'react';
import * as Base from '_/_settings';
import styles from './_styles.css';
import { Props, Type, Size, Direction } from './index';

export default (props: Props) => {
    const {
        size = Size.M,
        direction = Direction.DOWN,
        color,
    } = props;

    const rotateDegObj = {
        'up': '180',
        'right': '-90',
        'down': '0',
        'left': '90',
    };

    //create props for rendering
    const svgProps = {
        ...Base.mapProps(props, styles, [size]),
        style: {
            transform: `rotate(${rotateDegObj[direction]}deg)`,
            transformOrigin: '50% 50%',
            fill: color,
        }
    }

    return (
        <svg
            version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.847 451.847"
            {...svgProps}
        >
            <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
           c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
           c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>
        </svg>
    )
}
