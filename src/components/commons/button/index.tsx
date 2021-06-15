import * as React from 'react';
import Classnames from 'classnames';
import styles from './_styles.css'
import { Link } from "react-router-dom";
import * as Base from '~/_settings';
import ThreeDotsLoader from '~commons/svg/threeDotsLoader';
import * as Svg from '~commons/svg';
import { useDispatch, useSelector } from 'react-redux';
import { _Array } from '_/utils';
import {HANDLE_BUTTON} from "~stores/_base/constants";

export enum Type {
  DEFAULT = 'button',
}

export enum Size {
  S1 = 'size-s1',
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
  L1 = 'size-l1',
  L2 = 'size-l2',
}

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  onClick?: React.MouseEventHandler,
  text?: string,
  isDisabled?: boolean,
  href?: string,
  isLoading?: boolean,
  store?: Store,
  children?: React.ReactNode,
}

type Store = {
  isLoadingSelectorKeys?: string[],
  isDisabledSelectorKeys?: string[],
  action?: {},
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    text,
    store,
    isDisabled = false,
    href = '',
  } = props;

  const dispatch = useDispatch();
  const isLoadingSelector = store && store.isLoadingSelectorKeys  ? useSelector(state => _Array.getArrayValueByKey(state as [], [...store.isLoadingSelectorKeys as string[], 'isLoading'])) : false;
  const isDisabledSelector = store && store.isDisabledSelectorKeys ? useSelector(state => _Array.getArrayValueByKey(state as [], [...store.isDisabledSelectorKeys as string[], 'isDisabled'])) : isDisabled;
  
  const newProps = {
    backgroundColor: Base.BackgroundColor.WHITE,
    border: Base.Border.SOLID,
    ...props,
  }

  const child = isLoadingSelector ? <ThreeDotsLoader size={Svg.Size.L2} fill='#fff' /> : text;
  const disabled = isDisabledSelector ? 'disabled' : '';

  //create props
  const buttonProps = {
    border:Base.Border.SOLID,
    onClick: onClickWithLoading(dispatch, props, isLoadingSelector as boolean, isDisabledSelector as boolean),
    ...Base.mapProps(newProps, styles, [type, size, disabled]),
  }

  const element = href === ''
    ? <button {...buttonProps}>{child}</button>
    : /^http.+$/.test(href)
      ? <a {...buttonProps}>{child}</a>
      : <Link  {...buttonProps} to={href}>{child}</Link>;

  return (
    element
  )
}

const onClickWithLoading = (dispatch, props: Props, isLoading: boolean, isDisabled: boolean) => (e) => {
  if (!isDisabled && !isLoading) {
    console.log(props.store?.action);
    if (props.store){
      dispatch(props.store.action);
    }
    if (props.onClick)
      props.onClick(e);
  }
}

Element.displayName = 'Button';












