import React, { useEffect, useRef } from 'react'
import styles from './_styles.css'
import * as Base from '~/_settings';
import { useDispatch, useSelector } from 'react-redux';
import { _Array } from '~/utils';

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
  valueType?: ValueType,
  name?: string,
  defaultValue?: string | number,
  store?: Store,
  // onClick?: React.MouseEventHandler,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  placeholder?: string,
  // value?: string,
  isDisabled?: boolean,
  pattern?: string,
  keyPressPattern?: string,
  max?: number,
  valueMapper?: Function,
}

type Store = {
  selectorKeys: string[],
  reducerType?: any,
  reducerKey?: any,
}

export const Element = (props: Props) => {
  const {
    type = "text",
    size = Size.M,
    name,
    onChange,
    placeholder = '',
    store,
    isDisabled = false,
    refs,
    defaultValue = '',
    pattern,
    keyPressPattern,
    max,
    valueType,
    valueMapper,
  } = props
  const dispatch = useDispatch();
  const value = store?.selectorKeys ? useSelector(state => _Array.getArrayValueByKey(state as [], store.selectorKeys)) : null;
  // useEffect(() => {
  //   if(store && defaultValue){
  //     const type = store.reducerType;
  //     const key = store.reducerKey ?? store.selectorKeys[store.selectorKeys.length - 1];
  //     dispatch({ type: type, data: { [key]: defaultValue } });
  //   }
  // },[]);
  const ref = refs ?? useRef(null);
  const disabled = isDisabled ? 'disabled' : '';
  const handleKeyPress = (e) => {
    if (valueType === ValueType.NUMBER)
      validateNumber(e);
    if (max)
      validateMax(e, max);
    if (keyPressPattern)
      validatePattern(e, keyPressPattern);
  }

  const handleChange = (e) => {
    if (store) {
      handleDispatchWhenInputChange(dispatch, store)(e);
    }
    if (onChange)
      onChange(e);
  }

  if (ref?.current) {
    (ref as any).current.value = value || defaultValue;
  }
  const valueProp = (() => {
    const newValue = (value || defaultValue);
    if (newValue && valueMapper)
      return valueMapper(newValue);
    return newValue;
  })();

  //create props
  const componentProps = {
    name: name,
    type: valueType === ValueType.PASSWORD ? 'password' : '',
    padding: Base.Padding.PX_8,
    ...Base.mapProps(props, styles, ['input', size, disabled]),
    // onClick:onClick,
    onChange: handleChange,
    placeholder: placeholder,
    disabled: isDisabled,
    ref: ref,
    value: valueProp,
    onKeyPress: handleKeyPress,
  };

  return <input {...componentProps} />;
}

const handleDispatchWhenInputChange = (dispatch, store: Store) => (e) => {
  const type = store.reducerType;
  const key = store.reducerKey ?? store.selectorKeys[store.selectorKeys.length - 1];
  dispatch({ type: type, data: { [key]: e.target.value } });
}

const validateNumber = (e) => {
  if (isNaN(e.key) || isNaN(parseFloat(e.key)))
    e.preventDefault();
}

const validateMax = (e, max) => {
  if (e.target.value.length >= max)
    e.preventDefault();
}
const validatePattern = (e, pattern) => {
  if (!(new RegExp(pattern)).test(e.key))
    e.preventDefault();
}

Element.displayName = 'Input';
