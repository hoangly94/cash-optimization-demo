import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect } from "react-router-dom";
import { FETCH_AREAS, FETCH_CONFIG, FETCH_FUNCTIONS, FETCH_ORGS, FETCH_PERS, FETCH_REGIONS } from '~/stores/dashboardRoot/constants';
import { AuthRoute, RoleRoute } from '@hocs';
import * as Base from '~/_settings';
import * as Login from '~features/login';
import * as Register from '~features/register';
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
import * as RouteManagementNormal from '~features/routeManagement/normal';
import * as RouteManagementUrgent from '~features/routeManagement/normal/urgent';
import * as RouteTrackingCar1 from '~features/routeTracking/car1';
import * as RouteTrackingCar2 from '~features/routeTracking/car2';
import * as Block from '~commons/block';
import * as Logo from "~commons/logo";
import * as Button from "~commons/button";
import styles from './_styles.css'
import Bars from '~svg/bars';
import { FETCH_ROLES, FETCH_USER } from '~/stores/auth/constants';
import { useCooke } from '~/hooks';
import classNames from 'classnames';

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
                        text='PTVC là xe chuyên dụng'
                        width={Base.Width.PER_50}
                        margin={Base.MarginRight.PX_5}
                        backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
                        color={Base.Color.WHITE}
                        borderRadius={Base.BorderRadius.PX_3}
                        href='/route-tracking/car1'
                    />
                    <Button.Element
                        text='PTVC KHÁC xe chuyên dụng'
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
                    <RoleRoute path="/route-tracking/car1" component={RouteTrackingCar1.Element} accessedRole='11B' roles={userSelector.viewList} />
                    <RoleRoute path="/route-tracking/car2" component={RouteTrackingCar2.Element} accessedRole='11B' roles={userSelector.viewList} />
                </Switch>
            </Block.Element>
        )
    }
    return (
        <>
            <DashboardMenu.Element {...dashboardMenuProps} roleCodeList={userSelector.viewList} />
            <Main.Element {...mainProps}>
                <Breadcrumbs.Element {...breadcrumbsProps} />
                <Switch>
                    <Route exact path="/">
                    </Route>

                    <RoleRoute path="/category/orgs" component={ORGS.Element} accessedRole='41' roles={userSelector.viewList} />
                    <RoleRoute path="/category/atm-cdm" component={ATM_CDM.Element} accessedRole='39' roles={userSelector.viewList} />
                    <RoleRoute path="/category/nhnn-tctd" component={NHNN_TCTD.Element} accessedRole='43' roles={userSelector.viewList} />
                    <RoleRoute path="/category/vehicle" component={Vehicle.Element} accessedRole='45' roles={userSelector.viewList} />
                    <RoleRoute path="/category/pers" component={Person.Element} accessedRole='49' roles={userSelector.viewList} />
                    <RoleRoute path="/category/title" component={Title.Element} accessedRole='51' roles={userSelector.viewList} />
                    <RoleRoute path="/category/currency" component={Currency.Element} accessedRole='47' roles={userSelector.viewList} />
                    <RoleRoute path="/category/priority" component={Priority.Element} accessedRole='53' roles={userSelector.viewList} />
                    <RoleRoute path="/category/region" component={Region.Element} accessedRole='55' roles={userSelector.viewList} />
                    <RoleRoute path="/category/area" component={Area.Element} accessedRole='57' roles={userSelector.viewList} />
                    <RoleRoute path="/category/function" component={Function.Element} accessedRole='59' roles={userSelector.viewList} />

                    <RoleRoute path="/authority/registration" component={Registration.Element} accessedRole='31A' roles={userSelector.viewList} />
                    <RoleRoute path="/authority/approval" component={Approval.Element} accessedRole='31B' roles={userSelector.viewList} />

                    <RoleRoute path="/user/change-password" component={ChangePassword.Element} accessedRole='61' roles={userSelector.viewList} />
                    <RoleRoute path="/user/assign-role" component={AssignRole.Element} accessedRole='62' roles={userSelector.viewList} />
                    <RoleRoute path="/user/reset-password" component={ResetPassword.Element} accessedRole='63' roles={userSelector.viewList} />

                    <RoleRoute path="/pyc/registration" component={PYCRegistration.Element} accessedRole='1A' roles={userSelector.viewList} />
                    <RoleRoute path="/pyc/approval" component={PYCApproval.Element} accessedRole='1B' roles={userSelector.viewList} />
                    <RoleRoute path="/route-management/normal" component={RouteManagementNormal.Element} accessedRole='11A' roles={userSelector.viewList} />
                    <RoleRoute path="/route-management/urgent" component={RouteManagementUrgent.Element} accessedRole='11B' roles={userSelector.viewList} />
                    <RoleRoute path="/route-tracking/car1" component={RouteTrackingCar1.Element} accessedRole='11B' roles={userSelector.viewList} />
                    <RoleRoute path="/route-tracking/car2" component={RouteTrackingCar2.Element} accessedRole='11B' roles={userSelector.viewList} />
                </Switch>
            </Main.Element>
        </>
    )
}

const breadcrumbsMapper = {
    'authority': {
        _url: '',
        _name: 'Quản lý Ủy quyền',
        'registration': { _url: '/authority/registration', _name: 'Đăng ký Ủy quyền', },
        'approval': { _url: '/authority/approval', _name: 'Kiểm soát Ủy quyền', },
    },
    'pyc': {
        _url: '',
        _name: 'Quản lý PYC Điều Quỹ',
        'registration': { _url: '/pyc/registration', _name: 'Đăng ký', },
        'approval': { _url: '/pyc/approval', _name: 'Kiểm soát & Phê duyệt', },
    },
    'category': {
        _url: '',
        _name: 'Danh mục',
        'area': { _url: '/category/area', _name: 'Danh mục cụm', },
        'atm-cdm': { _url: '/category/atm-cdm', _name: 'Danh mục ATM/CDM', },
        'currency': { _url: '/category/currency', _name: 'Danh mục tiền tệ', },
        'function': { _url: '/category/function', _name: 'Danh mục chức năng', },
        'nhnn-tctd': { _url: '/category/nhnn-tctd', _name: 'Danh mục TCTD/NHNN', },
        'orgs': { _url: '/category/orgs', _name: 'Danh mục đơn vị', },
        'pers': { _url: '/category/pers', _name: 'Danh mục nhân viên', },
        'priority': { _url: '/category/priority', _name: 'Danh mục mức độ ưu tiên', },
        'region': { _url: '/category/region', _name: 'Danh mục vùng', },
        'title': { _url: '/category/title', _name: 'Danh mục chức danh nhân viên', },
        'vehicle': { _url: '/category/vehicle', _name: 'Danh mục xe', },
    },
    'user': {
        _url: '',
        _name: 'User',
        'change-password': { _url: '/user/change-password', _name: 'Đổi mật khẩu', },
        'assign-role': { _url: '/user/assign-role', _name: 'Cấp quyền', },
        'reset-password': { _url: '/user/reset-password', _name: 'Đặt lại mật khẩu', },
    },
    'route-management': {
        _url: '',
        _name: 'Quản lý Lộ trình',
        'normal': { _url: '/route-management/normal', _name: 'Lộ trình Bình thường', },
        'urgent': { _url: '/route-management/urgent', _name: 'Lộ trình Khẩn cấp', },
    },
    'route-tracking': {
        _url: '',
        _name: 'Theo dõi Lộ trình',
        'car1': { _url: '/route-tracking/car1', _name: 'PTVC là xe chuyên dùng', },
        'car2': { _url: '/route-tracking/car2', _name: 'PTVC KHÁC xe chuyên dùng', },
    },
}

const dashboardMenuProps: DashboardMenu.Props = {
    $menu: {
        $links: [
            {
                text: 'Quản lý Ủy quyền',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'Đăng ký Ủy quyền',
                        url: '/authority/registration',
                        accessedRole: '31A',
                    },
                    {
                        text: 'Kiểm soát Ủy quyền',
                        url: '/authority/approval',
                        accessedRole: '31B',
                    },
                ]
            },
            {
                text: 'Quản lý PYC Điều Quỹ',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'Đăng ký ',
                        url: '/pyc/registration',
                        accessedRole: '1A',
                    },
                    {
                        text: 'Kiểm soát & Phê duyệt',
                        url: '/pyc/approval',
                        accessedRole: '1B',
                    },
                ]
            },
            {
                text: 'Danh mục',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'Danh mục cụm',
                        url: '/category/area',
                        accessedRole: '57',
                    },
                    {
                        text: 'Danh mục ATM/CDM',
                        url: '/category/atm-cdm',
                        accessedRole: '39',
                    },
                    {
                        text: 'Danh mục tiền tệ',
                        url: '/category/currency',
                        accessedRole: '47',
                    },
                    {
                        text: 'Danh mục chức năng',
                        url: '/category/function',
                        accessedRole: '59',
                    },
                    {
                        text: 'Danh mục TCTD/NHNN',
                        url: '/category/nhnn-tctd',
                        accessedRole: '43',
                    },
                    {
                        text: 'Danh mục đơn vị',
                        url: '/category/orgs',
                        accessedRole: '41',
                    },
                    {
                        text: 'Danh mục nhân viên',
                        url: '/category/pers',
                        accessedRole: '49',
                    },
                    {
                        text: 'Danh mục mức độ ưu tiên',
                        url: '/category/priority',
                        accessedRole: '53',
                    },
                    {
                        text: 'Danh mục vùng',
                        url: '/category/region',
                        accessedRole: '55',
                    },
                    {
                        text: 'Danh mục chức danh nhân viên',
                        url: '/category/title',
                        accessedRole: '51',
                    },
                    {
                        text: 'Danh mục xe',
                        url: '/category/vehicle',
                        accessedRole: '45',
                    },
                ],
            },
            {
                text: 'User',
                $icon: {
                    name: 'user',
                },
                $subs: [
                    {
                        text: 'Change password',
                        url: '/user/change-password',
                        accessedRole: '61',
                    },
                    {
                        text: 'Assign role',
                        url: '/user/assign-role',
                        accessedRole: '62',
                    },
                    {
                        text: 'Reset password',
                        url: '/user/reset-password',
                        accessedRole: '63',
                    },
                ]
            },
            {
                text: 'Quản lý Lộ trình',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'Lộ trình Bình thường',
                        url: '/route-management/normal',
                        accessedRole: '11A',
                    },
                    {
                        text: 'Lộ trình Khẩn cấp',
                        url: '/route-management/urgent',
                        accessedRole: '11B',
                    },
                ]
            },
            {
                text: 'Theo dõi Lộ trình',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'PTVC là xe chuyên dùng',
                        url: '/route-tracking/car1',
                        accessedRole: '11A',
                    },
                    {
                        text: 'PTVC KHÁC xe chuyên dùng',
                        url: '/route-tracking/car2',
                        accessedRole: '11B',
                    },
                ]
            },
        ],
    },
    style: {
        backgroundColor: '#1e3f96',
    }
};
