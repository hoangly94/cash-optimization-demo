import * as React from 'react';
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as DashboardMenu from '~features/dashboardMenu';
import * as ATM_CDM from '~features.custom/ATM_CDM';

export type Props = {
}

export const Element = (props: Props) => {
    const {
    } = props;

    const dashboardMenuProps: DashboardMenu.Props = {
        $menu: {
            $links: [
                {
                    text: 'ATM/CDM',
                    url: '',
                },
                {
                    text: 'ORGS',
                    url: '',
                },
            ]
        },
    };

    const atmCdmProps: ATM_CDM.Props = {

    };

    return (
        <>
            <DashboardMenu.Element {...dashboardMenuProps} />
            <ATM_CDM.Element {...atmCdmProps} />
        </>
    )
}