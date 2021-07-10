import React, { useState } from 'react'
import styles from './_styles.css'
import * as Base from '~/_settings';
import Caret from '~svg/caret';
import * as Block from '~commons/block';
import * as SVG from '~svg/index';
import { useDispatch } from 'react-redux';

export enum Type {
  DEFAULT = 'sort',
}

export type Props = Base.Props & {
  type: string,
  data: string,
  sortedRef?: any,
}

export const Element = (props: Props): React.ReactElement => {
  const {
    sortedRef,
    data,
  } = props;
  // const sortTypeState = useState(0);
  const dispatch = useDispatch();


  return (
    <Block.Element
      classNames={styles['sort']}
      {...props}
      onClick={handleClick(dispatch, props, sortedRef)}
    >
      <Caret
        classNames={styles['caret']}
        size={SVG.Size.S2}
        fill={sortedRef?.current?.key === data && sortedRef?.current?.type === 1 ? '#686868' : '#fff'}
        direction={SVG.Direction.UP}
      />
      <Caret
        classNames={styles['caret']}
        size={SVG.Size.S2}
        fill={sortedRef?.current?.key === data && sortedRef?.current?.type === 2 ? '#686868' : '#fff'}
      />
    </Block.Element>
  )
}

const handleClick = (dispatch, props, sortedRef) => () => {

  if (sortedRef) {
    const sortType = sortedRef.current?.key ===  props.data ? sortedRef.current?.type : 0;
    const newSortType = (sortType + 1) % 3;
    sortedRef.current = {
      key: props.data,
      type: newSortType,
    };
    // setSortType(newSortType);
    dispatch({
      ...props,
      sort: props.data ? props.data + getSortCondition(newSortType) : '',
    })
  }
}

const getSortCondition = (sortType) => {
  if (sortType === 1)
    return ',desc';
  if (sortType === 2)
    return ',asc';
  return '';
};

Element.displayName = 'Cell'
