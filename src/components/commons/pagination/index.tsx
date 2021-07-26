import React, { useState } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css'
import * as Base from '~/_settings';
import { useDispatch, useSelector } from 'react-redux';
import * as Block from '~commons/block';
import * as Button from '~commons/button';
import * as Item from './item';
import Config from '@config';
import { _Array } from '@utils';

export enum Type {
  DEFAULT = 'pagination',
}

export enum Size {
  S1 = 's1',
  S = 's',
  M = 'm',
  L = 'l',
  L1 = 'l1',
}

export type Props = Block.Props & {
  type?: Type,
  store: Store,
  totalItems?: number,
  numberOfItemsPerPage?: number,
}

type Store = {
  totalSelectorKeys?: string[],
  action?: {},
}

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    store,
    totalItems = 1,
    numberOfItemsPerPage = Config.numberOfItemsPerPage,
  } = props;
  const dispatch = useDispatch();
  const total = store && store.totalSelectorKeys  ? useSelector(state => _Array.getArrayValueByKey(state as [], [...store.totalSelectorKeys as string[], 'total'])) : totalItems;
  const [currrentPage, setCurrentPage] = useState(0);
  const maxPage = Math.ceil((total as number ?? 1) / numberOfItemsPerPage);
  //create props
  const componentProps = {
    classNames: Classnames(
      styles[type],
    ),
    ...props,
  };

  const pageButtonProps = {
    classNames: Classnames(
      styles['pagination-page-button'],
    ),
  };

  const itemElements = Array(maxPage).fill(0).map((item, index) => {
    const style = currrentPage === index ? { style: { border: '1px solid #cdcdcd' } } : {};
    return <Button.Element
      key={index}
      border={Base.Border.NONE}
      {...pageButtonProps}
      text={'' + (index + 1)}
      {...style}
      onClick={handlePageButtonClick(setCurrentPage, dispatch, store, index)}
    />;
  });

  return (
    <Block.Element {...componentProps}>
      {itemElements.length > 1 && itemElements}
    </Block.Element>
  )
}

const handlePageButtonClick = (setCurrentPage, dispatch, store: Store, page) => () => {
  setCurrentPage(page);
  dispatch({ ...store.action, page: page });
}


Element.displayName = 'Notification';
