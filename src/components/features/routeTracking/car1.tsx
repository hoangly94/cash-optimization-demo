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
import { CHANGE_CODE_FILTER, FETCH_DATA, REQUEST_ROUTE_CONFIRM_1, REQUEST_ROUTE_CONFIRM_2, REQUEST_ROUTE_CONFIRM_3, REQUEST_ROUTE_START } from '~stores/routeTracking/constants';
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
  if(route.transportType != 'Xe chuyên dùng')
    return;
  if (persCode === route.tqDltltCode) {
    if (routeStatus === 'Beginning')
      return html27_1(route, 1);
    if (routeStatus === 'Pickingup_SEC' || routeStatus === 'Pickingup_ESC')
      return html27_2(route, ['Điểm đón áp tải', 'Điểm đón bảo vệ']);
    if (routeStatus === 'Pickingup_ATM')
      return html27_3(route, ['Điểm đón NV tiếp quỹ ATM"']);
    if (routeStatus === 'Going_i')
      return html27_4(route, ['Điểm dừng nhận quỹ của ĐVTLT', 'Điểm dừng trả quỹ của ĐVTLT']);
    if (routeStatus === 'Working_i')
      return html27_5(route, ['Điểm dừng xử lý NV theo PYC']);
    if (routeStatus === 'Finishing' || routeStatus === 'Finished')
      return html27_6(route, ['Điểm kết thúc lộ trình']);
  }
  else if (pers?.length > 0) {
    const persTitle = pers[0]?.categoryPers?.persTitle;

    if (persTitle === 'LXE') {
      if (routeStatus === 'Beginning')
        return html24_1(route, 1);
      if (routeStatus === 'Pickingup_SEC' || routeStatus === 'Pickingup_ESC')
        return html24_2(route, ['Điểm đón áp tải', 'Điểm đón bảo vệ']);
      if (routeStatus === 'Pickingup_ATM')
        return html24_3(route, ['Điểm đón NV tiếp quỹ ATM"']);
      if (routeStatus === 'Going_i')
        return html24_4(route, ['Điểm dừng nhận quỹ của ĐVTLT', 'Điểm dừng trả quỹ của ĐVTLT'], '4. Di chuyển đến điểm dừng xử lý nghiệp vụ');
      if (routeStatus === 'Working_i')
        return html24_4(route, ['Điểm dừng xử lý NV theo PYC'], '5. Giao nhận HĐB tại điểm dừng');
      if (routeStatus === 'Finishing' || routeStatus === 'Finished')
        return html24_4(route, ['Điểm kết thúc lộ trình'], '6. Kết thúc lộ trình');
    }

    if (persTitle === 'ATAI') {
      if (routeStatus === 'Beginning')
      return html25_1(route, 1);
      if (routeStatus === 'Pickingup_SEC' || routeStatus === 'Pickingup_ESC')
        return html25_2(route, ['Điểm đón áp tải', 'Điểm đón bảo vệ']);
      if (routeStatus === 'Pickingup_ATM')
        return html25_3(route, ['Điểm đón NV tiếp quỹ ATM"']);
      if (routeStatus === 'Going_i')
        return html25_4(route, ['Điểm dừng nhận quỹ của ĐVTLT', 'Điểm dừng trả quỹ của ĐVTLT']);
      if (routeStatus === 'Working_i')
        return html25_5(route, ['Điểm dừng xử lý NV theo PYC']);
    }

    if (persTitle === 'TQUY') {
      if (['Beginning', 'Pickingup_SEC', 'Pickingup_ESC', 'Pickingup_ATM', 'Working_i'].includes(routeStatus))
        return html26_1(route, 1);
      if (routeStatus === 'Pickingup_SEC' || routeStatus === 'Pickingup_ESC')
        return html26_2(route, ['Điểm đón áp tải']);
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
const row = {
  classNames: Classnames(
    styles['double-col'],
  )
}
const html24_1 = (route, order) => {
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
        text='START'
        width={Base.Width.PX_200}
        color={Base.Color.WHITE}
        backgroundColor={Base.BackgroundColor.GREEN}
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_START, order: 1 });
        }}
      />
    </Block.Element>
  </>
  )
}

const html24_2 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];

  return (<>
    <Title.Element text='2. Di chuyển đến điểm dừng đón bảo vệ hoặc đơn áp tải' tagType={Title.TagType.H3} />
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
        <Title.Element text='Họ và tên bảo vệ' />
        <Input.Element
          defaultValue={route.pers?.bve?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT bảo vệ' />
        <Input.Element
          defaultValue={route.pers?.bve?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Block.Element />
      <Button.Element
        text='Confirm 1'
        width={Base.Width.PX_200}
        color={Base.Color.WHITE}
        backgroundColor={Base.BackgroundColor.GREEN}
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_CONFIRM_1, order: detail.order });
        }}
      />
    </Block.Element>
  </>
  )
}

const html24_3 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text='3. Di chuyển đến điểm dừng đón NV tiếp quỹ ATM' tagType={Title.TagType.H3} />
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
        <Title.Element text='Họ và tên bảo vệ' />
        <Input.Element
          defaultValue={route.pers?.bve?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT bảo vệ' />
        <Input.Element
          defaultValue={route.pers?.bve?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên NV tiếp quỹ ATM' />
        <Input.Element
          defaultValue={route.pers?.bve?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT NV tiếp quỹ ATM' />
        <Input.Element
          defaultValue={route.pers?.bve?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Block.Element />
      <Button.Element
        text='Confirm 1'
        width={Base.Width.PX_200}
        color={Base.Color.WHITE}
        backgroundColor={Base.BackgroundColor.GREEN}
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_CONFIRM_1, order: detail.order });
        }}
      />
    </Block.Element>
  </>
  )
}

const html24_4 = (route, stopPointTypes, title) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text={title} tagType={Title.TagType.H3} />
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
        text='Confirm 1'
        width={Base.Width.PX_200}
        color={Base.Color.WHITE}
        backgroundColor={Base.BackgroundColor.GREEN}
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_CONFIRM_1, order: detail.order });
        }}
      />
    </Block.Element>
  </>
  )
}

const html25_1 = (route, order) => {
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
  </>
  )
}

const html25_2 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text='2. Di chuyển đến điểm dừng đón bảo về và áp tải' tagType={Title.TagType.H3} />
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
        <Title.Element text='Họ và tên bảo vệ' />
        <Input.Element
          defaultValue={route.pers?.bve?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT bảo vệ' />
        <Input.Element
          defaultValue={route.pers?.bve?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
  </>
  )
}



const html25_3 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text='3. Di chuyển đến điểm dừng đón NV tiếp quỹ ATM' tagType={Title.TagType.H3} />
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
        <Title.Element text='Họ và tên NV tiếp quỹ ATM' />
        <Input.Element
          defaultValue={route.pers?.bve?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT NV tiếp quỹ ATM' />
        <Input.Element
          defaultValue={route.pers?.bve?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
  </>
  )
}

const html25_4 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text='3. Di chuyển đến điểm dừng xử lý nghiệp vụ' tagType={Title.TagType.H3} />
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
  </>
  )
}

const html25_5 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text='5. Giờ nhận HĐB tại điểm dừng' tagType={Title.TagType.H3} />
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
          dispatch({ type: REQUEST_ROUTE_CONFIRM_2, order: detail.order });
        }}
      />
    </Block.Element>
  </>
  )
}



const html26_1 = (route, order) => {
  const detail = route.routeDetailOganize?.filter(item => item.order === order)[0];
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
  </>
  )
}

const html26_2 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text='5. Giờ nhận HĐB tại điểm dừng' tagType={Title.TagType.H3} />
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
        text='Confirm 3'
        width={Base.Width.PX_200}
        color={Base.Color.WHITE}
        backgroundColor={Base.BackgroundColor.GREEN}
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_CONFIRM_3, order: detail.order });
        }}
      />
    </Block.Element>
  </>
  )
}




const html27_1 = (route, order) => {
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
  </>
  )
}

const html27_2 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text='2. Di chuyển đến điểm dừng đón bảo về và áp tải' tagType={Title.TagType.H3} />
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
        <Title.Element text='Họ và tên bảo vệ' />
        <Input.Element
          defaultValue={route.pers?.bve?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT bảo vệ' />
        <Input.Element
          defaultValue={route.pers?.bve?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
  </>
  )
}



const html27_3 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text='3. Di chuyển đến điểm dừng đón NV tiếp quỹ ATM' tagType={Title.TagType.H3} />
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
        <Title.Element text='Họ và tên NV tiếp quỹ ATM' />
        <Input.Element
          defaultValue={route.pers?.bve?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT NV tiếp quỹ ATM' />
        <Input.Element
          defaultValue={route.pers?.bve?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
  </>
  )
}

const html27_4 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text='3. Di chuyển đến điểm dừng xử lý nghiệp vụ' tagType={Title.TagType.H3} />
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
  </>
  )
}

const html27_5 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text='5. Giờ nhận HĐB tại điểm dừng' tagType={Title.TagType.H3} />
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



const html27_6 = (route, stopPointTypes) => {
  const detail = route.routeDetailOganize?.filter(item => stopPointTypes.includes(item.stopPointType))[0];
  return (<>
    <Title.Element text={'6.Kết thúc lộ trình'} tagType={Title.TagType.H3} />
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

