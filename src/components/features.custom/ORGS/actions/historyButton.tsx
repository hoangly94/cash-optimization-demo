import React, { useState } from 'react'
import Classnames from 'classnames'
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Title from "~commons/title";
import * as Popup from "./historyPopup";
import { buttonProps, handlePopupClick, popupProps } from ".";

export const Element = () => {
  const [creatingPopupStatus, setCreatingPopupStatus] = useState(false);

  const buttonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'History',
    backgroundColor: Base.BackgroundColor.TIGERLILY,
    onClick: handlePopupClick(creatingPopupStatus, setCreatingPopupStatus),
  }

  const popupComponentProps: Popup.Props = {
    ...popupProps,
    isShown: creatingPopupStatus,
    setIsShown: setCreatingPopupStatus,
    $title:{
      tagType: Title.TagType.H2,
      text: 'HISTORY'
    },
    $content: {
      width: Base.Width.PX_1200,
    },
  }

  return (
    <>
      <Button.Element {...buttonComponentProps}></Button.Element>
      <Popup.Element {...popupComponentProps} />
    </>
  )
}

export default Element;
Element.displayName = 'Actions_Button'
