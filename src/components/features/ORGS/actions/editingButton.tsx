import React, { useState } from 'react'
import Classnames from 'classnames'
import { useSelector } from 'react-redux';
import * as Base from '~/_settings';
import * as Title from "~commons/title";
import * as Button from "~commons/button";
import * as Popup from "./editingPopup";
import { buttonProps, handlePopupClick, popupProps } from ".";

export const Element = () => {
  const [creatingPopupStatus, setCreatingPopupStatus] = useState(false);
  const selectedItemSelector = useSelector(state => state['orgs'].selectedItem);

  const buttonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'Edit',
    isDisabled: !(selectedItemSelector.id) ,
    backgroundColor: Base.BackgroundColor.TIGERLILY,
    onClick: handlePopupClick(creatingPopupStatus, setCreatingPopupStatus),
  }

  const popupComponentProps: Popup.Props = {
    ...popupProps,
    $title:{
      tagType: Title.TagType.H2,
      text: 'EDIT'
    },
    isShown: creatingPopupStatus,
    setIsShown: setCreatingPopupStatus,
  }

  return (
    <>
      <Button.Element {...buttonComponentProps}></Button.Element>
      <Popup.Element {...popupComponentProps}/>
    </>
  )
}

export default Element;
Element.displayName = 'Actions_Button'
