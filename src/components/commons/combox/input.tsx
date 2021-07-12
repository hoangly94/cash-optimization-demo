import React from 'react'
import Classnames from 'classnames'
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Text from "~commons/text";
import Caret from "~svg/caret";
import * as SVG from "~svg/index";
import * as Option from "./option";
import styles from './_styles.css';
import { useComponentClickOutside } from '@hooks';
import { _Array } from '@utils';
import { useDispatch, useSelector } from 'react-redux';

export enum Type {
  DEFAULT = 'input',
}

export enum Size {
  S1 = 'size-s1',
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
  L1 = 'size-l1',
}

export type Props = Base.Props & {
  type?: Type,
  isDisabled?: boolean,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    isDisabled = false,
  } = props;

  //create props
  const componentProps = {
    ...Base.mapProps(props, styles, ['input', type]),
  };

  
  return <input {...componentProps} />;
}

const caretProps = {
  size: SVG.Size.S2,
  classNames: styles['caret'],
};


Element.displayName = 'Input';
