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
import { HANDLE_POPUP } from '~stores/_base/constants';
import { FETCH_HISTORY, REQUEST_QUERY, HANDLE_CONTINUE_ACTION, HANDLE_DELETE_ACTION } from '~stores/pyc/registration/constants';
import { useDispatch, useSelector } from 'react-redux';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: FETCH_HISTORY })
  }, []);
  const orgsSearchingPopupSelector = useSelector(state => state['pycRegistration'].orgsSearchingPopup);
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
              isDisabled={!(orgsSearchingPopupSelector?.cashOptimizationStatus === 'Searching')}
            />
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
              {...printButtonComponentProps}
            // store={{
            //   isDisabledSelectorKeys: ['base', 'buttons', 'registration', 'detail'],
            // }}
            // onClick={() => dispatch({ type: HANDLE_CONTINUE_ACTION })}

            />
            {/* <Button.Element
              {...continueButtonComponentProps}
              store={{
                isDisabledSelectorKeys: ['base', 'buttons', 'pycRegistration', 'detail'],
                action: { type: HANDLE_CONTINUE_ACTION }
              }}
              onClick={() => dispatch({ type: REQUEST_QUERY })}
            /> */}
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
            />
          </Block.Element>
        </Block.Element>

      </Block.Element >
      <CreatingPopup.Element
        {...creatingPopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'create'],
        }}
      />
      <EditingPopup.Element
        {...editingPopupComponentProps}
        $title= {{
          tagType: Title.TagType.H2,
          text: 'EDIT'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'edit'],
        }}
      />
      <DetailPopup.Element
        {...historyPopupComponentProps}
        $title= {{
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
        $title= {{
          tagType: Title.TagType.H2,
          text: 'DELETE'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'delete'],
        }}
      />
      <OrgsSearchingPopup.Element
        {...historyPopupComponentProps}
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
