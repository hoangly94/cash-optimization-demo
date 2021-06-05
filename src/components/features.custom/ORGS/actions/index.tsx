import React, { useState } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { State, SELECT_UNITNAME, SELECT_ATMCDMSTATUS, REQUEST_QUERY, REQUEST_RESET } from '~stores/atmCdm/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as DropDown from "~commons/dropdown";
import * as Popup from "~commons/popup";
import CreatingButton from "./creatingButton";
import EditingButton from "./editingButton";
import HistoryButton from "./historyButton";
import CloseButton from "./closeButton";

export type Props = Base.Props;

export const Element = (props: Props) => {
  console.log('=======================ATM actions');
  //create props
  const componentWrapperProps = {
    margin: Base.MarginTop.PX_18,
    flex: Base.Flex.START,
    alignItems: Base.AlignItems.STRETCH,
    ...props,
  };


  const [creatingPopupStatus, setCreatingPopupStatus] = useState(false);
  const [editingPopupStatus, setEditingPopupStatus] = useState(false);
  const [historyPopupStatus, setHistoryPopupStatus] = useState(false);

  const dispatch = useDispatch();

  const handleOptionClick = (type, filter) => () => {
    dispatch({ type: type, filter: filter })
  }

  const editButtonProps: Button.Props = {
    ...buttonProps,
    text: 'Edit',
    backgroundColor: Base.BackgroundColor.CLASSIC_BLUE,
    onClick: () => dispatch({ type: REQUEST_RESET }),
  }

  const historyButtonProps: Button.Props = {
    ...buttonProps,
    text: 'History',
    backgroundColor: Base.BackgroundColor.TIGERLILY,
    onClick: () => dispatch({ type: REQUEST_RESET }),
  }

  const closeButtonProps: Button.Props = {
    ...buttonProps,
    text: 'Close',
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
    onClick: () => dispatch({ type: REQUEST_RESET }),
  }

  const creatingPopupProps: Popup.Props = {
    ...popupProps,
    $content: {
      width: Base.Width.PX_800,
    },
    isShown: creatingPopupStatus,
    setIsShown: setCreatingPopupStatus,
  }

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
  // position: Base.Position.FIXED_CENTER,
  // padding: Base.Padding.PX_38,
  // backgroundColor: Base.BackgroundColor.WHITE,
  // height:
}

export const buttonProps: Button.Props = {
  // padding: Base.Padding.PX_38,
  width: Base.Width.PX_150,
  color: Base.Color.WHITE,
  borderRadius: Base.BorderRadius.PX_3,
  height: Base.Height.PX_40,
  margin: Base.MarginRight.PX_8,
}

Element.displayName = 'Actions'
