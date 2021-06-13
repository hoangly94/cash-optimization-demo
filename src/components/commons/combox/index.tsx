import React from 'react'
import Classnames from 'classnames'
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Text from "~commons/text";
import Caret from "~svg/caret";
import * as SVG from "~svg/index";
import * as Option from "./option";
import styles from './_styles.css';
import { useComponentClickOutside } from '@hocs';
import { _Array } from '@utils';
import { useDispatch, useSelector } from 'react-redux';

export enum Type {
  DEFAULT = 'combox',
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
  size?: Size,
  defaultText?: string,
  $selectorWrapper?: Block.Props & {
  }
  $optionsWrapper?: Block.Props & {
    $options?: Option.Props[],
  },
  store: Store,
  // disable?: boolean,
  isDisabled?: boolean,
}

type Store = {
  defaultOptions?: {
    text: string,
    value: any,
  }[],
  defaultSelectorKeys: string[],
  selectorKeys: string[],
  reducerType: any,
  reducerKeys: {
    text: string,
    value: string,
  },
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $selectorWrapper,
    $optionsWrapper,
    size = Size.M,
    store,
    isDisabled = false,
  } = props;

  const dispatch = useDispatch();
  const options: [] = store ? useSelector(state => _Array.getArrayValueByKey(state as [], store.selectorKeys)) : [];
  const defaultText = store ? useSelector(state => _Array.getArrayValueByKey(state as [], store.defaultSelectorKeys)) : '';
  const disabled = isDisabled ? 'disabled' : '';
  
  const {
    ref,
    clickData,
  } = useComponentClickOutside();

  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles[type],
    ),
    ...props,
  };

  const textProps: Text.Props = {
    text: (defaultText as any)?.text ?? 'Default Text',
  };

  const selectorWrapperProps: Block.Props = {
    classNames: Classnames(
      styles['combox-selector'],
      styles[disabled],
      styles[size],
    ),
    backgroundColor: Base.BackgroundColor.WHITE,
    padding: Base.Padding.PX_8,
    border: Base.Border.SOLID,
    refs: ref,
    ...$selectorWrapper,
  };

  const display = clickData.isOutside ? { display: 'none' } : { display: 'block' };
  const optionsWrapperProps: Block.Props = {
    classNames: Classnames(
      styles['combox-options'],
    ),
    backgroundColor: Base.BackgroundColor.WHITE,
    style: {
      ...display,
    },
    ...$optionsWrapper,
  };

  return (
    <Block.Element {...componentWrapperProps}>
      <Block.Element {...selectorWrapperProps}>
        <Text.Element {...textProps} />
        <Caret {...caretProps} />
      </Block.Element>
      <Block.Element {...optionsWrapperProps}>
        {store.defaultOptions?.map(mapFunctionsToDefaultItemElement(props, dispatch))}
        {options?.map(mapFunctionsToItemElement(props, dispatch))}
      </Block.Element>
    </Block.Element>
  )
}

const caretProps = {
  size: SVG.Size.S2,
  classNames: styles['caret'],
};

const mapFunctionsToDefaultItemElement = (props: Props, dispatch) => {
  const store = props.store;
  const type = store.reducerType;

  return (option, index: number) => {
    const child = {
      text: option.text,
      value: option.value,
    }

    const itemProps = {
      key: index,
      padding: Base.Padding.PX_8,
      ...(props.$optionsWrapper?.$options ? props.$optionsWrapper.$options[index] : {}),
      
      onClick: ()=>{
        dispatch({type: type, data: child})},
      ...child,
    }
    return <Option.Element {...itemProps} />
  }
}
const mapFunctionsToItemElement = (props: Props, dispatch) => {
  const store = props.store;
  const type = store.reducerType;
  const keys = store.reducerKeys;

  return (option, index: number) => {
    const child = {
      text: option[keys.text],
      value: option[keys.value],
    }

    const itemProps = {
      key: index,
      padding: Base.Padding.PX_8,
      ...(props.$optionsWrapper?.$options ? props.$optionsWrapper.$options[index] : {}),
      
      onClick: ()=>{
        console.log(child)
        console.log({type: type, data: child})
        dispatch({type: type, data: child})},
      ...child,
    }
    return <Option.Element {...itemProps} />
  }
}

  Element.displayName = 'Combox';
