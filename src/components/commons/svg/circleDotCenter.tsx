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
        <svg viewBox="0 0 510 510" xmlns="http://www.w3.org/2000/svg"
            {...svgProps}
        >
            <path d="M255,127.5c-71.4,0-127.5,56.1-127.5,127.5c0,71.4,56.1,127.5,127.5,127.5c71.4,0,127.5-56.1,127.5-127.5
			C382.5,183.6,326.4,127.5,255,127.5z M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z
			 M255,459c-112.2,0-204-91.8-204-204S142.8,51,255,51s204,91.8,204,204S367.2,459,255,459z"/>
        </svg>
    )
}

