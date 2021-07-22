import React from 'react'
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Title from "~commons/title";
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Pagination from "~commons/pagination";
import * as ValidationPopup from "./validationPopup";
import * as DetailPopup from "../actions/detailPopup";
import * as HistoryPopup from "../actions/historyPopup";
import { HANDLE_POPUP } from '~/stores/_base/constants';
import { FETCH_HISTORY, GET_PYC_EXCEL, REQUEST_QUERY } from '~stores/pyc/registration/constants';
import { useDispatch, useSelector } from 'react-redux';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: FETCH_HISTORY })
  }, []);

  const editingPopupSelector = useSelector(state => state['pycRegistration'].editingPopup);
  const userSelector = useSelector(state => state['auth'].user);

  //create props
  const componentWrapperProps = {
    margin: Base.MarginTop.PX_18,
    flex: Base.Flex.BETWEEN,
    alignItems: Base.AlignItems.STRETCH,
    ...props,
  };

  const validateButtonComponentProps: Button.Props = {
    ...buttonProps,
    backgroundColor: Base.BackgroundColor.GREEN,
  }
  const detailButtonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'Detail',
    backgroundColor: Base.BackgroundColor.CLASSIC_BLUE,
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
  const printButtonComponentProps: Button.Props = {
    ...buttonProps,
    backgroundColor: Base.BackgroundColor.CLASSIC_BLUE,
  }

  return (
    <>
      <Block.Element {...componentWrapperProps}>
        <Pagination.Element
          store={{
            totalSelectorKeys: ['pycRegistration', 'queryResult'],
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
              {...validateButtonComponentProps}
              text='CPD ĐVYCĐQ DUYỆT'
              store={{
                action: {
                  type: HANDLE_POPUP,
                  keys: ['pycRegistration', 'validate1', 'isShown'],
                  value: true,
                  popupType: 3,
                }
              }}
              isDisabled={
                !(
                  (userSelector.viewList.includes('8A') && ['Approving_1'].includes(editingPopupSelector.cashOptimizationStatus))
                  || (userSelector.viewList.includes('8B') && ['Canceling_1'].includes(editingPopupSelector.cashOptimizationStatus))
                )
              }
            />
            <Button.Element
              {...validateButtonComponentProps}
              text='THỦ QUỸ ĐVĐQ KS'
              store={{
                action: {
                  type: HANDLE_POPUP,
                  keys: ['pycRegistration', 'validate2', 'isShown'],
                  value: true,
                  popupType: 3,
                }
              }}
              isDisabled={
                !(
                  (userSelector.viewList.includes('9A') && ['Approving_2'].includes(editingPopupSelector.cashOptimizationStatus))
                  || (userSelector.viewList.includes('9B') && ['Canceling_2'].includes(editingPopupSelector.cashOptimizationStatus))
                )
              }
            />
            <Button.Element
              {...validateButtonComponentProps}
              text='CPD ĐVĐQ DUYỆT'
              store={{
                action: {
                  type: HANDLE_POPUP,
                  keys: ['pycRegistration', 'validate3', 'isShown'],
                  value: true,
                  popupType: 3,
                }
              }}
              isDisabled={
                !(
                  (userSelector.viewList.includes('10A') && ['Approving_3'].includes(editingPopupSelector.cashOptimizationStatus))
                  || (userSelector.viewList.includes('10B') && ['Canceling_3'].includes(editingPopupSelector.cashOptimizationStatus))
                )
              }
            />
          </Block.Element>
          <Block.Element
            margin={Base.MarginTop.PX_18}
          >
            <Button.Element
              {...detailButtonComponentProps}
              text={'View'}
              store={{
                isDisabledSelectorKeys: ['base', 'buttons', 'pycRegistration', 'detail'],
                action: {
                  type: HANDLE_POPUP,
                  keys: ['pycRegistration', 'detail', 'isShown'],
                  value: true,
                  popupType: 3,
                }
              }}
            />
            <Button.Element
              {...buttonProps}
              text={'History'}
              backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
              store={{
                isDisabledSelectorKeys: ['base', 'buttons', 'pycRegistration', 'detail'],
                action: {
                  type: HANDLE_POPUP,
                  keys: ['pycRegistration', 'history', 'isShown'],
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
              text={'In lệnh DC HĐB'}
            />
            <Button.Element
              {...printButtonComponentProps}
              text={'In giấy YC ĐQ'}
            />
            <Button.Element
              {...printButtonComponentProps}
              text={'Excel'}
              onClick={() => dispatch({ type: GET_PYC_EXCEL })}
            />
          </Block.Element>
        </Block.Element >
      </Block.Element >
      <ValidationPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'CPD ĐVYCĐQ DUYỆT'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'validate1'],
        }}
        popupType='validate1'
      />
      <ValidationPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'THỦ QUỸ ĐVĐQ KS'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'validate2'],
        }}
        popupType='validate2'
      />
      <ValidationPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'CPD ĐVĐQ DUYỆT'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'validate3'],
        }}
        popupType='validate3'
      />

      <ValidationPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'CPD ĐVYCĐQ DUYỆT'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'validateCancel1'],
        }}
        popupType='validateCancel1'
      />
      <ValidationPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'THỦ QUỸ ĐVĐQ KS'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'validateCancel2'],
        }}
        popupType='validateCancel2'
      />
      <ValidationPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'CPD ĐVĐQ DUYỆT'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'validateCancel3'],
        }}
        popupType='validateCancel3'
      />
      <DetailPopup.Element
        {...historyPopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'detail'],
        }}
      // popupType='detail'
      />
      <HistoryPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'HISTORY'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'history'],
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
