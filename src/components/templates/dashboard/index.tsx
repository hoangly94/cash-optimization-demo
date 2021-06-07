import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Main from '~commons/main';
import * as DashboardMenu from '~features/dashboardMenu';
import * as ATM_CDM from '~features/ATM_CDM';
import * as ORGS from '~features/ORGS';
import * as Test from '~features/test';
import { FETCH_AREAS, FETCH_CONFIG, FETCH_ORGS } from '_/stores/dashboardRoot/constants';

export type Props = {
}

export const Element = (props: Props) => {
    const {
    } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: FETCH_CONFIG });
        dispatch({ type: FETCH_AREAS });
        dispatch({ type: FETCH_ORGS });
    });

    const mainProps: Main.Props = {
        // style: {
        //     backgroundColor: '#f8f8f8',
        //     minHeight: '100%',
        // },
    };

    return (
        <Router >
            <DashboardMenu.Element {...dashboardMenuProps} />
            <Main.Element {...mainProps}>
                <Switch>
                    <Route exact path="/">
                    </Route>
                    <Route path="/orgs">
                        <ORGS.Element />
                    </Route>
                    <Route path="/atm-cdm">
                        <ATM_CDM.Element />
                    </Route>
                    <Route path="/test">
                        <Test.Element />
                    </Route>
                </Switch>
            </Main.Element>
        </Router>
    )
}

const dashboardMenuProps: DashboardMenu.Props = {
    $menu: {
        $links: [
            {
                text: 'ORGS',
                url: '/orgs',
                $icon: {
                    name: 'user',
                },
            },
            {
                text: 'ATM/CDM',
                url: '/atm-cdm',
                $icon: {
                    name: 'user',
                },
            },
            {
                text: 'Test',
                url: '/test',
                $icon: {
                    name: 'user',
                },
            },
        ]
    },
    style: {
        backgroundColor: '#1e3f96',
    }
};