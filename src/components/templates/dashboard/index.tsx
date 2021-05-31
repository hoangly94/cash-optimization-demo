import * as React from 'react';
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from '~atoms/block';
import * as ORGSSection from '~organisms.custom/ORGSSection';


export type Props = {
    $ORGS: ORGSSection.Props,
}


export const Element = (props: Props) => {
    const {
        $ORGS,
    } = props;

    const ORGSProps = {
        ...$ORGS,
    };

    return (
        <>
            <ORGSSection.Element {...ORGSProps}/>
        </>
    )
}