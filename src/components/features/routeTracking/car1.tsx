import React, { useEffect, useLayoutEffect } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Input from "~commons/input";
import * as Button from "~commons/button";
import * as Title from "~commons/title";
import * as MapPopup from "./mapPopup";
import _ from "lodash";
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_CODE_FILTER, FETCH_DATA, REQUEST_ROUTE_CONFIRM_1, REQUEST_ROUTE_CONFIRM_2, REQUEST_ROUTE_CONFIRM_3, REQUEST_ROUTE_START } from '~stores/routeTracking/constants';
import { ADD_NOTI, HANDLE_POPUP } from '_/stores/_base/constants';
import moment from 'moment';

export type Props = Base.Props;
let dispatch;
export const Element = (props: Props) => {
  dispatch = useDispatch();
  const selector = useSelector(state => state['routeTracking']);
  const userSelector = useSelector(state => state['auth'].user);
  const type = 'component';
  const html = getHtml(selector, userSelector);

  useEffect(() => {
    if (_.isEmpty(selector?.route)) {
      // if (!html)
      //   dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Bạn không có quyền theo dõi lộ trình này' } });
    }
  }, [selector?.route]);
  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles[type],
    ),
    ...props,
  };
  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(dispatch, selector);
    if (isValidForm) {
      dispatch({ type: FETCH_DATA });
    }
  }
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
            onClick={handleSubmitButtonClick}
          />
        </Block.Element>
        {
          html
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
  // const persCode = 136000;

  const perLXE = routeTracking.route?.routeDetailVehicle?.filter(item => item.categoryVehicle?.driverCode === persCode);
  const pers = routeTracking.route?.routeDetailPers?.filter(item => item.persCode === persCode);
  const bve = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'BVE').map(item => ({ ...item, ...item.categoryPers }))[0];
  const lxe = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'LXE').map(item => ({ ...item, ...item.categoryPers }))[0];
  const atai = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'ATAI').map(item => ({ ...item, ...item.categoryPers }));
  const tquy = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'TQUY').map(item => ({ ...item, ...item.categoryPers }))[0];
  const atm = routeTracking.route?.routeDetailPers?.filter(item => item.categoryPers?.persTitle == 'ATM').map(item => ({ ...item, ...item.categoryPers }))[0];
  const routeDetailOganize = (() => {
    const routeDetailOganize = routeTracking.route?.routeDetailOganize?.filter(item => item.routeDetailOganizeStatus === 'PRO')[0];
    if (routeTracking.route?.routeStatus === 'Beginning')
      return routeTracking.route?.routeDetailOganize[0];
    if (_.isEmpty(routeDetailOganize) && routeTracking.route?.routeDetailOganize) {
      return routeTracking.route?.routeDetailOganize[routeTracking.route?.routeDetailOganize?.length - 1];
    }
    return routeDetailOganize;
  })();

  const route = {
    ...routeTracking.route,
    pers: {
      bve,
      lxe: perLXE,
      atai: atai && atai[Math.floor(Math.random() * atai.length)],
      tquy,
      atm,
    }
  };
  const routeStatus = route.routeStatus;
  if (route.transportType != 'Xe chuyên dùng')
    return false;
  if (routeTracking.route?.destinationTqList?.filter(item => item.persCode === persCode)?.length) {
    // if (routeStatus?.includes("Working_") && routeDetailOganize?.destinationPointName === routeTracking.route?.destinationTq?.categoryOrgs?.orgsName)
    if (routeStatus?.includes("Working_") && routeTracking.route?.tqList?.filter(item => item.persCode === persCode)?.length)
      return html26_2(route, routeDetailOganize, routeStatus);
  }
  if (persCode === route.tqDltltCode || route?.tqList?.filter(item => item.persCode === persCode).length) {
    if (routeStatus === 'Beginning')
      return html27_1(route);
    if (routeStatus === 'Pickingup_SEC' || routeStatus === 'Pickingup_ESC')
      return html27_2(route, routeDetailOganize, routeStatus);
    if (routeStatus === 'Pickingup_ATM')
      return html27_3(route, routeDetailOganize, routeStatus);
    if (routeStatus?.includes("Going_"))
      return html27_4(route, routeDetailOganize, routeStatus);
    if (routeStatus?.includes("Working_"))
      return html27_5(route, routeDetailOganize, routeStatus);
    if (routeStatus === 'Finishing' || routeStatus === 'Finished')
      return html27_6(route, routeDetailOganize, routeStatus);
  }
  if (perLXE.length > 0) {
    if (routeStatus === 'Beginning')
      return html24_1(route);
    if (routeStatus === 'Pickingup_SEC' || routeStatus === 'Pickingup_ESC')
      return html24_2(route, routeDetailOganize, routeStatus);
    if (routeStatus === 'Pickingup_ATM')
      return html24_3(route, routeDetailOganize, routeStatus);
    if (routeStatus?.includes("Going_"))
      return html24_4(route, routeDetailOganize, 1, routeStatus);
    if (routeStatus?.includes("Working_"))
      return html24_4(route, routeDetailOganize, 2, routeStatus);
    if (routeStatus === 'Finishing' || routeStatus === 'Finished')
      return html24_4(route, routeDetailOganize, 3, routeStatus);
  }
  if (pers?.length > 0) {
    const persTitle = pers[0]?.categoryPers?.persTitle;

    if (persTitle === 'ATAI') {
      if (routeStatus === 'Beginning')
        return html25_1(route);
      if (routeStatus === 'Pickingup_SEC' || routeStatus === 'Pickingup_ESC')
        return html25_2(route, routeDetailOganize, routeStatus);
      if (routeStatus === 'Pickingup_ATM')
        return html25_3(route, routeDetailOganize, routeStatus);
      if (routeStatus?.includes("Going_"))
        return html25_4(route, routeDetailOganize, routeStatus);
      if (routeStatus?.includes("Working_"))
        return html25_5(route, routeDetailOganize, routeStatus);
      if (routeStatus === 'Finishing' || routeStatus === 'Finished')
        return html25_6(route, routeDetailOganize, routeStatus);
    }
  }

  if (routeTracking.route?.destinationTqList?.filter(item => item.persCode === persCode)?.length) {
    if (['Beginning', 'Pickingup_SEC', 'Pickingup_ESC', 'Pickingup_ATM', 'Finishing', 'Finished'].includes(routeStatus) || routeStatus?.includes("Going_") || routeStatus?.includes("Working_"))
      return html26_1(route, routeDetailOganize, routeStatus);
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
const row = {
  classNames: Classnames(
    styles['double-col'],
  )
}
const html24_1 = (route) => {
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
        defaultValue={routeDetailOganize?.departurePointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue='Chờ bắt đầu lộ trình'
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
        store={{
          isLoadingSelectorKeys: ['base', 'buttons', 'routeTracking', 'confirm'],
        }}
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_START, order: 1 });
        }}
      />
    </Block.Element>
  </>
  )
}

const html24_2 = (route, routeDetailOganize, routeStatus) => {
  return (<>
    <Title.Element text='2. Di chuyển đến điểm dừng đón bảo vệ hoặc đón áp tải' tagType={Title.TagType.H3} />
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
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
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
    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'BVE')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên bảo vệ' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT bảo vệ' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }

    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'ATAI')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }

    <Block.Element {...col1}>
      <Block.Element />
      <Button.Element
        text='Confirm 1'
        width={Base.Width.PX_200}
        color={Base.Color.WHITE}
        backgroundColor={Base.BackgroundColor.GREEN}
        store={{
          isLoadingSelectorKeys: ['base', 'buttons', 'routeTracking', 'confirm'],
        }}
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_CONFIRM_1, order: routeDetailOganize?.order });
        }}
      />
    </Block.Element>
  </>
  )
}

const html24_3 = (route, routeDetailOganize, routeStatus) => {
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
        defaultValue={routeDetailOganize?.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
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
    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'ATAI')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }

    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'BVE')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên bảo vệ' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT bảo vệ' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên NV tiếp quỹ ATM' />
        <Input.Element
          defaultValue={route.pers?.atm?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT NV tiếp quỹ ATM' />
        <Input.Element
          defaultValue={route.pers?.atm?.persMobile}
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
        store={{
          isLoadingSelectorKeys: ['base', 'buttons', 'routeTracking', 'confirm'],
        }}
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_CONFIRM_1, order: routeDetailOganize?.order });
        }}
      />
    </Block.Element>
  </>
  )
}

const html24_4 = (route, routeDetailOganize, type, routeStatus) => {
  const title = (() => {
    if (type === 1)
      return '4. Di chuyển đến điểm dừng xử lý nghiệp vụ';
    if (type === 2)
      return '5. Giao nhận HĐB tại điểm dừng';
    if (type === 3)
      return '6. Kết thúc lộ trình';
    return '';
  })();
  // const confirmHtml = type === 1 || routeStatus === 'Finished' ? null :
  const confirmHtml = type === 2 || routeStatus === 'Finished' ? null :
    <Block.Element {...col1}>
      <Block.Element />
      <Button.Element
        text='Confirm 1'
        width={Base.Width.PX_200}
        color={Base.Color.WHITE}
        backgroundColor={Base.BackgroundColor.GREEN}
        store={{
          isLoadingSelectorKeys: ['base', 'buttons', 'routeTracking', 'confirm'],
        }}
        onClick={() => {
          dispatch({ type: REQUEST_ROUTE_CONFIRM_1, order: routeDetailOganize?.order });
        }}
      />
    </Block.Element>
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
        defaultValue={routeDetailOganize?.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
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
    {
      confirmHtml
    }
  </>
  )
}

const html25_1 = (route) => {
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
        defaultValue={routeDetailOganize?.departurePointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue='Chờ bắt đầu lộ trình'
        isDisabled={true}
      />
    </Block.Element>


    <Block.Element {...col2}>
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
    </Block.Element>
  </>
  )
}

const html25_2 = (route, routeDetailOganize, routeStatus) => {
  return (<>
    <Title.Element text='2. Di chuyển đến điểm dừng đón bảo vệ hoặc áp tải' tagType={Title.TagType.H3} />
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
      <Title.Element text='Thời gian thực tế' />
      <Input.Element
        defaultValue={route?.actualTime && moment(route?.actualTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
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
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
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
    </Block.Element>
    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'ATAI')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }

    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'BVE')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên bảo vệ' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT bảo vệ' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }
  </>
  )
}



const html25_3 = (route, routeDetailOganize, routeStatus) => {
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
      <Title.Element text='Thời gian thực tế' />
      <Input.Element
        defaultValue={route?.actualTime && moment(route?.actualTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
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
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
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
    </Block.Element>
    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'ATAI')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên NV tiếp quỹ ATM' />
        <Input.Element
          defaultValue={route.pers?.atm?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT NV tiếp quỹ ATM' />
        <Input.Element
          defaultValue={route.pers?.atm?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
  </>
  )
}

const html25_4 = (route, routeDetailOganize, routeStatus) => {
  return (<>
    <Title.Element text='4. Di chuyển đến điểm dừng xử lý nghiệp vụ' tagType={Title.TagType.H3} />
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
      <Title.Element text='Thời gian thực tế' />
      <Input.Element
        defaultValue={route?.actualTime && moment(route?.actualTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
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
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
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
    </Block.Element>
    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'ATAI')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }
  </>
  )
}

const html25_5 = (route, routeDetailOganize, routeStatus) => {
  return (<>
    <Title.Element text='5. Giao nhận HĐB tại điểm dừng' tagType={Title.TagType.H3} />
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
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Tên điểm đến' />
        <Input.Element
          defaultValue={routeDetailOganize?.destinationPointName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='Mức độ ưu tiên' />
        <Input.Element
          defaultValue={routeDetailOganize?.cashOptimization?.priorityLevelName}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
          isDisabled={true}
        />
      </Block.Element>
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
    </Block.Element>
    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'ATAI')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }
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
          dispatch({ type: REQUEST_ROUTE_CONFIRM_2, order: routeDetailOganize?.order });
        }}
        isDisabled={routeDetailOganize?.apName}
      />
    </Block.Element>
  </>
  )
}

const html25_6 = (route, routeDetailOganize, routeStatus) => {
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
      <Title.Element text='Thời gian thực tế' />
      <Input.Element
        defaultValue={route?.actualTime && moment(route?.actualTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
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
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
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


const html26_1 = (route, routeDetailOganize, routeStatus) => {

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
    {/* <Block.Element {...col1}>
      <Title.Element text='Thời gian bắt đầu dự kiến' />
      <Input.Element
        defaultValue={route.startTime && moment(route.startTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
        isDisabled={true}
      />
    </Block.Element> */}
    {/* <Block.Element {...col1}>
      <Title.Element text='Điểm cần đến' />
      <Input.Element
        defaultValue={routeStatus == 'Beginning' ? routeDetailOganize?.departurePointAddress : routeDetailOganize?.destinationPointAddress}
        isDisabled={true}
      />
    </Block.Element> */}
    {
      routeStatus == 'Beginning'
        ? <Block.Element {...col1}>
          <Title.Element text='Công việc cần thực hiện' />
          <Input.Element
            defaultValue={routeStatus == 'Beginning' ? 'Chờ bắt đầu lộ trình' : routeDetailOganize?.stopPointType}
            isDisabled={true}
          />
        </Block.Element>
        : <Block.Element {...col1}>
          <Title.Element text='Công việc cần thực hiện' />
          <Block.Element
          >
            <Input.Element
              defaultValue={
                routeStatus.includes('Working_')
                  ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
                  : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
              }
              width={Base.Width.PER_50}
              isDisabled={true}
            />
            <Input.Element
              defaultValue={routeDetailOganize?.stopPointType}
              width={Base.Width.PER_50}
              isDisabled={true}
            />
          </Block.Element>
        </Block.Element>
    }

    <Block.Element {...col2}>
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

const html26_2 = (route, routeDetailOganize, routeStatus) => {
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
      <Title.Element text='Tên điểm đến' />
      <Input.Element
        defaultValue={routeDetailOganize?.destinationPointName}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
          isDisabled={true}
        />
      </Block.Element>
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
    </Block.Element>
    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'ATAI')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }
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
          dispatch({ type: REQUEST_ROUTE_CONFIRM_3, order: routeDetailOganize?.order });
        }}
        isDisabled={routeDetailOganize?.tqName}
      />
    </Block.Element>
  </>
  )
}




const html27_1 = (route) => {
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
        defaultValue={routeDetailOganize?.departurePointAddress}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Input.Element
        defaultValue='Chờ bắt đầu lộ trình'
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col2}>
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
    </Block.Element>
  </>
  )
}

const html27_2 = (route, routeDetailOganize, routeStatus) => {
  return (<>
    <Title.Element text='2. Di chuyển đến điểm dừng đón bảo vệ hoặc áp tải' tagType={Title.TagType.H3} />
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
      <Title.Element text='Thời gian thực tế' />
      <Input.Element
        defaultValue={route?.actualTime && moment(route?.actualTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
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
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
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
    </Block.Element>
    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'ATAI')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }

    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'BVE')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên bảo vệ' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT bảo vệ' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }
  </>
  )
}



const html27_3 = (route, routeDetailOganize, routeStatus) => {
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
      <Title.Element text='Thời gian thực tế' />
      <Input.Element
        defaultValue={route?.actualTime && moment(route?.actualTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
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
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
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
    </Block.Element>
    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'ATAI')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }
    <Block.Element {...col2}>
      <Block.Element>
        <Title.Element text='Họ và tên NV tiếp quỹ ATM' />
        <Input.Element
          defaultValue={route.pers?.atm?.persName}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element>
        <Title.Element text='SĐT NV tiếp quỹ ATM' />
        <Input.Element
          defaultValue={route.pers?.atm?.persMobile}
          isDisabled={true}
        />
      </Block.Element>
    </Block.Element>
  </>
  )
}

const html27_4 = (route, routeDetailOganize, routeStatus) => {
  return (<>
    <Title.Element text='4. Di chuyển đến điểm dừng xử lý nghiệp vụ' tagType={Title.TagType.H3} />
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
      <Title.Element text='Thời gian thực tế' />
      <Input.Element
        defaultValue={route?.actualTime && moment(route?.actualTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
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
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
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
    </Block.Element>
    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'ATAI')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }
  </>
  )
}

const html27_5 = (route, routeDetailOganize, routeStatus) => {
  return (<>
    <Title.Element text='5. Giao nhận HĐB tại điểm dừng' tagType={Title.TagType.H3} />
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
      <Title.Element text='Tên điểm đến' />
      <Input.Element
        defaultValue={routeDetailOganize?.destinationPointName}
        isDisabled={true}
      />
    </Block.Element>
    <Block.Element {...col1}>
      <Title.Element text='Công việc cần thực hiện' />
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
          isDisabled={true}
        />
      </Block.Element>
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
    </Block.Element>
    {
      (() => {
        const items = [] as any;
        for (const pers of route?.routeDetailPers) {
          if (pers?.categoryPers?.persTitle == 'ATAI')
            items.push(<Block.Element {...col2}>
              <Block.Element>
                <Title.Element text='Họ và tên áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persFullname}
                  isDisabled={true}
                />
              </Block.Element>
              <Block.Element>
                <Title.Element text='SĐT áp tải' />
                <Input.Element
                  defaultValue={pers.categoryPers?.persMobile}
                  isDisabled={true}
                />
              </Block.Element>
            </Block.Element>)
        }
        return items;
      })()
    }
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



const html27_6 = (route, routeDetailOganize, routeStatus) => {
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
      <Title.Element text='Thời gian thực tế' />
      <Input.Element
        defaultValue={route?.actualTime && moment(route?.actualTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}
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
      <Block.Element
      >
        <Input.Element
          defaultValue={
            routeStatus.includes('Working_')
              ? 'Giao nhận HĐB tại điểm dừng thứ ' + routeDetailOganize?.order
              : 'Di chuyển đến điểm dừng thứ ' + routeDetailOganize?.order
          }
          width={Base.Width.PER_50}
          isDisabled={true}
        />
        <Input.Element
          defaultValue={routeDetailOganize?.stopPointType}
          width={Base.Width.PER_50}
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

const validateForm = (dispatch, selector) => {
  if (!selector.filters?.id) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Vui lòng nhập số Lộ trình' } });
    return false;
  }
  return true;
}




Element.displayName = 'RouteTracking';

