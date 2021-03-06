import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect } from "react-router-dom";
import { FETCH_AREAS, FETCH_CONFIG, FETCH_FUNCTIONS, FETCH_ORGS, FETCH_PERS, FETCH_REGIONS } from '~/stores/dashboardRoot/constants';
import { AuthRoute, RoleRoute } from '@hocs';
import * as Base from '~/_settings';
import * as Login from '~features/login';
// import * as Register from '~features/register';
import * as FirstChangePassword from '~features/firstChangePassword';
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
import * as Approval from '~features/authority/registration/approval';
import * as PYCRegistration from '~features/pyc/registration';
import * as PYCApproval from '~features/pyc/registration/approval';
import * as ChangePassword from '~features/user/changePassword';
import * as AssignRole from '~features/user/assignRole';
import * as ResetPassword from '~features/user/resetPassword';
import * as Register from '~features/user/register';
import * as RouteManagementNormal from '~features/routeManagement/normal';
import * as RouteManagementUrgent from '~features/routeManagement/normal/urgent';
import * as RouteTrackingCar1 from '~features/routeTracking/car1';
import * as RouteTrackingCar2 from '~features/routeTracking/car2';
import * as ReportOrgs from '~features/report/orgs';
import * as ReportSpecial from '~features/report/special';
import NotificationMessages from '~features/notificationMessages';
import * as Block from '~commons/block';
import * as Logo from "~commons/logo";
import * as Button from "~commons/button";
import styles from './_styles.css'
import Bars from '~svg/bars';
import { FETCH_ROLES, FETCH_USER } from '~/stores/auth/constants';
import { useCooke } from '~/hooks';
import classNames from 'classnames';
import Profile from '~commons/profile';

export type Props = {
}

export const Element = (props: Props) => {
    const {
    } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        if (window.location.pathname != '/login') {
            dispatch({ type: FETCH_CONFIG });
            dispatch({ type: FETCH_USER });
            dispatch({ type: FETCH_ROLES });
        }
        else {
            document.cookie = `accessToken=;`;
        }
        // dispatch({ type: FETCH_AREAS });
        // dispatch({ type: FETCH_ORGS });
        // dispatch({ type: FETCH_FUNCTIONS });
        // dispatch({ type: FETCH_PERS });
        // dispatch({ type: FETCH_TITLE });
        // dispatch({ type: FETCH_REGIONS });
    }, []);
    const { cookie: accessToken } = useCooke('accessToken');
    const userSelector = useSelector(state => state['auth'].user);
    const isAuthenticated = userSelector.isAuthenticated || accessToken;
    return (
        <Router >
            <Notification.Element />
            <Switch>
                <Route path="/login" component={Login.Element} />
                <Route path="/register" component={Register.Element} />
                <Route path="/change-password" component={FirstChangePassword.Element} />
                {/* <Route path="/forgot-password" component={Forgot.Element} /> */}
                <AuthRoute path="/" component={DashboardComponent(userSelector)} isAuthenticated={isAuthenticated ? true : false} />
            </Switch>
        </Router>
    )
}

const DashboardComponent = (userSelector) => () => {

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

    const logoutProps = {
        classNames: classNames(
            styles['logout'],
        ),
        text: 'Logout',
        width: Base.Width.PX_80,
        borderRadius: Base.BorderRadius.PX_3,
        onClick: () => window.location.href = '/login',
        size: Button.Size.S,
    }

    if (window.screen.width < 768) {
        return (
            <Block.Element
                classNames={classNames(
                    styles['mobile'],
                )}
            >
                <Block.Element
                    classNames={classNames(
                        styles['mobile-header'],
                    )}
                >
                    <Logo.Element />
                    <Button.Element {...logoutProps} />
                </Block.Element>
                <Block.Element
                    flex={Base.Flex.BETWEEN}
                    style={{
                        marginTop: '48px',
                        padding: '18px',
                    }}

                >
                    <Button.Element
                        text='PTVC l?? xe chuy??n d???ng'
                        width={Base.Width.PER_50}
                        margin={Base.MarginRight.PX_5}
                        backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
                        color={Base.Color.WHITE}
                        borderRadius={Base.BorderRadius.PX_3}
                        href='/route-tracking/car1'
                    />
                    <Button.Element
                        text='PTVC KH??C xe chuy??n d???ng'
                        width={Base.Width.PER_50}
                        margin={Base.MarginLeft.PX_5}
                        backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
                        color={Base.Color.WHITE}
                        borderRadius={Base.BorderRadius.PX_3}
                        href='/route-tracking/car2'
                    />
                </Block.Element>
                
                <Switch>
                    <Route exact path="/">
                    </Route>
                    <RoleRoute path="/route-tracking/car1" component={RouteTrackingCar1.Element} accessedRoles={['24', '25', '26', '27']} roles={userSelector.viewList} />
                    <RoleRoute path="/route-tracking/car2" component={RouteTrackingCar2.Element} accessedRoles={['28', '29', '30']} roles={userSelector.viewList} />
                </Switch>
            </Block.Element>
        )
    }
    return (
        <>
            <NotificationMessages/>
            <DashboardMenu.Element {...dashboardMenuProps} roleCodeList={userSelector.viewList} />
            <Main.Element {...mainProps}>
                <Breadcrumbs.Element {...breadcrumbsProps} />
                <Profile/>

                <Switch>
                    <Route exact path="/">
                    </Route>

                    <RoleRoute path="/category/orgs" component={ORGS.Element} accessedRoles={['41']} roles={userSelector.viewList} />
                    <RoleRoute path="/category/atm-cdm" component={ATM_CDM.Element} accessedRoles={['39']} roles={userSelector.viewList} />
                    <RoleRoute path="/category/nhnn-tctd" component={NHNN_TCTD.Element} accessedRoles={['43']} roles={userSelector.viewList} />
                    <RoleRoute path="/category/vehicle" component={Vehicle.Element} accessedRoles={['45']} roles={userSelector.viewList} />
                    <RoleRoute path="/category/pers" component={Person.Element} accessedRoles={['49']} roles={userSelector.viewList} />
                    <RoleRoute path="/category/title" component={Title.Element} accessedRoles={['51']} roles={userSelector.viewList} />
                    <RoleRoute path="/category/currency" component={Currency.Element} accessedRoles={['47']} roles={userSelector.viewList} />
                    <RoleRoute path="/category/priority" component={Priority.Element} accessedRoles={['53']} roles={userSelector.viewList} />
                    <RoleRoute path="/category/region" component={Region.Element} accessedRoles={['55']} roles={userSelector.viewList} />
                    <RoleRoute path="/category/area" component={Area.Element} accessedRoles={['57']} roles={userSelector.viewList} />
                    <RoleRoute path="/category/function" component={Function.Element} accessedRoles={['59']} roles={userSelector.viewList} />

                    <RoleRoute path="/authority/registration" component={Registration.Element} accessedRoles={['31A']} roles={userSelector.viewList} />
                    <RoleRoute path="/authority/approval" component={Approval.Element} accessedRoles={['31B']} roles={userSelector.viewList} />

                    <RoleRoute path="/user/change-password" component={ChangePassword.Element} accessedRoles={['61']} roles={userSelector.viewList} />
                    <RoleRoute path="/user/assign-role" component={AssignRole.Element} accessedRoles={['62']} roles={userSelector.viewList} />
                    <RoleRoute path="/user/reset-password" component={ResetPassword.Element} accessedRoles={['63']} roles={userSelector.viewList} />
                    <RoleRoute path="/user/register" component={Register.Element} accessedRoles={['63']} roles={userSelector.viewList} />

                    <RoleRoute path="/pyc/registration" component={PYCRegistration.Element} accessedRoles={['1A']} roles={userSelector.viewList} />
                    <RoleRoute path="/pyc/approval" component={PYCApproval.Element} accessedRoles={['1B']} roles={userSelector.viewList} />
                    <RoleRoute path="/route-management/normal" component={RouteManagementNormal.Element} accessedRoles={['11A']} roles={userSelector.viewList} />
                    <RoleRoute path="/route-management/urgent" component={RouteManagementUrgent.Element} accessedRoles={['11B']} roles={userSelector.viewList} />
                    <RoleRoute path="/route-tracking/car1" component={RouteTrackingCar1.Element} accessedRoles={['24', '25', '26', '27']} roles={userSelector.viewList} />
                    <RoleRoute path="/route-tracking/car2" component={RouteTrackingCar2.Element} accessedRoles={['28', '29', '30']} roles={userSelector.viewList} />
                    
                    <RoleRoute path="/report/orgs" component={ReportOrgs.Element} accessedRoles={['37']} roles={userSelector.viewList} />
                    <RoleRoute path="/report/special" component={ReportSpecial.Element} accessedRoles={['38']} roles={userSelector.viewList} />
                </Switch>
            </Main.Element>
        </>
    )
}

const breadcrumbsMapper = {
    'authority': {
        _url: '',
        _name: 'Qu???n l?? ???y quy???n',
        'registration': { _url: '/authority/registration', _name: '????ng k?? ???y quy???n', },
        'approval': { _url: '/authority/approval', _name: 'Ki???m so??t ???y quy???n', },
    },
    'pyc': {
        _url: '',
        _name: 'Qu???n l?? PYC ??i???u Qu???',
        'registration': { _url: '/pyc/registration', _name: '????ng k??', },
        'approval': { _url: '/pyc/approval', _name: 'Ki???m so??t & Ph?? duy???t', },
    },
    'route-management': {
        _url: '',
        _name: 'Qu???n l?? L??? tr??nh',
        'normal': { _url: '/route-management/normal', _name: 'L??? tr??nh B??nh th?????ng', },
        'urgent': { _url: '/route-management/urgent', _name: 'L??? tr??nh Kh???n c???p', },
    },
    'route-tracking': {
        _url: '',
        _name: 'Theo d??i L??? tr??nh',
        'car1': { _url: '/route-tracking/car1', _name: 'PTVC l?? xe chuy??n d??ng', },
        'car2': { _url: '/route-tracking/car2', _name: 'PTVC KH??C xe chuy??n d??ng', },
    },
    'category': {
        _url: '',
        _name: 'Danh m???c',
        'area': { _url: '/category/area', _name: 'Danh m???c c???m', },
        'atm-cdm': { _url: '/category/atm-cdm', _name: 'Danh m???c ATM/CDM', },
        'currency': { _url: '/category/currency', _name: 'Danh m???c ti???n t???', },
        'function': { _url: '/category/function', _name: 'Danh m???c ch???c n??ng', },
        'nhnn-tctd': { _url: '/category/nhnn-tctd', _name: 'Danh m???c TCTD/NHNN', },
        'orgs': { _url: '/category/orgs', _name: 'Danh m???c ????n v???', },
        'pers': { _url: '/category/pers', _name: 'Danh m???c nh??n vi??n', },
        'priority': { _url: '/category/priority', _name: 'Danh m???c m???c ????? ??u ti??n', },
        'region': { _url: '/category/region', _name: 'Danh m???c v??ng', },
        'title': { _url: '/category/title', _name: 'Danh m???c ch???c danh nh??n vi??n', },
        'vehicle': { _url: '/category/vehicle', _name: 'Danh m???c xe', },
    },
    'report': {
        _url: '',
        _name: 'B??o c??o KPP',
        'orgs': { _url: '/report/orgs', _name: 'BC S??? l???n ??i???u qu??? NV ??p t???i', },
        'special': { _url: '/report/special', _name: 'BC S??? theo d??i VC H??B', },
    },
    'user': {
        _url: '',
        _name: 'Ng?????i d??ng',
        'change-password': { _url: '/user/change-password', _name: '?????i m???t kh???u', },
        'assign-role': { _url: '/user/assign-role', _name: 'Ph??n quy???n', },
        'reset-password': { _url: '/user/reset-password', _name: '?????t l???i m???t kh???u', },
        'register': { _url: '/user/register', _name: '????ng k??', },
    },
}

const dashboardMenuProps: DashboardMenu.Props = {
    $menu: {
        $links: [
            {
                text: 'Qu???n l?? ???y quy???n',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: '????ng k?? ???y quy???n',
                        url: '/authority/registration',
                        accessedRoles: ['31A'],
                    },
                    {
                        text: 'Ki???m so??t ???y quy???n',
                        url: '/authority/approval',
                        accessedRoles: ['31B'],
                    },
                ]
            },
            {
                text: 'Qu???n l?? PYC ??i???u Qu???',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: '????ng k?? ',
                        url: '/pyc/registration',
                        accessedRoles: ['1A'],
                    },
                    {
                        text: 'Ki???m so??t & Ph?? duy???t',
                        url: '/pyc/approval',
                        accessedRoles: ['1B'],
                    },
                ]
            },
            {
                text: 'Qu???n l?? L??? tr??nh',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'L??? tr??nh B??nh th?????ng',
                        url: '/route-management/normal',
                        accessedRoles: ['11A'],
                    },
                    {
                        text: 'L??? tr??nh Kh???n c???p',
                        url: '/route-management/urgent',
                        accessedRoles: ['11B'],
                    },
                ]
            },
            {
                text: 'Theo d??i L??? tr??nh',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'PTVC l?? xe chuy??n d??ng',
                        url: '/route-tracking/car1',
                        accessedRoles: ['24', '25', '26', '27'],
                    },
                    {
                        text: 'PTVC KH??C xe chuy??n d??ng',
                        url: '/route-tracking/car2',
                        accessedRoles: ['28', '29', '30'],
                    },
                ]
            },
            {
                text: 'B??o c??o KPP',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'BC S??? l???n ??i???u qu??? NV ??p t???i',
                        url: '/report/orgs',
                        accessedRoles: ['37'],
                    },
                    {
                        text: 'BC S??? theo d??i VC H??B',
                        url: '/report/special',
                        accessedRoles: ['38'],
                    },
                ]
            },
            {
                text: 'Danh m???c',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'Danh m???c c???m',
                        url: '/category/area',
                        accessedRoles: ['57'],
                    },
                    {
                        text: 'Danh m???c ATM/CDM',
                        url: '/category/atm-cdm',
                        accessedRoles: ['39'],
                    },
                    {
                        text: 'Danh m???c ti???n t???',
                        url: '/category/currency',
                        accessedRoles: ['47'],
                    },
                    {
                        text: 'Danh m???c ch???c n??ng',
                        url: '/category/function',
                        accessedRoles: ['59'],
                    },
                    {
                        text: 'Danh m???c TCTD/NHNN',
                        url: '/category/nhnn-tctd',
                        accessedRoles: ['43'],
                    },
                    {
                        text: 'Danh m???c ????n v???',
                        url: '/category/orgs',
                        accessedRoles: ['41'],
                    },
                    {
                        text: 'Danh m???c nh??n vi??n',
                        url: '/category/pers',
                        accessedRoles: ['49'],
                    },
                    {
                        text: 'Danh m???c m???c ????? ??u ti??n',
                        url: '/category/priority',
                        accessedRoles: ['53'],
                    },
                    {
                        text: 'Danh m???c v??ng',
                        url: '/category/region',
                        accessedRoles: ['55'],
                    },
                    {
                        text: 'Danh m???c ch???c danh nh??n vi??n',
                        url: '/category/title',
                        accessedRoles: ['51'],
                    },
                    {
                        text: 'Danh m???c xe',
                        url: '/category/vehicle',
                        accessedRoles: ['45'],
                    },
                ],
            },
            {
                text: 'Ng?????i d??ng',
                $icon: {
                    name: 'user',
                },
                $subs: [
                    {
                        text: '?????i m???t kh???u',
                        url: '/user/change-password',
                        accessedRoles: ['61'],
                    },
                    {
                        text: 'Ph??n quy???n',
                        url: '/user/assign-role',
                        accessedRoles: ['62'],
                    },
                    {
                        text: '?????t l???i m???t kh???u',
                        url: '/user/reset-password',
                        accessedRoles: ['63'],
                    },
                    {
                        text: '????ng k??',
                        url: '/user/register',
                        accessedRoles: ['63'],
                    },
                ]
            },
        ],
    },
    style: {
        backgroundColor: '#1e3f96',
    }
};
