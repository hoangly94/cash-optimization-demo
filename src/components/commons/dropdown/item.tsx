import * as React from 'react'
import Classnames from 'classnames'
import * as Block from "~commons/block";
import * as Link from "~commons/link";
import * as Base from '~/_settings';
import styles from './_styles.css';

export enum Type {
  DEFAULT = 'dropdown-item',
}

export type Props = Base.Props & {
  type?: Type,
  $children?: Link.Props,
  value?: string | number,
  active?: boolean,
  onClick?: React.MouseEventHandler,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $children,
    active = false,
  } = props;

  //create props
  const blockWrapperProps = {
    ...props,
    classNames: Classnames(
      styles[type],
    ),
  };

  const childrenProps = {
    ...$children,
  };

  return (
    <Block.Element {...blockWrapperProps}>
      <Link.Element {...childrenProps} />
    </Block.Element>
  )
}

Element.displayName = 'Option'