import * as React from 'react';
import Classnames from 'classnames';
import styles from './_styles.css'
import { Link } from "react-router-dom";
import * as Base from '~/_settings';
import ThreeDotsLoader from '~commons/svg/threeDotsLoader';
import * as Svg from '~commons/svg';
import * as Block from '~commons/block';
import * as Table from '~commons/table';
import { useDispatch, useSelector } from 'react-redux';
import { _Array, _Date } from '@utils';
import { HANDLE_BUTTON } from "~stores/_base/constants";

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
  onClick?: React.MouseEventHandler,
  store?: Store,
  activeDay?: string,
  dayLabels?: string[],
  monthLabels?: string[],
}

type Store = {
  selectorKeys?: string[],
  action?: {},
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    store,
    activeDay,
    dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  } = props;

  const dispatch = useDispatch();
  // const isLoading = store && store.isLoadingSelectorKeys  ? useSelector(state => _Array.getArrayValueByKey(state as [], [...store.isLoadingSelectorKeys as string[], 'isLoading'])) : false;
  // const isDisabled = store && store.isDisabledSelectorKeys ? useSelector(state => _Array.getArrayValueByKey(state as [], [...store.isDisabledSelectorKeys as string[], 'isDisabled'])) : false;

  const componentProps = {
    backgroundColor: Base.BackgroundColor.WHITE,
    width: Base.Width.PX_700,
    ...props,
  }

  const labelRowProps = dayLabels.map(mapToLabelRows);
  const tableFromData = getTableData(activeDay);
  const tableFromProps = tableFromData.reduce(reduceToRows(store), []);

  const tableProps = {
    className: Classnames(
      styles[type],
    ),
    $rows: [
      {
        $cells: labelRowProps
      },
      ...tableFromProps,
    ]
  }

  return (
    <Block.Element {...componentProps}>
      <Table.Element {...tableProps} />
    </Block.Element>
  )
}

const getTableData = (activeDay?: string) => {
  const activeDate = activeDay ? new Date(activeDay) : new Date();
  const currenDay = activeDate.getDay() ? activeDate.getDay() - 1 : 6;
  const numberDaysOfPreviousMonth = _Date.getNumberDaysOfPreviousMonth(activeDate);
  const numberDaysOfMonth = _Date.getNumberDaysOfMonth(activeDate);

  const tableData = [
    ..._Array.initArrayByIndex(currenDay + 1, numberDaysOfPreviousMonth - currenDay, activeDate.getMonth()),
    ..._Array.initArrayByIndex(numberDaysOfMonth, 0, activeDate.getMonth() + 1),
    ..._Array.initArrayByIndex(4 - currenDay, activeDate.getMonth() + 2),
  ];

  return tableData;
}

const mapToLabelRows = (label) => (
  {
    flexGrow: Base.FlexGrow.G1,
    children: label,
  }
)

const reduceToRows = (store?: Store, activeDay?: string) => {
  const activeDate = activeDay ? new Date(activeDay) : new Date();
  return (result, next) => {
    const cell = {
      classNames: Classnames(
        (activeDate.getMonth() + 1) === next.month && activeDate.getDate() === next.day
          ? styles['active-day'] : null,
      ),
      flexGrow: Base.FlexGrow.G1,
      children: next.day + 1,
    }
    if (result.length === 0 || next.day % 7 === 6) {
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












