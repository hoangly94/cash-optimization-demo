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
  const selector = store && store.totalSelectorKeys ? useSelector(state => _Array.getArrayValueByKey(state as [], store.totalSelectorKeys ?? [])) : null;
  const total = selector?.total || totalItems;
  const currentPage = selector?.currentPage;
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
    const style = currentPage === index ? { style: { border: '1px solid #cdcdcd' } } : {};
    return <Button.Element
      key={index}
      border={Base.Border.NONE}
      {...pageButtonProps}
      text={'' + (index + 1)}
      {...style}
      onClick={handlePageButtonClick(dispatch, store, index)}
    />;
  });

  return (
    <Block.Element {...componentProps}>
      {itemElements.length > 1 && itemElements}
    </Block.Element>
  )
}

const handlePageButtonClick = (dispatch, store: Store, page) => () => {
  dispatch({ ...store.action, page: page });
}


Element.displayName = 'Notification';
