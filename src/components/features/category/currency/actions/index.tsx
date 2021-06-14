import React from 'react'
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Title from "~commons/title";
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Pagination from "~commons/pagination";
import * as CreatingPopup from "./creatingPopup";
import * as EditingPopup from "./editingPopup";
import * as HistoryPopup from "./historyPopup";
import { HANDLE_POPUP } from '_/stores/_base/constants';
import { FETCH_HISTORY, REQUEST_QUERY } from '_/stores/category/currency/constants';
import { useDispatch } from 'react-redux';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const dispatch = useDispatch();
  React.useEffect(()=>{
    dispatch({ type: FETCH_HISTORY })
  },[]);
  //create props
  const componentWrapperProps = {
    margin: Base.MarginTop.PX_18,
    flex: Base.Flex.BETWEEN,
    alignItems: Base.AlignItems.STRETCH,
    ...props,
  };

  const creatingButtonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'Create',
    backgroundColor: Base.BackgroundColor.GREEN,
  }
  const editingButtonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'Edit',
    backgroundColor: Base.BackgroundColor.TIGERLILY,
  }
  const historyButtonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'History',
    backgroundColor: Base.BackgroundColor.CLASSIC_BLUE,
  }

  const creatingPopupComponentProps: Popup.Props = {
    ...popupProps,
    $title: {
      tagType: Title.TagType.H2,
      text: 'CREATE'
    },
  }
  const editingPopupComponentProps: Popup.Props = {
    ...popupProps,
    $title: {
      tagType: Title.TagType.H2,
      text: 'EDIT'
    },
  }
  const historyPopupComponentProps: Popup.Props = {
    ...popupProps,
    $content: {
      width: Base.Width.PX_1100,
    },
    $title: {
      tagType: Title.TagType.H2,
      text: 'HISTORY'
    },
  }

  return (
    <>
      <Block.Element {...componentWrapperProps}>
        <Pagination.Element
          store={{
            totalSelectorKeys: ['currency', 'queryResult'],
            action: {
              type: REQUEST_QUERY,
            }
          }}
          style={{
            marginTop: '5px',
          }}
        />
        <Block.Element>
          <Button.Element
            {...creatingButtonComponentProps}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['currency', 'create', 'isShown'],
                value: true,
              }
            }}
          />
          <Button.Element
            {...editingButtonComponentProps}
            store={{
              isDisabledSelectorKeys: ['base', 'buttons', 'currency', 'edit'],
              action: {
                type: HANDLE_POPUP,
                keys: ['currency', 'edit', 'isShown'],
                value: true,
              }
            }}
          />
          <Button.Element
            {...historyButtonComponentProps}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['currency', 'history', 'isShown'],
                value: true,
              }
            }}
          />
        </Block.Element>

      </Block.Element >
      <CreatingPopup.Element
        {...creatingPopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'currency', 'create'],
        }}
      />
      <EditingPopup.Element
        {...editingPopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'currency', 'edit'],
        }}
      />
      <HistoryPopup.Element
        {...historyPopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'currency', 'history'],
        }}
        useEffect={{
          callback: () => dispatch({ type: FETCH_HISTORY }),
        }}
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