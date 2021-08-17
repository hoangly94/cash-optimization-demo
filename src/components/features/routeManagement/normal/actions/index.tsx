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
import * as SpecialPopup from "./specialPopup";
import * as BalanceSpecialPopup from "./balanceSpecialPopup ";
import * as OrgsSearchingPopup from "./orgsSearchingPopup";
import * as HistoryPopup from "./historyPopup";
import * as SearchVehiclePersPopup from "./searchVehiclePersPopup";
import * as VehiclePopup from "./vehiclePopup";
import * as PersPopup from "./persPopup";
import * as OrganizingPopup from "./organizingPopup";
import * as DestinationPointPopup from "./destinationPointPopup";
import * as MapPopup from "./mapPopup";
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
            totalSelectorKeys: ['routeManagement', 'queryResult'],
            action: {
              type: REQUEST_QUERY,
            }
          }}
          margin={Base.MarginBottom.PX_18}
        />
        <Block.Element
          margin={Base.MarginTop.PX_18}
        >
          <Block.Element>
            <Button.Element
              {...creatingButtonComponentProps}
              store={{
                action: {
                  type: HANDLE_POPUP,
                  keys: ['routeManagement', 'create', 'isShown'],
                  value: true,
                  popupType: 1,
                }
              }}
              isDisabled={!userSelector.viewList.includes('14')}
              onClick={()=>dispatch({type: REQUEST_CREATING_CANCEL})}
            />
            <Button.Element
              {...editingButtonComponentProps}
              store={{
                isDisabledSelectorKeys: ['base', 'buttons', 'routeManagement', 'edit'],
                action: {
                  type: HANDLE_POPUP,
                  keys: ['routeManagement', 'edit', 'isShown'],
                  value: true,
                  popupType: 2,
                }
              }}
              isDisabled={!(userSelector.viewList.includes('15') && viewSelector?.routeStatus === 'Originating_R')}
              onClick={()=>dispatch({type: REQUEST_EDITING_CANCEL})}
            />
            <Button.Element
              {...deleteButtonComponentProps}
              store={{
                isDisabledSelectorKeys: ['base', 'buttons', 'routeManagement', 'detail'],
                action: {
                  type: HANDLE_POPUP,
                  keys: ['routeManagement', 'delete', 'isShown'],
                  value: true,
                  popupType: 4,
                }
              }}
              isDisabled={!(userSelector.viewList.includes('15D') && (['Organizing', 'Organizing_R','Adding', 'Beginning', 'Pickingup_SEC', 'Pickingup_ESC', 'Pickingup_ATM'].includes(viewSelector?.routeStatus)))}
            />
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
              isDisabled={!(userSelector.viewList.includes('12'))}
            />
          </Block.Element>

          <Block.Element
            margin={Base.MarginTop.PX_18}
          >
            <Button.Element
              {...buttonProps}
              text={'Tìm PT_TP VẬN CHUYỂN'}
              backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}
              store={{
                isDisabledSelectorKeys: ['base', 'buttons', 'routeManagement', 'detail'],
                action: {
                  type: HANDLE_POPUP,
                  keys: ['routeManagement', 'searchVehiclePersPopup', 'isShown'],
                  value: true,
                  popupType: 4,
                }
              }}
              isDisabled={!(userSelector.viewList.includes('16') && (viewSelector?.routeStatus === 'Adding'
                && viewSelector.orgsCode == userSelector.orgsCode))}
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
              isDisabled={!(userSelector.viewList.includes('19') && (viewSelector?.routeStatus === 'Organizing'
                && viewSelector.orgsCode == userSelector.orgsCode))}
            />
            <Button.Element
              {...printButtonComponentProps}
              text={'Excel'}
              onClick={() => dispatch({ type: GET_EXCEL })}
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
              isDisabled={!(userSelector.viewList.includes('13'))}
            />
          </Block.Element>
        </Block.Element>

      </Block.Element >
      <CreatingPopup.Element
        {...creatingPopupComponentProps}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'create'],
        }}
        useEffect={{
          callback: () => {
            dispatch({ type: FETCH_PYC });
            dispatch({ type: REQUEST_CREATING_CANCEL });
          },
        }}
      />
      <EditingPopup.Element
        {...editingPopupComponentProps}
        popupType='normal'
        $title={{
          tagType: Title.TagType.H2,
          text: 'EDIT'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'edit'],
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
      <DeletePopup.Element
        {...editingPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'DELETE'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'delete'],
        }}
        useEffect={{
          callback: () => dispatch({ type: REQUEST_EDITING_CANCEL }),
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
      <DeletePopup.Element
        {...editingPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'DELETE'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'delete'],
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
        popupType='normal'
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

      <MapPopup.Element
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'mapPopup'],
        }}
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
      <BalanceSpecialPopup.Element
        {...historyPopupComponentProps}
        $title={{
          tagType: Title.TagType.H2,
          text: 'Số dư hàng đặc biệt'
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeManagement', 'balanceSpecial'],
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
