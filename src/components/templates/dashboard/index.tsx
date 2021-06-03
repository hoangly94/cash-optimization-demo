import * as React from 'react';
import { Provider } from 'react-redux'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Main from '~commons/main';
import store from '~stores/dashboard.store';
import * as DashboardMenu from '~features/dashboardMenu';
import * as ATM_CDM from '~features.custom/ATM_CDM';

export type Props = {
}

export const Element = (props: Props) => {
    const {
    } = props;

    const mainProps: Main.Props = {
        // style: {
        //     backgroundColor: '#f8f8f8',
        //     minHeight: '100%',
        // },
    };

    const atmCdmProps: ATM_CDM.Props = {
    };

    return (
        <>
            <Provider store={store}>
                <DashboardMenu.Element {...dashboardMenuProps} />
                <Main.Element {...mainProps}>
                    <ATM_CDM.Element {...atmCdmProps} />
                </Main.Element>
            </Provider>,
        </>
    )
}

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