import React, { useState } from 'react';
import Classnames from 'classnames';
import styles from './_styles.css'
import { Link } from "react-router-dom";
import * as Base from '~/_settings';
import Chevron from '~commons/svg/chevron';
import * as Svg from '~commons/svg';
import * as Block from '~commons/block';
import * as Table from '~commons/table';
import * as Label from '~commons/label';
import * as Input from '~commons/input';
import { useDispatch, useSelector } from 'react-redux';
import { _Array, _Date } from '@utils';
import { HANDLE_BUTTON } from "~stores/_base/constants";
import { useComponentClickOutside } from '@hooks';

export enum Type {
  DEFAULT = 'datepicker',
}

export enum Size {
  S1 = 'size-s1',
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
  L1 = 'size-l1',
  L2 = 'size-l2',
}

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  $input: Input.Props,
  $datepicker: Base.Props & {
    onClick?: React.MouseEventHandler,
    store: Store,
    activeDay?: string,
    dayLabels?: string[],
    monthLabels?: string[],
    isDisabled?: boolean,
  },
}

type Store = {
  selectorKeys: string[],
  action?: {},
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    $datepicker,
    $input,
  } = props;
  const {
    store,
    activeDay,
    dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  } = $datepicker;

  const {
    ref,
    clickData,
    setClickData,
  } = useComponentClickOutside();
  const dispatch = useDispatch();
  const dateSelector = store && store.selectorKeys ? useSelector(state => _Array.getArrayValueByKey(state as [], store.selectorKeys as string[])) : '';

  const [currentDate, setCurrentDate] = useState(_Date.isMatchDateTimeDD_MM_YYY(dateSelector)
    ? new Date(dateSelector)
    : (activeDay ? new Date(activeDay) : new Date()));

  // const isDisabled = store && store.isDisabledSelectorKeys ? useSelector(state => _Array.getArrayValueByKey(state as [], [...store.isDisabledSelectorKeys as string[], 'isDisabled'])) : false;
  const display = !$datepicker.isDisabled && !clickData.isOutside ? { display: 'block' } : { display: 'none' };

  // console.log('----------------------');
  // if(_Date.isMatchDateTimeDD_MM_YYY(dateSelector)){
  //   console.log('=============');
  // }
  // console.log(currentDate);
  // console.log(dateSelector.length);
  // console.log(activeDay);
  const componentProps = {
    ...props,
    refs: ref,
  }
  const datepickerProps = {
    classNames: Classnames(
      styles[type],
    ),
    backgroundColor: Base.BackgroundColor.WHITE,
    width: Base.Width.PX_300,
    ...props,
    style: {
      ...display,
    },
  }

  const menuProps = {
    classNames: Classnames(
      styles['datepicker-menu'],
    ),
    flex: Base.Flex.BETWEEN,
    alignItems: Base.AlignItems.STRETCH,
    bacgroundColor: Base.BackgroundColor.WHITE,
    padding: Base.PaddingV.PX_8,
  }

  const labelRowProps = dayLabels.map(mapToLabelRows);
  const tableFromData = getTableData(currentDate);
  const tableFromProps = tableFromData.reduce(reduceToRows(dispatch, setClickData)(props, currentDate, dateSelector), []);
  const currentMonthYearString = `${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;

  const tableProps = {
    $thead: [
      {
        $cells: labelRowProps
      },
    ],
    $rows: tableFromProps,
  }

  return (
    <Block.Element {...componentProps}>
      <Input.Element {...$input} />
      <Block.Element {...datepickerProps}>
        <Block.Element {...menuProps}>
          <Chevron direction={Svg.Direction.LEFT} margin={Base.MarginLeft.PX_12} onClick={handlePrevNextClick(currentDate, setCurrentDate, false)} />
          <Label.Element text={currentMonthYearString} />
          <Chevron direction={Svg.Direction.RIGHT} margin={Base.MarginRight.PX_12} onClick={handlePrevNextClick(currentDate, setCurrentDate, true)} />
        </Block.Element>
        <Table.Element {...tableProps} />
      </Block.Element>
    </Block.Element>
  )
}
const handlePrevNextClick = (currentDate, setCurrentDate, isNext: boolean = true) => () => {
  const month = isNext ? currentDate.getMonth() + 1 : currentDate.getMonth() - 1;
  setCurrentDate(new Date(currentDate.getFullYear(), month, 14));
}
const getTableData = (date: Date) => {
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfFirstDate= firstDate.getDay() ? firstDate.getDay() - 1 : 6;
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const dayOfLastDate= lastDate.getDay() ? lastDate.getDay() - 1 : 6;
  const numberDaysOfPreviousMonth = _Date.getNumberDaysOfPreviousMonth(date);
  const numberDaysOfMonth = _Date.getNumberDaysOfMonth(date);

  const tableData = [
    ..._Array.initArrayByIndex(dayOfFirstDate, numberDaysOfPreviousMonth - dayOfFirstDate),
    ..._Array.initArrayByIndex(numberDaysOfMonth, 0, date.getMonth() + 1, date.getFullYear()),
    ..._Array.initArrayByIndex(6 - dayOfLastDate, 0),
  ];
  return tableData;
}

const mapToLabelRows = (label) => (
  {
    flexGrow: Base.FlexGrow.G1,
    children: label,
  }
)

const reduceToRows = (dispatch, setClickData) => (props: Props, currentDate: Date, activeDay?: string) => {
  const activeDate = activeDay ? new Date(_Date.convertDateTimeDDMMYYYtoYYYYMMDD(activeDay)) : new Date();
  let i = -1;
  return (result, next) => {
    const cellMonth = next.month;
    const cellDay = next.day + 1;
    const isActiveDay = (activeDate.getMonth() + 1) === cellMonth && activeDate.getDate() === cellDay;
    const isCurrentMonth = (currentDate.getMonth() + 1) === cellMonth;
    const store = props.$datepicker.store;

    const handleClick = isCurrentMonth ? {
      onClick: () => {
        if (store) {
          const selectedDateTime = `${String(cellDay).padStart(2, '0')}-${String(cellMonth).padStart(2, '0')}-${next.year} ${String(activeDate.getHours()).padStart(2, '0')}:${String(activeDate.getMinutes()).padStart(2, '0')}:${String(activeDate.getSeconds()).padStart(2, '0')}`;
          dispatch({
            ...store.action,
            data: {
              [store.selectorKeys[store.selectorKeys.length - 1]]: selectedDateTime,
            }
          });
        }
        setClickData({ isOutside: true });
      }
    } : {};

    const cell = {
      classNames: Classnames(
        isActiveDay
          ? styles['active-day'] :
          isCurrentMonth
            ? styles['normal-day']
            : styles['disable-day']
          ,
      ),
      flexGrow: Base.FlexGrow.G1,
      children: cellDay,
      ...handleClick,
    }

    if (result.length === 0 || i % 7 === 6) {
      const newRow = {
        $cells: [
          cell
        ],
      };
      result.push(newRow);
    }
    else {
      const lastRow = result[result.length - 1];
      lastRow.$cells.push(cell);
    }
    i++;
    return result;
  }
}

// const onClickWithLoading = (dispatch, props: Props, isLoading: boolean, isDisabled: boolean) => (e) => {
//   if (!isDisabled && !isLoading) {
//     if (props.store){
//       dispatch(props.store.action);
//     }
//     if (props.onClick)
//       props.onClick(e);
//   }
// }

Element.displayName = 'Datepicker';












