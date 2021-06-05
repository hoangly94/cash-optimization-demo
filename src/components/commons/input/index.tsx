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
export enum ValueType {
  NUMBER = 'number',
  PASSWORD = 'password',
}

export type Props = Base.Props & {
  type?: string,
  size?: Size,
  // onClick?: React.MouseEventHandler,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  placeholder?: string,
  value?: string,
  isDisabled?: boolean,
  pattern?:string,
  valueType?: ValueType,
}

export const Element = (props: Props) => {
  const {
    type = "text",
    size = Size.M,
    onChange,
    placeholder = '',
    value,
    isDisabled = false,
    refs,
    pattern,
    valueType,
  } = props

  const disabled = isDisabled ? 'disabled' : '';

  const valueProp = value ? {value:value}: {}
  const onChangeProp = onChange ? {onChange:onChange}: {}
  const handleKeyPress = valueType === ValueType.NUMBER ? {onKeyPress: validateNumber} : null;
  //create props
  const componentProps = {
    type: type,
    padding:Base.Padding.PX_8,
    ...Base.mapProps(props, styles, ['input',size, disabled]),
    // onClick:onClick,
    ...onChangeProp,
    placeholder: placeholder,
    ...valueProp,
    disabled: isDisabled,
    ref:refs,
    pattern: pattern,
    ...handleKeyPress,
  };

  return (
    <input {...componentProps} />
  )
}

const validateNumber=(e)=>{
  console.log('+++++++++++');
  console.log(e.key);
  // const regex = /^[0-9\b]+$/;
  // console.log(regex.test(e.target.value));
  if(isNaN(e.key))
    e.preventDefault();
}

Element.displayName = 'Input'
