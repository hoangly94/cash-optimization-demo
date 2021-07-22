import React, { useRef, useState, useEffect } from 'react'
import Classnames from 'classnames'
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Text from "~commons/text";
import * as Input from "~commons/input";
import Caret from "~svg/caret";
import * as SVG from "~svg/index";
import * as Option from "./option";
import styles from './_styles.css';
import { useComponentClickOutside, useForceRender } from '@hooks';
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
  isInputDisabled?: boolean,
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
    isInputDisabled = false,
  } = props;
  const dispatch = useDispatch();
  const forceRender = useForceRender();
  const options: [] = store ? useSelector(state => _Array.getArrayValueByKey(state as [], store.selectorKeys)) : [];
  const defaultText = store ? useSelector(state => _Array.getArrayValueByKey(state as [], store.defaultSelectorKeys)) : '';
  const disabled = isDisabled ? 'disabled' : '';
  const [optionsFilter, setOptionsFilter] = useState('');
  const inputTextRef = useRef((defaultText as any)?.text);
  const inputPlaceholderRef = useRef((defaultText as any)?.text);
  useEffect(() => {
    if (inputTextRef.current || (defaultText as any)?.value || (defaultText as any)?.text === 'Tất cả') {
      inputTextRef.current = (defaultText as any)?.text;
      forceRender();
    }
  }, [defaultText?.text]);

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
    style: {
      whiteSpace: 'nowrap',
      paddingRight: '18px',
    }
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
    style: {
      padding: '0px',
    },
    ...$selectorWrapper,
  };

  const display = !disabled && !clickData.isOutside ? { display: 'block' } : { display: 'none' };
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
        {/* <Text.Element {...textProps} /> */}
        {/* {InputElement.current} */}
        <Input.Element
          isDisabled={isInputDisabled}
          defaultValue={inputTextRef.current}
          placeholder={inputPlaceholderRef.current}
          onChange={handleInputOnChange(setOptionsFilter, inputTextRef)}
          style={{
            whiteSpace: 'nowrap',
            paddingRight: '18px',
            border: '0px',
            width: '100%',
          }}
        />
        <Caret {...caretProps} />
      </Block.Element>
      <Block.Element {...optionsWrapperProps}>
        {store.defaultOptions?.map(mapFunctionsToDefaultItemElement(props, dispatch))}
        {options.filter(item =>
          !optionsFilter || ~(item[store.reducerKeys.text] as any)?.toLowerCase().search(optionsFilter.toLowerCase()))
          .map(mapFunctionsToItemElement(props, dispatch))}
      </Block.Element>
    </Block.Element>
  )
}

const caretProps = {
  size: SVG.Size.S2,
  classNames: styles['caret'],
};
const handleInputOnChange = (setOptionsFilter, inputTextRef) => (e) => {
  setOptionsFilter(e.target.value);
  inputTextRef.current = e.target.value;
}
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

      onClick: () => {
        if (!props.isDisabled)
          dispatch({ type: type, data: child })
      },
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

      onClick: () => {
        if (!props.isDisabled)
          dispatch({ type: type, data: child, keys: props.store?.defaultSelectorKeys?.slice(1) })
      },
      ...child,
    }
    return <Option.Element {...itemProps} />
  }
}

Element.displayName = 'Combox';
