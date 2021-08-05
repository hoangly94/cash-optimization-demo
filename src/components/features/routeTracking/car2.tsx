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
import { CHANGE_CODE_FILTER, FETCH_DATA, REQUEST_ROUTE_CONFIRM_1, REQUEST_ROUTE_CONFIRM_2, REQUEST_ROUTE_CONFIRM_2_KCD, REQUEST_ROUTE_CONFIRM_3, REQUEST_ROUTE_START, REQUEST_ROUTE_START_KCD } from '~stores/routeTracking/constants';
import { HANDLE_POPUP } from '_/stores/_base/constants';

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

  const pers = routeTracking.route?.routeDetailPers?.filter(item => item.persCode === persCode);
  const bve = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'BVE').map(item => ({ ...item, ...item.categoryPers }))[0];
  const lxe = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'LXE').map(item => ({ ...item, ...item.categoryPers }))[0];
  const atai = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'ATAI').map(item => ({ ...item, ...item.categoryPers }))[0];
  const tquy = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'TQUY').map(item => ({ ...item, ...item.categoryPers }))[0];
  const atm = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'ATM').map(item => ({ ...item, ...item.categoryPers }))[0];

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
  if (persCode === route.tqDltltCode) {
    if (routeStatus === 'Beginning')
      return html30_1(route, 1);
    if (routeStatus.includes("Going_"))
      return html30_2(route, ['Điểm dừng xử lý NV theo PYC']);
    if (routeStatus === 'Finishing' || routeStatus === 'Finished')
      return html30_3(route, ['Điểm kết thúc lộ trình']);
  }
  else if (pers?.length > 0) {
    const persTitle = pers[0]?.categoryPers?.persTitle;

    if (persTitle === 'ATAI' || persTitle === 'TQUY') {
      if (routeStatus === 'Beginning')
        return html28_1(route, 1);
      if (routeStatus.includes("Going_"))
        return html28_2(route, ['Điểm dừng xử lý NV theo PYC']);
      if (routeStatus === 'Finishing' || routeStatus === 'Finished')
        return html28_3(route, ['Điểm kết thúc lộ trình']);
    }
  }

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

const html28_1 = (route, order) => {
  const detail = route.routeDetailOganize?.filter(item => item.order === order)[0];
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
        defaultValue={route.startTime}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Điểm cần đến' />
      <Input.Element
        defaultValue={detail.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={detail.stopPointType}
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
          dispatch({ type: REQUEST_ROUTE_START_KCD, order: detail.order });
        }}
      />
    </Block.Element>
  </>
  )
}

const html28_2 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text='2. Giờ nhận HĐB tại điểm dừng' tagType={Title.TagType.H3} />
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
        defaultValue={detail.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={detail.stopPointType}
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
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên lái xe' />
        <Input.Element
          defaultValue={route.pers?.atai?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT lái xe' />
        <Input.Element
          defaultValue={route.pers?.atai?.persMobile}
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
          // defaultValue={route.pers?.atai?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='Ngày giờ áp tải xác nhận' />
        <Input.Element
          // defaultValue={route.pers?.atai?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Thủ quỹ xác nhận' />
        <Input.Element
          // defaultValue={route.pers?.atai?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='Ngày giờ thủ quỹ xác nhận' />
        <Input.Element
          // defaultValue={route.pers?.atai?.persMobile}
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
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_CONFIRM_2_KCD, order: detail.order });
        }}
      />
    </Block.Element>
  </>
  )
}

const html28_3 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
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
        defaultValue={detail.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={detail.stopPointType}
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
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_CONFIRM_2_KCD, order: detail.order });
        }}
      />
    </Block.Element>
  </>
  )
}




const html30_1 = (route, order) => {
  const detail = route.routeDetailOganize?.filter(item => item.order === order)[0];
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
        defaultValue={route.startTime}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Điểm cần đến' />
      <Input.Element
        defaultValue={detail.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={detail.stopPointType}
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

const html30_2 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text='2. Giờ nhận HĐB tại điểm dừng' tagType={Title.TagType.H3} />
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
        defaultValue={detail.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={detail.stopPointType}
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
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên lái xe' />
        <Input.Element
          defaultValue={route.pers?.atai?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT lái xe' />
        <Input.Element
          defaultValue={route.pers?.atai?.persMobile}
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
          // defaultValue={route.pers?.atai?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='Ngày giờ áp tải xác nhận' />
        <Input.Element
          // defaultValue={route.pers?.atai?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Thủ quỹ xác nhận' />
        <Input.Element
          // defaultValue={route.pers?.atai?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='Ngày giờ thủ quỹ xác nhận' />
        <Input.Element
          // defaultValue={route.pers?.atai?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
  </>
  )
}

const html30_3 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
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
        defaultValue={detail.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue={detail.stopPointType}
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




Element.displayName = 'RouteTracking';

