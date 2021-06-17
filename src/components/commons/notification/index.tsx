import React, { useRef } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css'
import * as Base from '~/_settings';
import { useDispatch, useSelector } from 'react-redux';
import * as Block from '~commons/block';
import * as Item from './item';

export enum Type {
  DEFAULT = 'notifications',
}

export enum Size {
  S1 = 's1',
  S = 's',
  M = 'm',
  L = 'l',
  L1 = 'l1',
}

export type Props = Block.Props & {
  type?: Type,
}

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
  } = props;
  // const ref = useRef([]);
  const selector = useSelector(state => state['base'].notis)
  //create props
  const componentProps = {
    classNames: Classnames(
      styles[type],
    ),
    ...props,
  };
  
  const itemElements = selector.map((item, index) => {
    const itemType = item.type == 'success' ? Item.Type.SUCCESS : Item.Type.ERROR;
    return <Item.Element key={index} type={itemType} text={item.text}/>;
  });

  return (
    <Block.Element {...componentProps}>
      {itemElements}
    </Block.Element>
  )
}

Element.displayName = 'Notification';
