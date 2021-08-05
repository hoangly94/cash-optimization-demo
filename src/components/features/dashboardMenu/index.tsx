import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as Link from "~commons/link";
import * as Menu from "~commons/sideMenu";
import * as Logo from "~commons/logo";

export enum Type {
  DEFAULT = 'dashboardMenu',
}

export type Props = Base.Props & {
  type?: Type,
  $menu?: Menu.Props;
  roleCodeList?: string[],
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $menu,
    roleCodeList,
  } = props;

  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles[type],
    ),
    padding: Base.PaddingV.PX_8,
    bacgroundColor: Base.BackgroundColor.BLACK,
    ...props,
  };

  const menuProps = {
    ...$menu,
    roleCodeList,
  }

  const logoProps = {
  }

  const logoutProps = {
    classNames: Classnames(
      styles['logout'],
    ),
    text: 'Logout',
    onClick: handleLogoutClick,
  }

  return (
    <Block.Element {...componentWrapperProps}>
      <Logo.Element {...logoProps} />
      <Menu.Element {...menuProps} />
      <Button.Element {...logoutProps} />
    </Block.Element >
  )
}

const handleLogoutClick = () => {
  window.location.href = '/login'; 
  // new Promise(function (resolve, reject) {
  //   document.cookie = `accessToken=;`;
  //   resolve(document.cookie);
  // }).then(() => { window.location.href = '/login'; });
}

Element.displayName = 'DashboardMenu';