import React from 'react'
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Title from "~commons/title";
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Pagination from "~commons/pagination";
import * as ValidatePopup from "./validatePopup";
import * as DetailPopup from "./detailPopup";
import { HANDLE_POPUP } from '~/stores/_base/constants';
import { FETCH_HISTORY, FETCH_HISTORY_DETAIL, REQUEST_QUERY } from '~/stores/category/area/constants';
import { useDispatch, useSelector } from 'react-redux';
import { REPORT_PRINT } from '_/stores/dashboardRoot/constants';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const dispatch = useDispatch();
  const userSelector = useSelector(state => state['auth'].user);
  const selectedItemSelector = useSelector(state => state['registration'].selectedItem);
  
  //create props
  const componentWrapperProps = {
    margin: Base.MarginTop.PX_18,
    flex: Base.Flex.BETWEEN,
    alignItems: Base.AlignItems.STRETCH,
    ...props,
  };

  const validateButtonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'Validate',
    backgroundColor: Base.BackgroundColor.GREEN,
  }
  const editingButtonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'Edit',
    backgroundColor: Base.BackgroundColor.TIGERLILY,
  }
  const deleteButtonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'Delete',
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
  }
  const detailButtonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'Detail',
    backgroundColor: Base.BackgroundColor.CLASSIC_BLUE,
  }

  const validatePopupComponentProps: Popup.Props = {
    ...popupProps,
    $content:{
      width:Base.Width.PX_1200,
    },
    $title: {
      tagType: Title.TagType.H2,
      text: 'VALIDATE'
    },
  }
  const editingPopupComponentProps: Popup.Props = {
    ...popupProps,
    $content:{
      width:Base.Width.PX_1200,
    },
    $title: {
      tagType: Title.TagType.H2,
      text: 'EDIT'
    },
  }
  const historyPopupComponentProps: Popup.Props = {
    ...popupProps,
    $content: {
      width: Base.Width.PX_1200,
    },
    $title: {
      tagType: Title.TagType.H2,
      text: 'DETAIL'
    },
  }

  return (
    <>
      <Block.Element {...componentWrapperProps}>
        <Pagination.Element
          store={{
            totalSelectorKeys: ['registration', 'queryResult'],
            action: {
              type: REQUEST_QUERY,
            }
          }}
          style={{
            marginTop: '5px',
          }}
        />
        <Block.Element>
          {/* <Button.Element
            {...validateButtonComponentProps}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['registration', 'create', 'isShown'],
                value: true,
                popupType: 1,
              }
            }}
          /> */}
          <Button.Element
            {...validateButtonComponentProps}
            store={{
              isDisabledSelectorKeys: ['base', 'buttons', 'registration', 'edit'],
              action: {
                type: HANDLE_POPUP,
                keys: ['registration', 'validate', 'isShown'],
                value: true,
                popupType: 2,
              }
            }}
            isDisabled={!userSelector.viewList.includes('36')}
          />
          <Button.Element
            {...detailButtonComponentProps}
            store={{
              isDisabledSelectorKeys: ['base', 'buttons', 'registration', 'detail'],
              action: {
                type: HANDLE_POPUP,
                keys: ['registration', 'detail', 'isShown'],
                value: true,
                popupType: 3,
              }
            }}
          />
          <Button.Element
            {...detailButtonComponentProps}
            text='Print'
            onClick={() => dispatch({ type: REPORT_PRINT, reportName: 'authority', form: 'authority'})}
            isDisabled={selectedItemSelector.authorityStatus !== 'Approved_A'}
          
          // store={{
          //   isDisabledSelectorKeys: ['base', 'buttons', 'registration', 'detail'],
          // }}
          // onClick={() => dispatch({ type: HANDLE_CONTINUE_ACTION })}

          />
          {/* <Button.Element
            {...deleteButtonComponentProps}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['registration', 'validate', 'isShown'],
                value: true,
              }
            }}
          /> */}
        </Block.Element>

      </Block.Element >
      <ValidatePopup.Element
        {...validatePopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'registration', 'validate'],
        }}
      />
      <DetailPopup.Element
        {...historyPopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'registration', 'detail'],
        }}
        // useEffect={{
        //   callback: () => dispatch({ type: FETCH_HISTORY }),
        // }}
      />
    </>
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
