import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as Nav from "~commons/nav";

export enum Type {
  DEFAULT = 'dashboardMenu',
}

export type Props = Base.Props & {
  type?: Type,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
  } = props;
  
  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles[type],
    ),
    ...props,
  };
  
  const navigationProps = {
    
  }

  return (
    <Block.Element {...componentWrapperProps}>
      <Nav.Element {...navigationProps}>

      </Nav.Element>
    </Block.Element >
  )
}

