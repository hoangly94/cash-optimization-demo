import React, { useState } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import { useDispatch, useSelector } from 'react-redux';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import CreatingButton from "./creatingButton";
import EditingButton from "./editingButton";
import HistoryButton from "./historyButton";
import CloseButton from "./closeButton";

export type Props = Base.Props;

export const Element = (props: Props) => {
  //create props
  const componentWrapperProps = {
    margin: Base.MarginTop.PX_18,
    flex: Base.Flex.START,
    alignItems: Base.AlignItems.STRETCH,
    ...props,
  };


  return (
    <Block.Element {...componentWrapperProps}>
      <CreatingButton/>
      <EditingButton/>
      <HistoryButton/>
      {/* <CloseButton/> */}
    </Block.Element >
  )
}

export const handlePopupClick = (state, setState: Function) => (e) => {
  e.stopPropagation();
  setState(!state);
}

export const popupProps: Popup.Props = {
  $content: {
    width: Base.Width.PX_800,
  },
}

export const buttonProps: Button.Props = {
  width: Base.Width.PX_150,
  color: Base.Color.WHITE,
  borderRadius: Base.BorderRadius.PX_3,
  height: Base.Height.PX_40,
  margin: Base.MarginRight.PX_8,
}


export const comboxProps = {
  width: Base.Width.PER_70,
}

Element.displayName = 'Actions'
