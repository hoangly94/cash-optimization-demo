import React, { useState } from 'react'
import Classnames from 'classnames'
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_INPUT } from '~stores/atmCdm/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import {getCurrentDate} from "@utils";
import { buttonProps, handlePopupClick, popupProps } from "./";

export const Element = () => {
  console.log('================creating button');
  const [creatingPopupStatus, setCreatingPopupStatus] = useState(true);
  const selectedItem = useSelector(state => state['atmCdmSearch'].selectedItem);
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
      tagType: Title.TagType.H3,
      text: 'Create'
    },
    isShown: creatingPopupStatus,
    setIsShown: setCreatingPopupStatus,
  }
  
  const inputWrapperProps: Block.Props = {
    flex: Base.Flex.BETWEEN,
    margin: Base.MarginBottom.PX_18,
  }
  
  const inputTitleProps: Title.Props = {
    width: Base.Width.PER_30,
  }
  
  const inputProps: Input.Props = {
    width: Base.Width.PER_70,
    onChange: ()=>{},
  }
  const atmCdmCodeOnChange = handleInputChange(dispatch, {atmCdmCode: ''});
  // const OnChange = handleInputChange(dispatch, {});
  return (
    <>
      <Button.Element {...buttonComponentProps}></Button.Element>
      <Popup.Element {...popupComponentProps}>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Ngày đăng ký' {...inputTitleProps}/>
          <Input.Element placeholder='Ngày đăng ký' value={getCurrentDate()} isDisabled={true} {...inputProps}/>
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Mã DV' {...inputTitleProps}/>
          <Input.Element placeholder='Mã DV' value={selectedItem.data.atmCdmCode} {...inputProps} onChange={atmCdmCodeOnChange}/>
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Tên DV' {...inputTitleProps}/>
          <Input.Element placeholder='Tên DV' value={selectedItem.data.atmCdmName} {...inputProps}/>
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Địa chỉ DV' {...inputTitleProps}/>
          <Input.Element placeholder='Địa chỉ DV' value={selectedItem.data.atmCdmName} {...inputProps}/>
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Tên cụm' {...inputTitleProps}/>
          <Input.Element placeholder='Tên cụm' value={selectedItem.data.areaName} {...inputProps}/>
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Tên DVQL' {...inputTitleProps}/>
          <Input.Element placeholder='Tên DVQL' value={selectedItem.data.createddate} {...inputProps}/>
        </Block.Element>
        <Block.Element {...inputWrapperProps}>
          <Title.Element text='Khoảng cách đến DVQL' {...inputTitleProps}/>
          <Input.Element placeholder='Khoảng cách đến DVQL' value={selectedItem.data.createddate} {...inputProps}/>
        </Block.Element>
      </Popup.Element>
    </>
  )
}

const handleInputChange= (dispatch, newData) => (e) => 
{
  console.log(e);
  // dispatch({ type: CHANGE_INPUT, newData })
}

export default Element;
Element.displayName = 'Actions_Button'
