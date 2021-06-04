import React, { useState } from 'react'
import Classnames from 'classnames'
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
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
  }

  return (
    <>
      <Button.Element {...buttonComponentProps}></Button.Element>
      <Popup.Element {...popupComponentProps}>
        <Button.Element {...buttonComponentProps}></Button.Element>
      </Popup.Element>
    </>
  )
}

export default Element;
Element.displayName = 'Actions_Button'
