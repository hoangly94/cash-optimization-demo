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
        <svg
            viewBox="0 0 124 124" xmlns="http://www.w3.org/2000/svg"
            {...svgProps}
        >
            <path d="M112,6H12C5.4,6,0,11.4,0,18s5.4,12,12,12h100c6.6,0,12-5.4,12-12S118.6,6,112,6z" />
            <path d="M112,50H12C5.4,50,0,55.4,0,62c0,6.6,5.4,12,12,12h100c6.6,0,12-5.4,12-12C124,55.4,118.6,50,112,50z" />
            <path d="M112,94H12c-6.6,0-12,5.4-12,12s5.4,12,12,12h100c6.6,0,12-5.4,12-12S118.6,94,112,94z" />
        </svg>
    )
}

