import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css'
import * as Block from "~atoms/block";
import * as Base from '~/_settings';

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
  type?: string,
  size?: Size,
  // onClick?: React.MouseEventHandler,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  placeholder?: string,
  value?: string,
  isDisabled?: boolean,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    onChange,
    placeholder = '',
    value = '',
    isDisabled = false,
  } = props

  //create props
  const componentProps = {
    padding:Base.Padding.PX_8,
    ...Base.mapProps(props, styles, [type, size]),
    // onClick:onClick,
    onChange:onChange,
    placeholder: placeholder,
    value: value,
    disabled: isDisabled,
  };

  return (
    <input {...componentProps} />
  )
}

Element.displayName = 'Input'
