import React, { useState, useEffect, useRef } from 'react'
import Classnames from 'classnames'
import * as Base from '~/_settings';
import styles from './_styles.css';
import * as Block from '~commons/block';
import * as Title from '~commons/title';
import * as SVG from "~svg/index";

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
  onClick?: React.MouseEventHandler,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $background,
    $content,
    $title,
    isShown = true,
    setIsShown,
    children,
    onClick,
  } = props;

  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles[type],
    ),
    ...props,
    style: {
      display: isShown ? 'block' : 'none',
    },
  };

  const backgroundProps = {
    classNames: Classnames(
      styles['popup-background'],
    ),
    backgroundColor: Base.BackgroundColor.BLACK,
    onClick: handleClosePopupClick(isShown, setIsShown),
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

const handleClosePopupClick = (display: boolean, setDisplay?: Function) => (e) => {
  e.stopPropagation();
  if (setDisplay)
    setDisplay(!display);
}

const caretProps = {
  size: SVG.Size.S2,
  classNames: styles['caret'],
};

Element.displayName = 'Popup'
