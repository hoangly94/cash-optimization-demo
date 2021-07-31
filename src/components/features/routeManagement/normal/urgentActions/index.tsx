import React from 'react'
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Title from "~commons/title";
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Pagination from "~commons/pagination";
import * as EditingPopup from "../actions/editingPopup";
import * as DetailPopup from "../actions/detailPopup";
import * as SpecialPopup from "../actions/specialPopup";
import * as OrgsSearchingPopup from "../actions/orgsSearchingPopup";
import * as HistoryPopup from "../actions/historyPopup";
import * as SearchVehiclePersPopup from "../actions/searchVehiclePersPopup";
import * as VehiclePopup from "../actions/vehiclePopup";
import * as PersPopup from "../actions/persPopup";
import * as OrganizingPopup from "../actions/organizingPopup";
import * as DestinationPointPopup from "../actions/destinationPointPopup";
import { HANDLE_POPUP } from '~stores/_base/constants';
import { FETCH_HISTORY, REQUEST_QUERY, REQUEST_CREATING_CANCEL, REQUEST_EDITING_CANCEL, GET_EXCEL, FETCH_PYC, REQUEST_SEACHVEHICLEPERS_CANCEL, REQUEST_ORGANIZING_CANCEL, REQUEST_ORGANIZING, REQUEST_ORGANIZING_DESTINATION_POINT_CANCEL } from '~stores/routeManagement/normal/constants';
import { useDispatch, useSelector } from 'react-redux';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: FETCH_HISTORY })
  }, []);
  const viewSelector = useSelector(state => state['routeManagement'].view);
  const userSelector = useSelector(state => state['auth'].user);
  //create props
  const componentWrapperProps = {
    margin: Base.MarginTop.PX_18,
    ...props,
  };

  const creatingButtonComponentProps: Button.Props = {
    ...buttonProps,
    text: 'ĐĂNG KÝ PYC BS',
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
      text: 'Đăng ký PYC bổ sung'
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
            totalSelectorKeys: ['routeManagement', 'queryResult'],
            action: {
              type: REQUEST_QUERY,
            }
          }}
          margin={Base.MarginBottom.PX_18}
        />
        <Block.Element>
          <Block.Element>
            <Button.Element
              {...creatingButtonComponentProps}
              store={{
                isDisabledSelectorKeys: ['base', 'buttons', 'routeManagement', 'edit'],
                action: {
                  type: HANDLE_POPUP,
                  keys: ['routeManagement', 'edit', 'isShown'],
                  value: true,
                  popupType: 1,
                }
              }}
              isDisabled={!userSelector.viewList.includes('6')}
              onClick={() => dispatch({ type: REQUEST_EDITING_CANCEL })}
            />
            <Button.Element
              {...buttonProps}
              text={'Sắp xếp lộ trình'}
              backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
              store={{
                isDisabledSelectorKeys: ['base', 'buttons', 'routeManagement', 'detail'],
                action: {
                  type: HANDLE_POPUP,
                  keys: ['routeManagement', 'organizingPopup', 'isShown'],
                  value: true,
                  popupType: 5,
                }
              }}
              isDisabled={!(userSelector.viewList.includes('7') && (viewSelector?.routeStatus === 'Organizing'
                && viewSelector.orgsCode == userSelector.orgsCode))}
            />
            <Button.Element
              {...printButtonComponentProps}
              text={'Excel'}
              onClick={() => dispatch({ type: GET_EXCEL })}
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
                isDisabledSelectorKeys: ['base', 'buttons', 'routeManagement', 'detail'],
                action: {
                  type: HANDLE_POPUP,
                  keys: ['routeManagement', 'detail', 'isShown'],
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
                isDisabledSelectorKeys: ['base', 'buttons', 'routeManagement', 'detail'],
                action: {
                  type: HANDLE_POPUP,
                  keys: ['routeManagement', 'history', 'isShown'],
                  value: true,
                  popupType: 3,
                }
              }}
            />
          </Block.Element>
        </Block.Element>

      </Block.Element >
      <EditingPopup.Element
        {...creatingPopupComponentProps}
        popupType='urgent'
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'edit'],
        }}
        useEffect={{
          callback: () => {
            dispatch({ type: FETCH_PYC });
          },
        }}
      />
      <DetailPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'VIEW'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'detail'],
        }}
      />
      <HistoryPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'HISTORY'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'history'],
        }}

        useEffect={{
          callback: () => dispatch({ type: FETCH_HISTORY }),
        }}
      />
      <OrgsSearchingPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'Tìm ĐVĐQ'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'orgsSearching'],
        }}
      />
      <SearchVehiclePersPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'Tìm Phương tiện và Thành phần vận chuyển'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'searchVehiclePersPopup'],
        }}
        useEffect={{
          callback: () => dispatch({ type: REQUEST_SEACHVEHICLEPERS_CANCEL }),
        }}
      />
      <VehiclePopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'Tìm Xe'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'vehiclePopup'],
        }}
      />

      <PersPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'Tìm Nhân viên'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'persPopup'],
        }}
      />

      <OrganizingPopup.Element
        {...historyPopupComponentProps}
        popupType='urgent'
        $title={{
          tagType: Title.TagType.H2,
          text: 'Sắp xếp lộ trình'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'organizingPopup'],
        }}
        useEffect={{
          callback: () => {
            dispatch({ type: REQUEST_ORGANIZING_CANCEL });
            dispatch({ type: REQUEST_ORGANIZING_DESTINATION_POINT_CANCEL })
            dispatch({ type: REQUEST_ORGANIZING });
          },
        }}
      />

      <DestinationPointPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'Tìm tên và địa chỉ điểm đến'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'destinationPointPopup'],
        }}
      // useEffect={{
      //   callback: () => {
      //     dispatch({ type: REQUEST_ORGANIZING_DESTINATION_POINT_CANCEL });
      //   },
      // }}
      />

      <SpecialPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'Hàng đặc biệt'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'special'],
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
  width: Base.Width.PX_200,
  color: Base.Color.WHITE,
  borderRadius: Base.BorderRadius.PX_3,
  height: Base.Height.PX_40,
  margin: Base.MarginRight.PX_8,
}

export const comboxProps = {
  width: Base.Width.PER_70,
}

Element.displayName = 'Actions'
