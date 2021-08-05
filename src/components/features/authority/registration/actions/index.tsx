import React from 'react'
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Title from "~commons/title";
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Pagination from "~commons/pagination";
import * as CreatingPopup from "./creatingPopup";
import * as EditingPopup from "./editingPopup";
import * as DetailPopup from "./detailPopup";
import { HANDLE_POPUP } from '~stores/_base/constants';
import { FETCH_HISTORY, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL, REQUEST_QUERY } from '~stores/authority/registration/constants';
import { useDispatch, useSelector } from 'react-redux';
import { HANDLE_CONTINUE_ACTION, HANDLE_DELETE_ACTION } from '~stores/authority/registration/constants';
import { REPORT_PRINT } from '_/stores/dashboardRoot/constants';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: FETCH_HISTORY })
  }, []);
  const userSelector = useSelector(state => state['auth'].user);
  const selectedItemSelector = useSelector(state => state['registration'].selectedItem);

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
  const printButtonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'Print',
    backgroundColor: Base.BackgroundColor.CLASSIC_BLUE,
  }
  const continueButtonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'Continue',
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

  const creatingPopupComponentProps: Popup.Props = {
    ...popupProps,
    $content: {
      width: Base.Width.PX_1200,
    },
    $title: {
      tagType: Title.TagType.H2,
      text: 'CREATE'
    },
  }
  const editingPopupComponentProps: Popup.Props = {
    ...popupProps,
    $content: {
      width: Base.Width.PX_1200,
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
          <Block.Element>
            <Button.Element
              {...creatingButtonComponentProps}
              store={{
                action: {
                  type: HANDLE_POPUP,
                  keys: ['registration', 'create', 'isShown'],
                  value: true,
                  popupType: 1,
                }
              }}
              isDisabled={!userSelector.viewList.includes('34')}
            />
            <Button.Element
              {...editingButtonComponentProps}
              store={{
                isDisabledSelectorKeys: ['base', 'buttons', 'registration', 'edit'],
                action: {
                  type: HANDLE_POPUP,
                  keys: ['registration', 'edit', 'isShown'],
                  value: true,
                  popupType: 2,
                }
              }}
              isDisabled={!userSelector.viewList.includes('35') || !['Originating_A', 'Rejected_A'].includes(selectedItemSelector?.authorityStatus)}
              onClick={() => dispatch({ type: REQUEST_EDITING_CANCEL })}
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
          </Block.Element>
          <Block.Element
            margin={Base.MarginTop.PX_18}
          >
            <Button.Element
              {...printButtonComponentProps}
              // store={{
              //   isDisabledSelectorKeys: ['base', 'buttons', 'registration', 'detail'],
              // }}
              onClick={() => dispatch({ type: REPORT_PRINT, reportName: 'authority', form: 'authority'})}
              isDisabled={selectedItemSelector.authorityStatus !== 'Approved_A'}
            />
            <Button.Element
              {...deleteButtonComponentProps}
              store={{
                isDisabledSelectorKeys: ['base', 'buttons', 'registration', 'detail'],
                action: { type: HANDLE_DELETE_ACTION }
              }}
              onClick={() => dispatch({ type: REQUEST_QUERY })}
            />
          </Block.Element>
        </Block.Element>

      </Block.Element >
      <CreatingPopup.Element
        {...creatingPopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'registration', 'create'],
        }}
      // useEffect={{
      //   callback: () => dispatch({ type: REQUEST_CREATING_CANCEL }),
      // }}
      />
      <EditingPopup.Element
        {...editingPopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'registration', 'edit'],
        }}
      // useEffect={{
      //   callback: () => dispatch({ type: REQUEST_EDITING_CANCEL }),
      // }}
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
