import * as React from 'react';
import * as Base from '~/_settings';
import styles from './_styles.css';
import { Props, Type, Size } from './';

export default (props: Props) => {
    const {
        type = Type.SOLID,
        size = Size.M,
        fill,
    } = props;

    //create props for rendering
    const svgProps = {
        ...Base.mapProps(props, styles, [size]),
        style: {
            fill: fill,
        }
    }

    return (
        <svg viewBox="0 0 341.333 341.333" xmlns="http://www.w3.org/2000/svg"
            {...svgProps}
        >
            <path d="M170.667,0C76.41,0,0,76.41,0,170.667s76.41,170.667,170.667,170.667s170.667-76.41,170.667-170.667S264.923,0,170.667,0z
			 M170.667,298.667c-70.692,0-128-57.308-128-128s57.308-128,128-128s128,57.308,128,128S241.359,298.667,170.667,298.667z"/>
        </svg>

    )
}

