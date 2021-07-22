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
import * as DeletePopup from "./deletePopup";
import * as OrgsSearchingPopup from "./orgsSearchingPopup";
import * as HistoryPopup from "./historyPopup";
import { HANDLE_POPUP } from '~stores/_base/constants';
import { FETCH_HISTORY, REQUEST_QUERY, HANDLE_CONTINUE_ACTION, GET_PYC_EXCEL, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL } from '~stores/pyc/registration/constants';
import { useDispatch, useSelector } from 'react-redux';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: FETCH_HISTORY })
  }, []);
  const orgsSearchingPopupSelector = useSelector(state => state['pycRegistration'].orgsSearchingPopup);
  const userSelector = useSelector(state => state['auth'].user);
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
    backgroundColor: Base.BackgroundColor.RED,
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
              {...creatingButtonComponentProps}
              store={{
                action: {
                  type: HANDLE_POPUP,
                  keys: ['pycRegistration', 'create', 'isShown'],
                  value: true,
                  popupType: 1,
                }
              }}
              isDisabled={!userSelector.viewList.includes('5')}
            />
            <Button.Element
              {...editingButtonComponentProps}
              store={{
                isDisabledSelectorKeys: ['base', 'buttons', 'pycRegistration', 'edit'],
                action: {
                  type: HANDLE_POPUP,
                  keys: ['pycRegistration', 'edit', 'isShown'],
                  value: true,
                  popupType: 2,
                }
              }}
              isDisabled={!userSelector.viewList.includes('6')}
            />
            <Button.Element
              {...buttonProps}
              text={'Tìm ĐVĐQ'}
              backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
              store={{
                // isDisabledSelectorKeys: ['base', 'buttons', 'pycRegistration', 'orgsSearching'],
                action: {
                  type: HANDLE_POPUP,
                  keys: ['pycRegistration', 'orgsSearching', 'isShown'],
                  value: true,
                  popupType: 4,
                }
              }}
              isDisabled={!(userSelector.viewList.includes('7') && (orgsSearchingPopupSelector?.cashOptimizationStatus === 'Searching' 
              && orgsSearchingPopupSelector.orgsCode == userSelector.orgsCode)) }
            />
          </Block.Element>

          <Block.Element
            margin={Base.MarginTop.PX_18}
          >
            <Button.Element
              {...buttonProps}
              text={'View'}
              backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
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
            <Button.Element
              {...deleteButtonComponentProps}
              store={{
                isDisabledSelectorKeys: ['base', 'buttons', 'pycRegistration', 'detail'],
                action: {
                  type: HANDLE_POPUP,
                  keys: ['pycRegistration', 'delete', 'isShown'],
                  value: true,
                  popupType: 4,
                }
              }}
              isDisabled={!userSelector.viewList.includes('64')}
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
              onClick={()=>dispatch({type:GET_PYC_EXCEL})}
            />
          </Block.Element>
        </Block.Element>

      </Block.Element >
      <CreatingPopup.Element
        {...creatingPopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'create'],
        }}
        useEffect={{
          callback: () => dispatch({ type: REQUEST_CREATING_CANCEL }),
        }}
      />
      <EditingPopup.Element
        {...editingPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'EDIT'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'edit'],
        }}
        // useEffect={{
        //   callback: () => dispatch({ type: REQUEST_EDITING_CANCEL }),
        // }}
      />
      <DetailPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'VIEW'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'detail'],
        }}
      // useEffect={{
      //   callback: () => dispatch({ type: FETCH_HISTORY }),
      // }}
      />
      <DeletePopup.Element
        {...editingPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'DELETE'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'delete'],
        }}
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
      <OrgsSearchingPopup.Element
        {...historyPopupComponentProps}
        $title= {{
          tagType: Title.TagType.H2,
          text: 'Tìm ĐVĐQ'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'orgsSearching'],
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
