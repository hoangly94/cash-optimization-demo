import React,{} from 'react'
import Classnames from 'classnames'
import * as Base from '~/_settings';
import styles from './_styles.css';
import * as Block from '~commons/block';
import * as Title from '~commons/title';
import { useDispatch, useSelector } from 'react-redux';
import * as SVG from "~svg/index";
import { _Array } from '_/utils';
import { HANDLE_POPUP } from "~stores/_base/constants";

export enum Type {
  DEFAULT = 'popup',
}

export type Props = Base.Props & {
  type?: Type,
  $background?: Block.Props,
  $content?: Block.Props,
  $title?: Title.Props,
  children?: React.ReactNode,
  isShown?: boolean,
  setIsShown?: Function,
  store?: Store,
  onClick?: React.MouseEventHandler,
  useEffect?: UseEffect,
}

type Store = {
  isShownSelectorKeys?: string[],
  action?: {},
}
type UseEffect = {
  callback?: Function,
  // params:[] to run 1 time
  // not set: callback will call when popup
  params?: any[],
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $background,
    $content,
    $title,
    setIsShown,
    store,
    children,
    useEffect,
  } = props;
  const dispatch = useDispatch();
  const shown = store && store.isShownSelectorKeys ? useSelector(state => _Array.getArrayValueByKey(state as [], [...store.isShownSelectorKeys as string[], 'isShown'])) : false;
  
  React.useEffect(()=>{
    if((useEffect?.params || shown) && useEffect?.callback){
      useEffect.callback();
    }
  }, useEffect?.params ?? [shown]);

//create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles[type],
    ),
    ...props,
    style: {
      display: shown ? 'block' : 'none',
    },
  };

  const backgroundProps = {
    classNames: Classnames(
      styles['popup-background'],
    ),
    backgroundColor: Base.BackgroundColor.BLACK,
    onClick: handleClosePopupClick(dispatch, store),
    ...$background,
  };

  const contentProps = {
    classNames: Classnames(
      styles['popup-content'],
    ),
    padding: Base.Padding.PX_68,
    borderRadius: Base.BorderRadius.PX_8,
    backgroundColor: Base.BackgroundColor.WHITE,
    // onClick: handleDropdownOpenCloseClick(clickData, setClickData),
    ...$content,
  };

  const titleProps = {
    ...$title,
    textAlign: Base.TextAlign.CENTER,
  };

  return (
    <Block.Element {...componentWrapperProps}>
      <Block.Element {...backgroundProps}></Block.Element>
      <Block.Element {...contentProps}>
        {$title ? <Title.Element {...titleProps} /> : null}
        {children}
      </Block.Element>
    </Block.Element>
  )
}

const handleClosePopupClick = (dispatch, store?: Store) => (e) => {
  e.stopPropagation();
  if (store) {
    const keys = store.isShownSelectorKeys as [];
    const length = keys.length;
    dispatch({
      type: HANDLE_POPUP,
      keys: [keys[length - 2], keys[length - 1], 'isShown'],
      value: false
    });
  }
}

const caretProps = {
  size: SVG.Size.S2,
  classNames: styles['caret'],
};

Element.displayName = 'Popup'
