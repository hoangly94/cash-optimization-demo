import React, { useRef } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css'
import * as Base from '~/_settings';
import { useSelector } from 'react-redux';
import * as Block from '~commons/block';

export enum Type {
  SUCCESS = 'notification-success',
  ERROR = 'notification-error',
}

export enum Size {
  S1 = 's1',
  S = 's',
  M = 'm',
  L = 'l',
  L1 = 'l1',
}

export type Props = Base.Props & {
  type?: Type,
}

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.SUCCESS,
  } = props;

  //create props
  const componentProps = {
    classNames: Classnames(
      styles[type],
    ),
    ...props,
  };
  return (
    <Block.Element {...componentProps}>
      {type === Type.SUCCESS ? 'SUCCESS': 'ERROR'}
    </Block.Element>
  )
}

Element.displayName = 'Notification';
