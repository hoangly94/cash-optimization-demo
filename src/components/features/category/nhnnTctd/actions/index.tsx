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
import * as DetailPopup from "./detailPopup";
import * as MapPopup from "./mapPopup";
import { HANDLE_BUTTON, HANDLE_POPUP } from '~/stores/_base/constants';
import { FETCH_HISTORY, FETCH_HISTORY_DETAIL, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL, REQUEST_QUERY } from '~/stores/category/nhnnTctd/constants';
import { useDispatch } from 'react-redux';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: REQUEST_QUERY });
    dispatch({ type: HANDLE_BUTTON, keys: ['nhnnTctd', 'edit', 'isDisabled'], value: true });
    dispatch({ type: HANDLE_BUTTON, keys: ['nhnnTctd', 'history', 'isDisabled'], value: true });
  });
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
      <Pagination.Element
        store={{
          totalSelectorKeys: ['nhnnTctd', 'queryResult'],
          action: {
            type: REQUEST_QUERY,
          }
        }}
        style={{
          marginTop: '5px',
        }}
      />
      <Block.Element
        margin={Base.MarginTop.PX_18}
        lineHeight={Base.LineHeight.L1}
      >
        <Button.Element
          {...creatingButtonComponentProps}
          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['nhnnTctd', 'create', 'isShown'],
              value: true,
            }
          }}
          onClick={() => dispatch({ type: REQUEST_CREATING_CANCEL })}
        />
        <Button.Element
          {...editingButtonComponentProps}
          store={{
            isDisabledSelectorKeys: ['base', 'buttons', 'nhnnTctd', 'edit'],
            action: {
              type: HANDLE_POPUP,
              keys: ['nhnnTctd', 'edit', 'isShown'],
              value: true,
            }
          }}
          onClick={() => dispatch({ type: REQUEST_EDITING_CANCEL })}
        />
        <Button.Element
          {...historyButtonComponentProps}
          store={{
            isDisabledSelectorKeys: ['base', 'buttons', 'nhnnTctd', 'edit'],
            action: {
              type: HANDLE_POPUP,
              keys: ['nhnnTctd', 'history', 'isShown'],
              value: true,
            }
          }}
        />
      </Block.Element >
      <CreatingPopup.Element
        {...creatingPopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'nhnnTctd', 'create'],
        }}
      />
      <EditingPopup.Element
        {...editingPopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'nhnnTctd', 'edit'],
        }}
      />
      <HistoryPopup.Element
        {...historyPopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'nhnnTctd', 'history'],
        }}
        useEffect={{
          callback: () => dispatch({ type: FETCH_HISTORY }),
        }}
      />
      <DetailPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'Detail'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'nhnnTctd', 'historyDetail'],
        }}
        useEffect={{
          callback: () => dispatch({ type: FETCH_HISTORY_DETAIL }),
        }}
      />
      <MapPopup.Element
        store={{
          isShownSelectorKeys: ['base', 'popups', 'nhnnTctd', 'mapPopup'],
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
