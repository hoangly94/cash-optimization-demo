import React, { useEffect, useLayoutEffect } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Input from "~commons/input";
import * as Button from "~commons/button";
import * as Title from "~commons/title";
import * as MapPopup from "./mapPopup";
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_CODE_FILTER, FETCH_DATA, REQUEST_ROUTE_CONFIRM_1, REQUEST_ROUTE_CONFIRM_2, REQUEST_ROUTE_CONFIRM_2_KCD, REQUEST_ROUTE_CONFIRM_3, REQUEST_ROUTE_CONFIRM_3_KCD, REQUEST_ROUTE_START, REQUEST_ROUTE_START_KCD } from '~stores/routeTracking/constants';
import { HANDLE_POPUP } from '_/stores/_base/constants';
import moment from 'moment';

export type Props = Base.Props;
let dispatch;
export const Element = (props: Props) => {
  dispatch = useDispatch();
  const selector = useSelector(state => state['routeTracking']);
  const userSelector = useSelector(state => state['auth'].user);
  const type = 'component';

  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles[type],
    ),
    ...props,
  };
  return (
    <>
      <Block.Element {...componentWrapperProps}>
        <Block.Element
          margin={Base.MarginBottom.PX_18}
          flex={Base.Flex.START}
          alignItems={Base.AlignItems.STRETCH}
        >
          <Input.Element
            placeholder='Số Lộ trình'
            margin={Base.MarginRight.PX_18}
            width={Base.Width.PX_300}
            store={{
              selectorKeys: ['routeTracking', 'filters', 'id'],
              reducerType: CHANGE_CODE_FILTER,
            }}
            max={200}
          />

          <Button.Element
            text='Query'
            width={Base.Width.PX_150}
            color={Base.Color.WHITE}
            borderRadius={Base.BorderRadius.PX_3}
            margin={Base.MarginRight.PX_8}
            backgroundColor={Base.BackgroundColor.GREEN}
            store={{
              action: { type: FETCH_DATA },
            }}
          />
        </Block.Element>
        {
          getHtml(selector, userSelector)
        }
      </Block.Element >
      <MapPopup.Element
        store={{
          isShownSelectorKeys: ['base', 'popups', 'routeTracking', 'mapPopup'],
        }}
      />
    </>
  )
}

const getHtml = (routeTracking, user) => {
  const persCode = user.persCode;
  // const persCode = 1950015;

  const perLXE = routeTracking.route?.routeDetailVehicle?.filter(item => item.categoryVehicle?.driverCode === persCode);
  const pers = routeTracking.route?.routeDetailPers?.filter(item => item.persCode === persCode);
  const bve = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'BVE').map(item => ({ ...item, ...item.categoryPers }))[0];
  const lxe = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'LXE').map(item => ({ ...item, ...item.categoryPers }))[0];
  const atai = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'ATAI').map(item => ({ ...item, ...item.categoryPers }))[0];
  const tquy = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'TQUY').map(item => ({ ...item, ...item.categoryPers }))[0];
  const atm = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'ATM').map(item => ({ ...item, ...item.categoryPers }))[0];
  const routeDetailOganize = (() => {
    if (routeStatus === 'Beginning')
      return routeTracking.route?.routeDetailOganize?.filter(item => item.routeDetailOganizeStatus === 'Y')[0]
    return routeTracking.route?.routeDetailOganize?.filter(item => item.routeDetailOganizeStatus === 'PRO')[0]
  })();
  console.log('===================');
  console.log(persCode);
  console.log(routeTracking.route?.destinationTqList);
  const route = {
    ...routeTracking.route,
    pers: {
      bve,
      lxe,
      atai,
      tquy,
      atm,
    }
  };
  const routeStatus = route.routeStatus;
  if (route.transportType == 'Xe chuyên dùng')
    return;
  if (routeTracking.route?.destinationTqList?.filter(item => item.persCode === persCode)?.length > 0) {
    console.log('=================');
    if (routeStatus.includes("Working_") && routeDetailOganize?.destinationPointName === routeTracking.route?.destinationTq?.categoryOrgs?.orgsName)
      return html29_2(route, routeDetailOganize);
    if (['Beginning', 'Pickingup_SEC', 'Pickingup_ESC', 'Pickingup_ATM', 'Finishing', 'Finished'].includes(routeStatus) || routeStatus.includes("Going_") || routeStatus.includes("Working_"))
      return html29_1(route, routeDetailOganize);
  }
  if (persCode === route.tqDltltCode) {
    if (routeStatus === 'Beginning')
      return html30_1(route);
    if (routeStatus.includes("Working_"))
      return html30_2(route, routeDetailOganize);
    if (routeStatus === 'Finishing' || routeStatus === 'Finished')
      return html30_3(route, routeDetailOganize);
  }
  else if (pers?.length > 0) {
    const persTitle = pers[0]?.categoryPers?.persTitle;

    if (persTitle === 'ATAI') {
      if (routeStatus === 'Beginning')
        return html28_1(route);
      if (routeStatus.includes("Working_"))
        return html28_2(route, routeDetailOganize);
      if (routeStatus === 'Finishing' || routeStatus === 'Finished')
        return html28_3(route, routeDetailOganize);
    }
  }
  return false;

}

const col1 = {
  classNames: Classnames(
    styles['single-col'],
  )
}
const col2 = {
  classNames: Classnames(
    styles['double-col'],
  )
}

const html28_1 = (route) => {
  const routeDetailOganize = route?.routeDetailOganize?.filter(item => item.order === 1)[0];
  return (<>
    <Title.Element text='1. Bắt đầu lộ trình' tagType={Title.TagType.H3} />
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Số lộ trình' />
        <Input.Element
          defaultValue={route.id}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Button.Element
          text='MAP OF ROUTE'
          width={Base.Width.PX_200}
          color={Base.Color.WHITE}
          backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}

          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['routeTracking', 'mapPopup', 'isShown'],
              value: true,
            }
          }}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Thời gian bắt đầu dự kiến' />
      <Input.Element
        defaultValue={route.startTime && moment(route.startTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Điểm cần đến' />
      <Input.Element
        defaultValue={routeDetailOganize?.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={routeDetailOganize?.stopPointType}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.tqDltltName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.categoryPers?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Block.Element />
      <Button.Element
        text='Start'
        width={Base.Width.PX_200}
        color={Base.Color.WHITE}
        backgroundColor={Base.BackgroundColor.GREEN}
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_START_KCD, order: routeDetailOganize?.order });
        }}
      />
    </Block.Element>
  </>
  )
}

const html28_2 = (route, routeDetailOganize) => {
  return (<>
    <Title.Element text='2. Giao nhận HĐB tại điểm dừng' tagType={Title.TagType.H3} />
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Số lộ trình' />
        <Input.Element
          defaultValue={route.id}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Button.Element
          text='MAP OF ROUTE'
          width={Base.Width.PX_200}
          color={Base.Color.WHITE}
          backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}

          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['routeTracking', 'mapPopup', 'isShown'],
              value: true,
            }
          }}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Điểm cần đến' />
      <Input.Element
        defaultValue={routeDetailOganize?.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={routeDetailOganize?.stopPointType}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên thủ quỹ tại điểm đến' />
        <Input.Element
          defaultValue={route.tqDltltName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT thủ quỹ tại điểm đến' />
        <Input.Element
          defaultValue={route.categoryPers?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.tqDltltName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.categoryPers?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    {/* <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên lái xe' />
        <Input.Element
          defaultValue={route?.routeDetailVehicle[0]?.categoryVehicle?.driverName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT lái xe' />
        <Input.Element
          defaultValue={route?.routeDetailVehicle[0]?.categoryVehicle?.categoryPers?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element> */}
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên áp tải' />
        <Input.Element
          defaultValue={route.pers?.atai?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT áp tải' />
        <Input.Element
          defaultValue={route.pers?.atai?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Áp tải xác nhận' />
        <Input.Element
          defaultValue={routeDetailOganize?.apName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='Ngày giờ áp tải xác nhận' />
        <Input.Element
          defaultValue={routeDetailOganize?.atDate && moment(routeDetailOganize?.atDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Thủ quỹ xác nhận' />
        <Input.Element
          defaultValue={routeDetailOganize?.tqName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='Ngày giờ thủ quỹ xác nhận' />
        <Input.Element
          defaultValue={routeDetailOganize?.tqDate && moment(routeDetailOganize?.tqDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Block.Element />
      <Button.Element
        text='Confirm 2'
        width={Base.Width.PX_200}
        color={Base.Color.WHITE}
        backgroundColor={Base.BackgroundColor.GREEN}
        store={{
          isLoadingSelectorKeys: ['base', 'buttons', 'routeTracking', 'confirm'],
        }}
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_CONFIRM_2_KCD, order: routeDetailOganize?.order });
        }}
      />
    </Block.Element>
  </>
  )
}

const html28_3 = (route, routeDetailOganize) => {
  return (<>
    <Title.Element text={'3.Kết thúc lộ trình'} tagType={Title.TagType.H3} />
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Số lộ trình' />
        <Input.Element
          defaultValue={route.id}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Button.Element
          text='MAP OF ROUTE'
          width={Base.Width.PX_200}
          color={Base.Color.WHITE}
          backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}

          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['routeTracking', 'mapPopup', 'isShown'],
              value: true,
            }
          }}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Điểm cần đến' />
      <Input.Element
        defaultValue={routeDetailOganize?.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={routeDetailOganize?.stopPointType}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.tqDltltName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.categoryPers?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Block.Element />
      <Button.Element
        text='Confirm 2'
        width={Base.Width.PX_200}
        color={Base.Color.WHITE}
        backgroundColor={Base.BackgroundColor.GREEN}
        store={{
          isLoadingSelectorKeys: ['base', 'buttons', 'routeTracking', 'confirm'],
        }}
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_CONFIRM_2_KCD, order: routeDetailOganize?.order });
        }}
      />
    </Block.Element>
  </>
  )
}




const html30_1 = (route) => {
  const routeDetailOganize = route?.routeDetailOganize?.filter(item => item.order === 1)[0];
  return (<>
    <Title.Element text='1. Bắt đầu lộ trình' tagType={Title.TagType.H3} />
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Số lộ trình' />
        <Input.Element
          defaultValue={route.id}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Button.Element
          text='MAP OF ROUTE'
          width={Base.Width.PX_200}
          color={Base.Color.WHITE}
          backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}

          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['routeTracking', 'mapPopup', 'isShown'],
              value: true,
            }
          }}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Thời gian bắt đầu dự kiến' />
      <Input.Element
        defaultValue={route.startTime && moment(route.startTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Điểm cần đến' />
      <Input.Element
        defaultValue={routeDetailOganize?.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={routeDetailOganize?.stopPointType}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên áp tải' />
        <Input.Element
          defaultValue={route.pers?.atai?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT áp tải' />
        <Input.Element
          defaultValue={route.pers?.atai?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.tqDltltName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.categoryPers?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
  </>
  )
}

const html30_2 = (route, routeDetailOganize) => {
  return (<>
    <Title.Element text='2. Giao nhận HĐB tại điểm dừng' tagType={Title.TagType.H3} />
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Số lộ trình' />
        <Input.Element
          defaultValue={route.id}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Button.Element
          text='MAP OF ROUTE'
          width={Base.Width.PX_200}
          color={Base.Color.WHITE}
          backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}

          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['routeTracking', 'mapPopup', 'isShown'],
              value: true,
            }
          }}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Điểm cần đến' />
      <Input.Element
        defaultValue={routeDetailOganize?.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={routeDetailOganize?.stopPointType}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên thủ quỹ tại điểm đến' />
        <Input.Element
          defaultValue={route.tqDltltName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT thủ quỹ tại điểm đến' />
        <Input.Element
          defaultValue={route.categoryPers?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.tqDltltName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.categoryPers?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    {/* <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên lái xe' />
        <Input.Element
          defaultValue={route?.routeDetailVehicle[0]?.categoryVehicle?.driverName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT lái xe' />
        <Input.Element
          defaultValue={route?.routeDetailVehicle[0]?.categoryVehicle?.categoryPers?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element> */}
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên áp tải' />
        <Input.Element
          defaultValue={route.pers?.atai?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT áp tải' />
        <Input.Element
          defaultValue={route.pers?.atai?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Áp tải xác nhận' />
        <Input.Element
          defaultValue={routeDetailOganize?.apName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='Ngày giờ áp tải xác nhận' />
        <Input.Element
          defaultValue={routeDetailOganize?.atDate && moment(routeDetailOganize?.atDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Thủ quỹ xác nhận' />
        <Input.Element
          defaultValue={routeDetailOganize?.tqName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='Ngày giờ thủ quỹ xác nhận' />
        <Input.Element
          defaultValue={routeDetailOganize?.tqDate && moment(routeDetailOganize?.tqDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
  </>
  )
}

const html30_3 = (route, routeDetailOganize) => {
  return (<>
    <Title.Element text={'3.Kết thúc lộ trình'} tagType={Title.TagType.H3} />
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Số lộ trình' />
        <Input.Element
          defaultValue={route.id}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Button.Element
          text='MAP OF ROUTE'
          width={Base.Width.PX_200}
          color={Base.Color.WHITE}
          backgroundColor={Base.BackgroundColor.CLASSIC_BLUE}

          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['routeTracking', 'mapPopup', 'isShown'],
              value: true,
            }
          }}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Điểm cần đến' />
      <Input.Element
        defaultValue={routeDetailOganize?.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={routeDetailOganize?.stopPointType}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.tqDltltName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.categoryPers?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
  </>
  )
}


const html29_1 = (route, routeDetailOganize) => {

  return (<>
    <Title.Element text='Group box 1' tagType={Title.TagType.H3} />
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Số lộ trình' />
        <Input.Element
          defaultValue={route.id}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Thời gian bắt đầu dự kiến' />
      <Input.Element
        defaultValue={route.startTime && moment(route.startTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Điểm cần đến' />
      <Input.Element
        defaultValue={routeDetailOganize?.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={routeDetailOganize?.stopPointType}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên áp tải' />
        <Input.Element
          defaultValue={route.pers?.atai?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT áp tải' />
        <Input.Element
          defaultValue={route.pers?.atai?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.tqDltltName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.categoryPers?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
  </>
  )
}

const html29_2 = (route, routeDetailOganize) => {
  return (<>
    <Title.Element text='Group box 2' tagType={Title.TagType.H3} />
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Số lộ trình' />
        <Input.Element
          defaultValue={route.id}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Điểm đến' />
      <Input.Element
        defaultValue={routeDetailOganize?.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={routeDetailOganize?.stopPointType}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên thủ quỹ tại điểm đến' />
        <Input.Element
          defaultValue={route.destinationTq?.persFullname}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT thủ quỹ tại điểm đến' />
        <Input.Element
          defaultValue={route.destinationTq?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.tqDltltName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT thủ quỹ ĐVTLT' />
        <Input.Element
          defaultValue={route.categoryPers?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên áp tải' />
        <Input.Element
          defaultValue={route.pers?.atai?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT áp tải' />
        <Input.Element
          defaultValue={route.pers?.atai?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Áp tải xác nhận' />
        <Input.Element
          defaultValue={routeDetailOganize?.apName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='Ngày giờ áp tải xác nhận' />
        <Input.Element
          defaultValue={routeDetailOganize?.atDate && moment(routeDetailOganize?.atDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Thủ quỹ xác nhận' />
        <Input.Element
          defaultValue={routeDetailOganize?.tqName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='Ngày giờ thủ quỹ xác nhận' />
        <Input.Element
          defaultValue={routeDetailOganize?.tqDate && moment(routeDetailOganize?.tqDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Block.Element />
      <Button.Element
        text='Confirm 3'
        width={Base.Width.PX_200}
        color={Base.Color.WHITE}
        backgroundColor={Base.BackgroundColor.GREEN}
        store={{
          isLoadingSelectorKeys: ['base', 'buttons', 'routeTracking', 'confirm'],
        }}
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_CONFIRM_3_KCD, order: routeDetailOganize?.order });
        }}
      />
    </Block.Element>
  </>
  )
}






Element.displayName = 'RouteTracking';

