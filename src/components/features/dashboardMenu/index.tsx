import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as Link from "~commons/link";
import * as Menu from "~commons/sideMenu";

export enum Type {
  DEFAULT = 'dashboardMenu',
}

export type Props = Base.Props & {
  type?: Type,
  $menu?: Menu.Props;
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $menu,
  } = props;

  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles[type],
    ),
    padding: Base.PaddingV.PX_8,
    ...props,
  };

  const menuProps = {
    ...$menu,
  }

  return (
    <Block.Element {...componentWrapperProps}>
      <Menu.Element {...menuProps}/>
    </Block.Element >
  )
}
