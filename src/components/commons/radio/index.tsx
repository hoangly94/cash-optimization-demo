import * as React from 'react';
import styles from './_styles.css'
import * as Base from '~/_settings';
import * as Block from '~commons/block';
import * as Svg from '~commons/svg';
import Circle from '~commons/svg/circle';
import CircleDotCenter from '~commons/svg/circleDotCenter';
import { useDispatch, useSelector } from 'react-redux';
import { _Array } from '_/utils';
import { HANDLE_BUTTON } from "~stores/_base/constants";

export enum Type {
  DEFAULT = 'radio',
}

export enum Size {
  S1 = 'size-s1',
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
  L1 = 'size-l1',
  L2 = 'size-l2',
}

export type Props = Block.Props & {
  type?: Type,
  size?: Size,
  onClick?: React.MouseEventHandler,
  name: string,
  text?: string,
  isDisabled?: boolean,
  href?: string,
  isLoading?: boolean,
  store?: Store,
  children?: React.ReactNode,
}

type Store = {
  selectorKeys: string[],
  action: {},
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    text,
    name,
    store,
    // onClick,
  } = props;

  const dispatch = useDispatch();
  // const isDisabled = store && store.isDisabledSelectorKeys ? useSelector(state => _Array.getArrayValueByKey(state as [], [...store.isDisabledSelectorKeys as string[], 'isDisabled'])) : false;
  const actived = store && store.selectorKeys ? useSelector(state => _Array.getArrayValueByKey(state as [], store.selectorKeys as string[])) : '';

  const onClick = store ? { onClick: handleClick(dispatch, actived, name, store) } : {};
  const componentProps = {
    ...props,
    ...onClick,
  }

  const circleProps = {
  };

  return (
    <Block.Element {...componentProps}>
      {actived === name ? <CircleDotCenter {...circleProps} /> : <Circle {...circleProps} />}
    </Block.Element>
  )
}

const handleClick = (dispatch, actived, name, store) => () => {
  if (actived !== name)
    dispatch({
      ...store.action,
      data: {
        ...store.action.data,
        name: name,
      }
    });
}

Element.displayName = 'Radio';












