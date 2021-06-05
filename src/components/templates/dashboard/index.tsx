import * as React from 'react';
import { Provider } from 'react-redux'
import store from '~stores/dashboard.store';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Main from '~commons/main';
import * as DashboardMenu from '~features/dashboardMenu';
import * as ATM_CDM from '~features.custom/ATM_CDM';
import * as ORGS from '~features.custom/ORGS';
import ReactDOM from "react-dom";
const createBrowserHistory = require("history").createBrowserHistory;

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

    const history = createBrowserHistory();

    return (
        <>
            <Provider store={store}>
                <Router >
                    <DashboardMenu.Element {...dashboardMenuProps} />
                    <Main.Element {...mainProps}>
                        <Switch>
                            <Route path="/orgs">
                                <ORGS.Element />
                            </Route>
                            <Route path="/atm-cdm">
                                <ATM_CDM.Element />
                            </Route>
                        </Switch>
                    </Main.Element>
                </Router>
            </Provider>,
        </>
    )
}

const dashboardMenuProps: DashboardMenu.Props = {
    $menu: {
        $links: [
            {
                text: 'ORGS',
                url: '/orgs',
            },
            {
                text: 'ATM/CDM',
                url: '/atm-cdm',
            },
        ]
    },
};