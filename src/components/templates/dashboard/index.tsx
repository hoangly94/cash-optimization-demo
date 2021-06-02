import * as React from 'react';
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as ATM_CDM from '~features.custom/ATM_CDM';

export type Props = {
}

export const Element = (props: Props) => {
    const {
    } = props;

    const atmCdmProps: ATM_CDM.Props = {
        width: Base.Width.PX_1100,
    }

    return (
        <>
            <ATM_CDM.Element {...atmCdmProps}/>
        </>
    )
}