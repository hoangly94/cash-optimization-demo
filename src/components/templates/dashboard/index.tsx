import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";
import { FETCH_AREAS, FETCH_CONFIG, FETCH_FUNCTIONS, FETCH_ORGS, FETCH_PERS, FETCH_REGIONS } from '_/stores/dashboardRoot/constants';
import * as Base from '~/_settings'; 
import * as Main from '~commons/main';
import * as Breadcrumbs from '~commons/breadcrumbs';
import * as Notification from '~commons/notification';
import * as DashboardMenu from '~features/dashboardMenu';
import * as ORGS from '~features/category/ORGS';
import * as ATM_CDM from '~features/category/ATM_CDM';
import * as NHNN_TCTD from '~features/category/nhnnTctd';
import * as Vehicle from '~features/category/vehicle';
import * as Person from '~features/category/person';
import * as Title from '~features/category/title';
import * as Currency from '~features/category/currency';
import * as Priority from '~features/category/priority';
import * as Region from '~features/category/region';
import * as Area from '~features/category/area';
import * as Function from '~features/category/function';
import * as Registration from '~features/authority/registration';

export type Props = {
}

export const Element = (props: Props) => {
    const {
    } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: FETCH_CONFIG });
        // dispatch({ type: FETCH_AREAS });
        // dispatch({ type: FETCH_ORGS });
        // dispatch({ type: FETCH_FUNCTIONS });
        // dispatch({ type: FETCH_PERS });
        // dispatch({ type: FETCH_TITLE });
        // dispatch({ type: FETCH_REGIONS });
    });

    const mainProps: Main.Props = {
        // style: {
        //     backgroundColor: '#f8f8f8',
        //     minHeight: '100%',
        // },
    };

    const breadcrumbsProps: Breadcrumbs.Props = {
        // style: {
        //     backgroundColor: '#f8f8f8',
        //     minHeight: '100%',
        // },
        mapper: breadcrumbsMapper,
    };

    return (
        <Router >
            <Notification.Element />
            <DashboardMenu.Element {...dashboardMenuProps} />
            <Main.Element {...mainProps}>
                <Breadcrumbs.Element {...breadcrumbsProps} />
                <Switch>
                    <Route exact path="/">
                    </Route>
                    <Route path="/category/orgs">
                        <ORGS.Element />
                    </Route>
                    <Route path="/category/atm-cdm">
                        <ATM_CDM.Element />
                    </Route>
                    <Route path="/category/nhnn-tctd">
                        <NHNN_TCTD.Element />
                    </Route>
                    <Route path="/category/vehicle">
                        <Vehicle.Element />
                    </Route>
                    <Route path="/category/person">
                        <Person.Element />
                    </Route>
                    <Route path="/category/title">
                        <Title.Element />
                    </Route>
                    <Route path="/category/currency">
                        <Currency.Element />
                    </Route>
                    <Route path="/category/priority">
                        <Priority.Element />
                    </Route>
                    <Route path="/category/region">
                        <Region.Element />
                    </Route>
                    <Route path="/category/area">
                        <Area.Element />
                    </Route>
                    <Route path="/category/function">
                        <Function.Element />
                    </Route>
                    <Route path="/authority/registration">
                        <Registration.Element />
                    </Route>
                </Switch>
            </Main.Element>
        </Router>
    )
}
const breadcrumbsMapper = {
    'category': {
        _url: '',
        _name: 'Categories',
        'orgs': { _url: '/category/orgs',_name: 'ORGS', },
        'atm-cdm': { _url: '/category/atm-cdm',_name: 'ATM/CDM', },
        'nhnn-tctd': { _url: '/category/nhnn-tctd',_name: 'NHNN/TCTD', },
        'vehicle': { _url: '/category/vehicle',_name: 'Vehicle', },
        'person': { _url: '/category/person',_name: 'Person', },
        'title': { _url: '/category/title',_name: 'Title', },
        'currency': { _url: '/category/currency',_name: 'Currency', },
        'priority': { _url: '/category/priority',_name: 'Priority', },
        'region': { _url: '/category/region',_name: 'Region', },
        'area': { _url: '/category/area',_name: 'Area', },
        'function': { _url: '/category/function',_name: 'Function', },
    },
    'authority': {
        _url: '',
        _name: 'Quản lý Ủy quyền',
        'registration': { _url: '/category/registration',_name: 'Đăng ký Ủy quyền', },
        'approval': { _url: '/category/approval',_name: 'Kiểm soát Ủy quyền', },
    },
}

const dashboardMenuProps: DashboardMenu.Props = {
    $menu: {
        $links: [
            {
                text: 'Categories',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'ORGS',
                        url: '/category/orgs',
                    },
                    {
                        text: 'ATM/CDM',
                        url: '/category/atm-cdm',
                    },
                    {
                        text: 'NHNN/TCTD',
                        url: '/category/nhnn-tctd',
                    },
                    {
                        text: 'Vehicle',
                        url: '/category/vehicle',
                    },
                    {
                        text: 'Pers',
                        url: '/category/person',
                    },
                    {
                        text: 'Title',
                        url: '/category/title',
                    },
                    {
                        text: 'Currency',
                        url: '/category/currency',
                    },
                    {
                        text: 'Priority',
                        url: '/category/priority',
                    },
                    {
                        text: 'Region',
                        url: '/category/region',
                    },
                    {
                        text: 'Area',
                        url: '/category/area',
                    },
                    {
                        text: 'Function',
                        url: '/category/function',
                    },
                ],
            },
            {
                text: 'Quản lý Ủy quyền',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'Đăng ký Ủy quyền',
                        url: '/authority/registration',
                    },
                    {
                        text: 'Kiểm soát Ủy quyền',
                        url: '/authority/approval',
                    },
                ]
            }
        ],
    },
    style: {
        backgroundColor: '#1e3f96',
    }
};