import React, { useState } from 'react'
import Classnames from 'classnames'
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import {getCurrentDate} from "@utils";
import { buttonProps, handlePopupClick, popupProps } from ".";
import * as Popup from "./creatingPopup";

export const Element = () => {
  console.log('================creating button');
  const [creatingPopupStatus, setCreatingPopupStatus] = useState(false);
  const dispatch = useDispatch();
  
  const buttonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'Create',
    backgroundColor: Base.BackgroundColor.GREEN,
    onClick: handlePopupClick(creatingPopupStatus, setCreatingPopupStatus),
  }

  const popupComponentProps: Popup.Props = {
    ...popupProps,
    $title:{
      tagType: Title.TagType.H2,
      text: 'CREATE'
    },
    isShown: creatingPopupStatus,
    setIsShown: setCreatingPopupStatus,
  }

  return (
    <>
      <Button.Element {...buttonComponentProps}/>
      <Popup.Element {...popupComponentProps}/>
    </>
  )
}

export default Element;
Element.displayName = 'Actions_Button'
