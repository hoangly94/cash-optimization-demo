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
            viewBox="0 0 515.556 515.556"
            {...svgProps}
        >
            <path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm-32.222 383.899-103.338-103.338 45.564-45.564 57.774 57.774 122.218-122.218 45.564 45.564s-167.782 167.782-167.782 167.782z" />
        </svg>
    )
}

